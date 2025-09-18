import { Lead } from "../models/lead.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { processCSV } from "../utils/csvProcessor.js";
import { scoreLead } from "../utils/leadScoring.js";

const uploadLeads = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No file uploaded",
    });
  }

  const leads = await processCSV(req.file.buffer);
  const savedLeads = await Lead.insertMany(leads);

  return res.status(201).json({
    success: true,
    data: savedLeads,
    message: "Leads uploaded successfully",
  });
});

const scoreLeads = asyncHandler(async (req, res) => {
  const leads = await Lead.find({});

  for (const lead of leads) {
    const scoredLead = await scoreLead(lead);
    await Lead.findByIdAndUpdate(lead._id, scoredLead);
  }

  return res.status(200).json({
    success: true,
    message: "Leads scored successfully",
  });
});

const getResults = asyncHandler(async (req, res) => {
  const leads = await Lead.find({}).select("-__v");

  return res.status(200).json({
    success: true,
    data: leads,
    message: "Results retrieved successfully",
  });
});

export { uploadLeads, scoreLeads, getResults };
