import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let genAiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  if (!genAiClient && process.env.GEMINI_API_KEY) {
    genAiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAiClient;
}

// API Routes FIRST
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Demo Request Submission Endpoint
app.post("/api/demo-request", (req, res) => {
  const { fullName, email, companyName, storeLocations } = req.body;
  if (!fullName || !email) {
    return res.status(400).json({ error: "Name and Email are required." });
  }

  // Calculate pilot feasibility score
  const estimatedAnnualRoi = (storeLocations || 1) * 24500;
  return res.json({
    success: true,
    message: "Demo request received successfully.",
    confirmationId: `RC-PILOT-${Math.floor(100000 + Math.random() * 900000)}`,
    estimatedRoi: `$${estimatedAnnualRoi.toLocaleString()} / year`,
    assignedEngineer: "Sarah Jenkins, Retail AI Lead",
  });
});

// Gemini AI Store Insight Generator
app.post("/api/ai/store-insight", async (req, res) => {
  try {
    const { storeName = "Flagship Store #104", activeZone = "Checkout & Fitting Rooms", currentShoppers = 142, avgDwellMinutes = 14.3, queueLength = 7, query } = req.body;
    
    const ai = getGenAI();

    if (!ai) {
      // Fallback deterministic enterprise insight if no API key is provided
      return res.json({
        insights: `High dwell time detected in ${activeZone} (${avgDwellMinutes}m avg). 18% of traffic bypasses secondary promotional displays. Queue count (${queueLength}) exceeds optimal throughput threshold of 4.`,
        staffRecommendation: `Reallocate 2 floating associates from Outer Perimeter to Register 3 & 4 immediately to reduce friction score by 35%.`,
        layoutFix: `Adjust aisle endcap angles by +15° to increase foot traffic capture rate from 64.2% to 72.8%.`,
        estimatedEfficiencyGain: `+14.2% Shift Revenue`
      });
    }

    const prompt = `You are RETAILCOUNT's AI Operations Engine for high-performance enterprise retail analytics.
Analyze the following store telemetry:
- Store: ${storeName}
- Focus Zone: ${activeZone}
- Active Shoppers: ${currentShoppers}
- Average Dwell Time: ${avgDwellMinutes} minutes
- Current Queue Length: ${queueLength} people
- User Specific Query: ${query || "Provide actionable optimization recommendations"}

Return JSON format with the following strictly typed structure:
{
  "insights": "Detailed technical analysis of shopper flow, dwell time, and bottlenecks",
  "staffRecommendation": "Concrete real-time floor staff allocation action",
  "layoutFix": "Merchandising or pathing structural adjustment",
  "estimatedEfficiencyGain": "Concise percentage or ROI estimate (e.g. '+18.4% conversion')"
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const text = response.text || "";
    let resultJson;
    try {
      resultJson = JSON.parse(text);
    } catch {
      resultJson = {
        insights: text,
        staffRecommendation: "Deploy adaptive labor to high-dwell zones.",
        layoutFix: "Optimize endcap visibility.",
        estimatedEfficiencyGain: "+12.5% throughput"
      };
    }

    return res.json(resultJson);
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: "Failed to generate AI insights",
      details: error.message
    });
  }
});

// Vite Middleware & Production Serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`RETAILCOUNT Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
