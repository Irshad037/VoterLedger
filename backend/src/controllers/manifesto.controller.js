import Manifesto from "../models/manifesto.model.js";
import Candidate from "../models/candidate.model.js";
import cloudinary from "../config/cloudinary.js";

export const createManifesto = async (req, res) => {
    try {
        const candidateId = req.user._id;

        const {
            category,
            text,
            budget,
            timeline,
            status,
            proofDocument,
        } = req.body;

        if (!category || !text || !budget || !timeline) {
            return res.status(400).json({
                success: false,
                message: "All required fields must be provided",
            });
        }

        // 📤 Upload proof document
        let proofUrl = "";
        if (proofDocument && proofDocument.startsWith("data:")) {
            const uploadResponse = await cloudinary.uploader.upload(proofDocument, {
                resource_type: "raw",   // ✅ PDF
                folder: "manifesto_proofs",
            });
            proofUrl = uploadResponse.secure_url;
        }

        // 🧾 Create manifesto
        const manifesto = await Manifesto.create({
            candidate: candidateId,
            category,
            text,
            budget,
            timeline,
            status: status || "Draft",
            proofDocument: proofUrl,
        });

        // 🔗 LINK manifesto to candidate
        await Candidate.findByIdAndUpdate(candidateId, {
            $push: { manifestos: manifesto._id },
        });

        res.status(201).json({
            success: true,
            message: "Manifesto created successfully",
            data: manifesto,
        });

    } catch (error) {
        console.error("Create Manifesto Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error while creating manifesto",
            error: error.message,
        });
    }
};


export const getMyManifestos = async (req, res) => {
    try {
        const candidateId = req.user._id;

        const manifestos = await Manifesto.find({ candidate: candidateId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: manifestos,
        });

    } catch (error) {
        console.error("Get My Manifestos Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch manifestos",
            error: error.message,
        });
    }
};


export const deleteManifesto = async (req, res) => {
  try {
    const { manifestoId } = req.params;
    const userId = req.user._id;

    const manifesto = await Manifesto.findById(manifestoId);

    if (!manifesto) {
      return res.status(404).json({ message: "Manifesto not found" });
    }

    // 🔒 Only owner can delete
    if (manifesto.candidate.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // 🔒 Approved manifesto cannot be deleted
    if (manifesto.status === "Approved") {
      return res.status(403).json({
        message: "Approved manifesto cannot be deleted",
      });
    }

    // 🗑️ Delete PDF from Cloudinary
    if (manifesto.proofDocument) {
      const publicId = manifesto.proofDocument
        .split("/")
        .pop()
        .split(".")[0];

      await cloudinary.uploader.destroy(publicId, {
        resource_type: "raw", // ✅ PDF ONLY
      });
    }

    await Manifesto.findByIdAndDelete(manifestoId);

    res.status(200).json({
      success: true,
      message: "Manifesto deleted successfully",
    });

  } catch (error) {
    console.error("Delete Manifesto Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};


export const updateManifesto = async (req, res) => {
    try {
        const candidateId = req.user._id;
        const { manifestoId } = req.params;

        const {
            category,
            text,
            budget,
            timeline,
            proofDocument,
            status,
        } = req.body;

        const manifesto = await Manifesto.findById(manifestoId);

        if (!manifesto) {
            return res.status(404).json({
                success: false,
                message: "Manifesto not found",
            });
        }

        // 🔒 Ownership check
        if (manifesto.candidate.toString() !== candidateId.toString()) {
            return res.status(403).json({
                success: false,
                message: "You are not allowed to update this manifesto",
            });
        }

        // 🚫 Block update if verified
        if (manifesto.status === "Approved") {
            return res.status(400).json({
                success: false,
                message: "Verified manifesto cannot be edited",
            });
        }

        // 📤 Upload new proof document if provided
        let proofUrl = manifesto.proofDocument;

        if (proofDocument && proofDocument.startsWith("data:")) {
            const uploadResponse = await cloudinary.uploader.upload(proofDocument, {
                resource_type: "auto",
                folder: "manifesto_proofs",
            });

            proofUrl = uploadResponse.secure_url;
        }

        // 📝 Update fields
        manifesto.category = category ?? manifesto.category;
        manifesto.text = text ?? manifesto.text;
        manifesto.budget = budget ?? manifesto.budget;
        manifesto.timeline = timeline ?? manifesto.timeline;
        manifesto.status = status ?? manifesto.status;
        manifesto.proofDocument = proofUrl;

        await manifesto.save();

        res.status(200).json({
            success: true,
            message: "Manifesto updated successfully",
            data: manifesto,
        });

    } catch (error) {
        console.error("Update Manifesto Error:", error);
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};


