import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getSmartRecommendations = async (userHistory: string[], cartItems: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Based on the user's purchase history: [${userHistory.join(', ')}] and current cart: [${cartItems.join(', ')}], suggest 5 products they might like from a supermarket.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              reason: { type: Type.STRING },
              category: { type: Type.STRING }
            },
            required: ["name", "reason"]
          }
        }
      }
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("AI Recommendation Error:", error);
    return [];
  }
};
