import { Offer } from "../models/offer.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createOffer = asyncHandler(async (req, res) => {
  const { productName, valuePropositions, idealUseCases } = req.body;

  if (!productName || !valuePropositions || !idealUseCases) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const offer = await Offer.create({
    productName,
    valuePropositions,
    idealUseCases,
  });

  return res.status(201).json({
    success: true,
    data: offer,
    message: "Offer created successfully",
  });
});

export { createOffer };
