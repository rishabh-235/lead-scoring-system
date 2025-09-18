import { jest, describe, test, expect } from "@jest/globals";
import { scoreLead } from "../utils/leadScoring.js";

jest.mock("../utils/geminiService.js", () => ({
  getGeminiResponse: jest.fn().mockResolvedValue({
    intent: "High",
    reasoning: "Test reasoning",
  }),
}));

describe("Lead Scoring Rules Tests", () => {
  describe("Decision Maker Role Tests", () => {
    test("should assign high score for CEO role", async () => {
      const lead = {
        name: "John Doe",
        role: "CEO",
        company: "Tech Corp",
        industry: "technology",
        location: "New York",
      };
      const result = await scoreLead(lead);
      expect(result.score.ruleBasedScore).toBe(50);
    });

    test("should assign high score for CTO role", async () => {
      const lead = {
        name: "Jane Smith",
        role: "CTO",
        company: "Software Inc",
        industry: "software",
        location: "San Francisco",
      };
      const result = await scoreLead(lead);
      expect(result.score.ruleBasedScore).toBe(50);
    });

    test("should assign high score for VP role", async () => {
      const lead = {
        name: "Mike Johnson",
        role: "VP of Engineering",
        company: "Tech Solutions",
        industry: "IT",
        location: "Boston",
      };
      const result = await scoreLead(lead);
      expect(result.score.ruleBasedScore).toBe(50);
    });
  });

  describe("Influencer Role Tests", () => {
    test("should assign medium score for Senior Engineer role", async () => {
      const lead = {
        name: "Alice Brown",
        role: "Senior Software Engineer",
        company: "Tech Corp",
        industry: "technology",
        location: "Seattle",
      };
      const result = await scoreLead(lead);
      expect(result.score.ruleBasedScore).toBe(40);
    });

    test("should assign medium score for Lead Developer role", async () => {
      const lead = {
        name: "Bob Wilson",
        role: "Lead Developer",
        company: "Dev Corp",
        industry: "software",
        location: "Austin",
      };
      const result = await scoreLead(lead);
      expect(result.score.ruleBasedScore).toBe(40);
    });
  });

  describe("Industry Tests", () => {
    test("should assign high score for technology industry", async () => {
      const lead = {
        name: "Tom Clark",
        role: "Manager",
        company: "Tech Corp",
        industry: "Technology",
        location: "Chicago",
      };
      const result = await scoreLead(lead);
      expect(result.score.ruleBasedScore).toBe(50);
    });

    test("should assign medium score for finance industry", async () => {
      const lead = {
        name: "Sarah Davis",
        role: "Director",
        company: "Finance Corp",
        industry: "Finance",
        location: "New York",
      };
      const result = await scoreLead(lead);
      expect(result.score.ruleBasedScore).toBe(40);
    });
  });

  describe("Completeness Tests", () => {
    test("should penalize incomplete lead information", async () => {
      const lead = {
        name: "John Doe",
        role: "CEO",
        company: "Tech Corp",
        industry: "",
        location: "", 
      };
      const result = await scoreLead(lead);
      expect(result.score.ruleBasedScore).toBe(20);
    });
  });

  describe("Total Score and Classification Tests", () => {
    test("should classify as High Intent for high total score", async () => {
      const lead = {
        name: "John Doe",
        role: "CEO",
        company: "Tech Corp",
        industry: "Technology",
        location: "San Francisco",
      };
      const result = await scoreLead(lead);
      expect(result.intentClassification).toBe("High");
      expect(result.score.totalScore).toBe(
        result.score.ruleBasedScore + result.score.aiBasedScore
      );
    });

    test("should include AI reasoning from mock", async () => {
      const lead = {
        name: "John Doe",
        role: "CEO",
        company: "Tech Corp",
        industry: "Technology",
        location: "San Francisco",
      };
      const result = await scoreLead(lead);
      expect(result.reasoning).toBeTruthy();
      expect(typeof result.reasoning).toBe("string");
    });
  });
});
