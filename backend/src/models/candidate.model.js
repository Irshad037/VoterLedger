import mongoose from "mongoose";

const candidateSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["candidate", "admin"],
      default: "candidate",
    },

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: {
      type: String,
      select: false,
    },

    phone: { type: String },
    dob: { type: Date },
    party: { type: String },

    profilePhoto: { type: String },

    bio: { type: String },

    assets: { type: String },

    assetBreakdown: {
      movable: { type: String, default: "₹0" },
      immovable: { type: String, default: "₹0" },
      other: { type: String, default: "₹0" },
    },

    isWinner: { type: Boolean, default: false },

    criminalCases: [
      {
        caseId: { type: String, required: true },
        caseDetails: { type: String },
        file: { type: String },
      },
    ],

    education: [
      {
        degree: { type: String },
        institute: { type: String },
        duration: { type: String },
      },
    ],

    experience: [
      {
        role: { type: String },
        organization: { type: String },
        duration: { type: String },
      },
    ],
    manifestos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Manifesto",
      },
    ],
  },
  { timestamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
