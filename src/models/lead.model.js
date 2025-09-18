import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    linkedinBio: {
      type: String,
    },
    score: {
      ruleBasedScore: {
        type: Number,
        default: 0,
      },
      aiBasedScore: {
        type: Number,
        default: 0,
      },
      totalScore: {
        type: Number,
        default: 0,
      },
    },
    intentClassification: {
      type: String,
      enum: ["High", "Medium", "Low"],
      required: true,
    },
    reasoning: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Lead = mongoose.model("Lead", leadSchema);
