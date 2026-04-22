import mongoose from "mongoose";

const electionSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",   // because admin is inside Candidate model
      required: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    level: {
      type: String,
      enum: ["National", "State", "Local"],
      required: true,
    },

    pollingDate: {
      type: Date,
      required: true,
    },

    seats: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Upcoming", "Ongoing", "Ended"],
      default: "Upcoming",
    },

    pincode: {
      type: String,
      required: function () {
        return this.level === "Local";
      },
    },
  },
  { timestamps: true }
);

const Election = mongoose.model("Election", electionSchema);

export default Election;
