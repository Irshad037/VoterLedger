import ElectionApplication from "../models/electionApplication.model.js";
import Election from "../models/election.model.js";
import Manifesto from "../models/manifesto.model.js";

export const applyForElection = async (req, res) => {
  try {
    const candidateId = req.user._id;

    const { electionId, manifestoIds } = req.body;

    // 🔒 Basic validation
    if (!electionId || !manifestoIds || !manifestoIds.length) {
      return res.status(400).json({
        success: false,
        message: "Election and at least one manifesto are required",
      });
    }

    // 🔎 Check election exists
    const election = await Election.findById(electionId);
    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found",
      });
    }

    // 🔒 Prevent duplicate apply (index also protects this)
    const alreadyApplied = await ElectionApplication.findOne({
      candidate: candidateId,
      election: electionId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this election",
      });
    }

    // 🔎 Validate manifestos
    const manifestos = await Manifesto.find({
      _id: { $in: manifestoIds },
      candidate: candidateId,
    });

    if (manifestos.length !== manifestoIds.length) {
      return res.status(403).json({
        success: false,
        message: "One or more manifestos do not belong to you",
      });
    }

    // 🔒 Ensure manifestos are submitted or approved
    const invalidManifesto = manifestos.find(
      (m) => m.status === "Draft"
    );

    if (invalidManifesto) {
      return res.status(400).json({
        success: false,
        message: "Draft manifestos cannot be used to apply",
      });
    }

    // 🧾 Create application
    const application = await ElectionApplication.create({
      candidate: candidateId,
      election: electionId,
      manifestos: manifestoIds,
      status: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      data: application,
    });

  } catch (error) {
    console.error("Apply For Election Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error while applying for election",
      error: error.message,
    });
  }
};

export const getMyApplications = async (req, res) => {
  try {
    const candidateId = req.user._id;

    const applications = await ElectionApplication.find({
      candidate: candidateId,
    })
      .populate({
        path: "election",
        select: "state city level pollingDate status seats pincode",
      })
      .populate({
        path: "manifestos",
        select: "category text budget timeline status proofDocument",
      })
      .sort({ createdAt: -1 });

    const formatted = applications.map((app) => ({
      _id: app._id,
      status: app.status,
      adminRemark: app.adminRemark || "",
      appliedDate: app.createdAt,

      election: {
        _id: app.election._id,
        state: app.election.state,
        city: app.election.city,
        level: app.election.level,
        pollingDate: app.election.pollingDate,
        status: app.election.status,
        seats: app.election.seats,
        pincode: app.election.pincode,
      },

      manifestos: app.manifestos.map((m) => ({
        _id: m._id,
        category: m.category,
        text: m.text,
        budget: m.budget,
        timeline: m.timeline,
        status: m.status,
        proofDocument: m.proofDocument,
      })),
    }));

    res.status(200).json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.error("Get My Applications Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching applications",
      error: error.message,
    });
  }
};

