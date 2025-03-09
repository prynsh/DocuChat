import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

export async function getEmbeddings(text: string) {
    try {
        const result = await model.embedContent(text.replace(/\n/g, ''));
        if (!result || !result.embedding || !result.embedding.values) {
            throw new Error("Invalid response from Gemini API: " + JSON.stringify(result));
        }
        return result.embedding.values as number[];
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw error;
    }
}
