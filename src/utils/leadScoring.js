const calculateRuleBasedScore = (lead) => {
  let score = 0;

  const decisionMakerRoles = [
    "ceo",
    "cto",
    "vp",
    "head",
    "director",
    "manager",
  ];
  const influencerRoles = ["lead", "senior", "architect", "consultant"];
  const idealIndustries = ["technology", "software", "it", "consulting"];

  const role = lead.role.toLowerCase();
  const industry = lead.industry.toLowerCase();

  if (decisionMakerRoles.some((r) => role.includes(r))) {
    score += 20;
  } else if (influencerRoles.some((r) => role.includes(r))) {
    score += 10;
  }

  if (idealIndustries.includes(industry)) {
    score += 20;
  } else if (["finance", "healthcare", "retail"].includes(industry)) {
    score += 10;
  }

  if (
    lead.name &&
    lead.role &&
    lead.company &&
    lead.industry &&
    lead.location
  ) {
    score += 10;
  }

  return score;
};

import { getGeminiResponse } from "./geminiService.js";

const calculateAIBasedScore = async (lead) => {
  const intentMap = {
    High: 50,
    Medium: 30,
    Low: 10,
  };

  const aiPrediction = await getGeminiResponse(lead);
  return {
    score: intentMap[aiPrediction.intent],
    reasoning: aiPrediction.reasoning,
  };
};

const scoreLead = async (lead) => {
  const ruleBasedScore = calculateRuleBasedScore(lead);
  const { score: aiBasedScore, reasoning } = await calculateAIBasedScore(lead);
  const totalScore = ruleBasedScore + aiBasedScore;

  let intentClassification;
  if (totalScore >= 70) {
    intentClassification = "High";
  } else if (totalScore >= 40) {
    intentClassification = "Medium";
  } else {
    intentClassification = "Low";
  }

  return {
    score: {
      ruleBasedScore,
      aiBasedScore,
      totalScore,
    },
    intentClassification,
    reasoning,
  };
};

export { scoreLead };
