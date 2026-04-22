import mongoose from "mongoose";

const manifestoSchema = new mongoose.Schema(
  {
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: [
        "Education",
        "Healthcare",
        "Infrastructure",
        "Environment",
        "Economy",
        "Public Safety",
      ],
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    budget: {
      type: String, // keeping string because UI uses "1.5 Million"
      required: true,
    },

    timeline: {
      type: String, // e.g. "12 Months"
      required: true,
    },

    status: {
      type: String,
      enum: ["Draft", "Submitted", "Approved", "Rejected"],
      default: "Draft",
    },

    proofDocument: {
      type: String, // Cloudinary URL (PDF / Image)
    },

    rejectionReason: {
      type: String, // optional (admin use)
    },
  },
  { timestamps: true }
);

const Manifesto = mongoose.model("Manifesto", manifestoSchema);
export default Manifesto;
