import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = process.env.GEMINI_API_KEY
  ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
  : null;

// Mock service as fallback
const mockAIService = (lead) => {
  const seniorityLevel =
    lead.role.toLowerCase().includes("senior") ||
    lead.role.toLowerCase().includes("lead") ||
    lead.role.toLowerCase().includes("manager");

  const techIndustry =
    lead.industry.toLowerCase().includes("tech") ||
    lead.industry.toLowerCase().includes("software") ||
    lead.industry.toLowerCase().includes("it");

  if (seniorityLevel && techIndustry) {
    return {
      intent: "High",
      reasoning:
        "Senior position in tech industry indicates high decision-making authority and relevant need",
    };
  } else if (seniorityLevel || techIndustry) {
    return {
      intent: "Medium",
      reasoning:
        "Either seniority or industry alignment suggests moderate potential",
    };
  } else {
    return {
      intent: "Low",
      reasoning:
        "Limited seniority and industry alignment indicates lower buying potential",
    };
  }
};

export const getGeminiResponse = async (lead) => {
  try {
    if (!genAI) {
      return mockAIService(lead);
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
        Analyze this sales lead and determine their buying intent (High/Medium/Low) based on the following information:
        
        Name: ${lead.name}
        Role: ${lead.role}
        Company: ${lead.company}
        Industry: ${lead.industry}
        Location: ${lead.location}
        LinkedIn Bio: ${lead.linkedinBio || "Not provided"}
        
        Consider factors like:
        1. Decision-making authority based on role
        2. Industry relevance
        3. Company profile
        4. Professional background
        
        Provide the analysis in the following JSON format:
        {
            "intent": "High/Medium/Low",
            "reasoning": "detailed explanation for the classification"
        }
        `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the JSON response
    return JSON.parse(text);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.error("Error calling Gemini API:", error);
    }
    // Fallback to mock service in case of API failure
    return mockAIService(lead);
  }
};
