import mongoose from "mongoose";

// Candidate Profile Schema
const candidateSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ['candidate', 'admin'],
      required: true
    }, // Role for the user (candidate or admin)

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
      required: true,
      select: false,   // IMPORTANT
    },
    phone: { type: String },
    dob: { type: Date },
    party: { type: String },
    profilePhoto: { type: String },
    assets: { type: String },
    isWinner: { type: Boolean, default: false },
    assetBreakdown: {
      movable: { type: String, default: "₹0" },
      immovable: { type: String, default: "₹0" },
      other: { type: String, default: "₹0" },
    },


    criminalCases: [
      {
        caseId: { type: String, required: true },
        caseDetails: { type: String },
        file: { type: String },
      }
    ],

    // affidavits: [
    //   {
    //     name: { type: String, required: true }, 
    //     file: { type: String },
    //   }
    // ],


    education: [
      {
        degree: { type: String },
        institute: { type: String },
        duration: { type: String },
      }
    ],

    experience: [
      {
        role: { type: String },
        organization: { type: String },
        duration: { type: String },
      }
    ],

  },
  { timestamps: true }
);

// Create a model from the schema
const Candidate = mongoose.model("Candidate", candidateSchema);

export default Candidate;
