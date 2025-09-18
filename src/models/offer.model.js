import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    valuePropositions: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "At least one value proposition is required",
      },
    },
    idealUseCases: {
      type: [String],
      required: true,
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "At least one ideal use case is required",
      },
    },
  },
  { timestamps: true }
);

export const Offer = mongoose.model("Offer", offerSchema);
