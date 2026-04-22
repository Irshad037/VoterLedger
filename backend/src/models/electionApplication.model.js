import mongoose from "mongoose";

const electionApplicationSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },

    election: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Election",
      required: true,
    },

    manifestos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manifesto",
        required: true,
      },
    ],

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },

    rejectionReason: {
      type: String,
      trim: true,
    },

    adminRemark: {
      type: String,
      default: "",
      trim: true,
    },

    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate", // admin (role === "admin")
    },

    reviewedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// 🔒 One candidate → one election → one application
electionApplicationSchema.index(
  { candidate: 1, election: 1 },
  { unique: true }
);

const ElectionApplication = mongoose.model(
  "ElectionApplication",
  electionApplicationSchema
);

export default ElectionApplication;
