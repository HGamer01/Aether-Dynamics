import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini API client lazily to prevent server crashes if the key is missing.
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
      throw new Error("GEMINI_API_KEY is not configured in environment variables.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Full-stack API Endpoint for custom anti-gravity vessel calculations & diagnostics
app.post("/api/gemini/analyze", async (req, res) => {
  const { vesselType, corePower, altitude, fieldStabilization, propulsionFrequency } = req.body;

  try {
    const ai = getAiClient();
    
    const prompt = `Analyze a custom Aether Dynamics anti-gravity propulsion system with the following specs:
- Vessel/Application Type: ${vesselType || "Urban Transport"}
- Core Power Level: ${corePower || 50}%
- Target Altitude: ${altitude || 100} meters
- Field Stabilization Coefficient: ${fieldStabilization || 0.8}
- Quantum Propulsion Frequency: ${propulsionFrequency || 450} GHz

Generate a comprehensive, scientifically elegant, highly futuristic technical diagnostic report.
Include:
1. "System Status Summary" (e.g. Levitation capability, safety margins)
2. "Quantum Field Resonance Analysis" (describe the shape, size, and metric tension of the localized anti-gravity field)
3. "Technical Recommendations" (optimizations for propulsion, stabilization, power conservation)
4. "Propulsion Profile Data" consisting of:
   - liftCoefficient (number between 0.0 and 10.0)
   - energyDispersionRate (number in kW/s)
   - gravitationalDeflectionPercentage (number between 0 and 100)
   - stabilityFactor (number between 0.0 and 1.0)

Format the entire output strictly as a JSON object matching this schema:
{
  "summary": "String detailing status",
  "resonanceAnalysis": "String detailing quantum field",
  "recommendations": ["Recommendation 1", "Recommendation 2", "Recommendation 3"],
  "metrics": {
    "liftCoefficient": 7.4,
    "energyDispersionRate": 12.5,
    "gravitationalDeflection": 94.2,
    "stabilityFactor": 0.88
  }
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini API.");
    }

    res.json(JSON.parse(text));
  } catch (error: any) {
    console.error("Gemini analysis error:", error);
    
    // Provide a premium fallback experience if the API key is not configured or fails
    const mockDiagnostics = {
      summary: "Simulator Running in Local Baseline Diagnostic Mode. To unlock advanced live quantum calculations, verify your GEMINI_API_KEY is configured in Settings > Secrets.",
      resonanceAnalysis: `Localized warp field active with static telemetry. At ${altitude || 100}m altitude, the ${vesselType || "Urban Transport"} maintains a localized anti-gravity field diameter of 24.5 meters. Graviton particle density is stabilized by ${fieldStabilization || 0.8} coefficient.`,
      recommendations: [
        "Increase quantum propulsion frequency to overcome local atmospheric density.",
        "Calibrate stabilizing magnets in primary levitation ring to reduce energy dispersion.",
        "Ensure core power matches atmospheric drag coefficient for flight paths above 100m."
      ],
      metrics: {
        liftCoefficient: Number(((corePower || 50) * 0.09 + (propulsionFrequency || 450) * 0.002).toFixed(2)),
        energyDispersionRate: Number(((100 - (fieldStabilization || 0.8) * 100) * 0.25).toFixed(1)),
        gravitationalDeflection: Number(((corePower || 50) * 0.95).toFixed(1)),
        stabilityFactor: Number((fieldStabilization || 0.8).toFixed(2)),
      }
    };
    
    res.json(mockDiagnostics);
  }
});

// Serve Vite-managed files in development and statically in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Aether Server] Active on port ${PORT}`);
  });
}

startServer();
