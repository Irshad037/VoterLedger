import Candidate from "../models/candidate.model.js";
import cloudinary from "../config/cloudinary.js";

export const saveCandidateProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    let {
      firstName,
      lastName,
      email,
      phone,
      dob,
      party,
      profilePhoto,
      assets,
      assetBreakdown,
      education,
      experience,
      criminalCases,
      bio,
    } = req.body;

    // 🔥 NO JSON.parse ANYWHERE

    let parsedCriminalCases = [];

    if (criminalCases?.length) {
      for (const c of criminalCases) {
        let docUrl = "";

        if (c.file && c.file.startsWith("data:")) {
          const uploadResponse = await cloudinary.uploader.upload(c.file, {
            resource_type: "raw",
            folder: "criminal_pdfs",
            public_id: `criminal_${Date.now()}.pdf`,
          });
          docUrl = uploadResponse.secure_url;
        }

        parsedCriminalCases.push({
          caseId: c.caseId,
          caseDetails: c.caseDetails,
          file: docUrl,
        });
      }
    }

    let profilePhotoUrl = "";
    if (profilePhoto && profilePhoto.startsWith("data:")) {
      const uploadResponse = await cloudinary.uploader.upload(profilePhoto, {
        folder: "candidate_profiles",
      });
      profilePhotoUrl = uploadResponse.secure_url;
    }
    console.log("criminalCases received:", parsedCriminalCases);


    const candidate = await Candidate.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        email,
        phone,
        dob,
        party,
        profilePhoto: profilePhotoUrl,
        assets,
        assetBreakdown,
        education,
        experience,
        criminalCases: parsedCriminalCases,
        bio,
      },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Profile saved successfully",
      data: candidate,
    });

  } catch (error) {
    console.error("Save Candidate Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

