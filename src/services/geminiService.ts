import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function chatWithAI(messages: Message[]): Promise<string> {
  try {
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const currentMessage = { 
      role: 'user', 
      parts: [{ text: messages[messages.length - 1].content }] 
    };

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [...history, currentMessage],
      config: {
        systemInstruction: `You are the Keells Supermarket AI Assistant in Sri Lanka. 
        You help customers with:
        - Finding products (fruits, vegetables, house brands like Keells Krest).
        - Recipe suggestions based on available ingredients.
        - Sri Lankan grocery prices and seasonal offers (Vesak, Avurudu).
        - Delivery tracking information.
        - Personal health and nutrition tips.
        
        Keep your tone professional, friendly, and helpful. 
        You can speak both English and Sinhala (if the user asks in Sinhala).
        Mention local products like "Keells Krest Meatballs", "Elephant House Ginger Beer (EGB)", and fresh tropical fruits like "Rata Amba" or "Sour Plantain".`
      }
    });

    return response.text || "I'm sorry, I couldn't process that. Please try again.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The AI assistant is currently taking a break. Please check back later!";
  }
}
