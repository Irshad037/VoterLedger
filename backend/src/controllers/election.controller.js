import Election from "../models/election.model.js";


export const createElection = async (req, res) => {
  const adminId = req.user._id;
  try {
    const {
      state,
      city,
      level,
      pollingDate,
      seats,
      status,
      pincode,
    } = req.body;

    if (!state || !city || !level || !pollingDate || !seats) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    if (level === "Local" && !pincode) {
      return res.status(400).json({
        success: false,
        message: "PIN code is required for Local elections",
      });
    }

    const election = await Election.create({
      state,
      city,
      level,
      pollingDate,
      seats,
      status,
      pincode: level === "Local" ? pincode : null,
      createdBy: adminId,
    });

    return res.status(201).json({
      success: true,
      message: "Election created successfully",
      data: election,
    });
  } catch (error) {
    console.error("Create Election Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating election",
      error: error.message,
    });
  }
};


export const deleteElection = async (req, res) => {
  const { id } = req.params;

  try {
    const election = await Election.findById(id);

    if (!election) {
      return res.status(404).json({
        success: false,
        message: "Election not found",
      });
    }

    await Election.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Election deleted successfully",
    });
  } catch (error) {
    console.error("Delete Election Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while deleting election",
      error: error.message,
    });
  }
};

export const getAllElection = async (req, res) => {
  try {
    const elections = await Election.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: elections,
    });
  } catch (error) {
    console.error("Get All Elections Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching elections",
      error: error.message,
    });
  }
};

export const getElectionByAdminId = async (req, res) => {
  const { adminId  } = req.params;

  try {
    const elections = await Election.find({ createdBy: adminId  })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: elections,
    });
  } catch (error) {
    console.error("Get Admin Elections Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching elections",
      error: error.message,
    });
  }
};



