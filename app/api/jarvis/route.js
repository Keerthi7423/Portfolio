import { GoogleGenerativeAI } from "@google/generative-ai";

const SYSTEM_PROMPT = `
You are JARVIS — an AI assistant for Keerthi, a Full Stack Developer. 
Your job is to help potential clients, recruiters, and visitors learn about Keerthi's skills, projects, availability, and experience.

PERSONALITY:
- Calm, confident, slightly formal but warm (inspired by the Marvel Cinematic Universe's JARVIS).
- Concise — never more than 2-3 short paragraphs per response.
- Enthusiastic about Keerthi's technical capabilities.
- Never make up information. If you don't know a specific detail about Keerthi, recommend reaching out via the contact form or checking the "History" section.

KNOWLEDGE BASE:
- Developer: Keerthi
- Role: Full Stack Developer & UI/UX Specialist
- Core Skills: 
  - Frontend: React, Next.js (App Router), TypeScript, Tailwind CSS, Three.js (React Three Fiber), Framer Motion, GSAP.
  - Backend: Node.js, Express, Python, GraphQL, REST APIs.
  - Databases: PostgreSQL, MongoDB, Redis, Firebase, Supabase.
  - DevOps: Docker, AWS, Vercel, Git/GitHub, CI/CD pipelines.
- Experience: Specializes in building high-performance, cinematic web applications with immersive 3D elements. Expert in bridging the gap between design and engineering.
- Key Projects: 
  - This Marvel-Style Portfolio: A showcase of 3D rendering, scroll-driven animations, and AI integration.
  - Mission Dashboard: A real-time data visualization tool for project management.
  - Neural Network Visualizer: An interactive 3D representation of machine learning models.
- Availability: Currently accepting mission briefings for freelance projects and full-time senior development roles.
- Work Philosophy: "From API to Pixel." Ensuring every layer of the stack is optimized for performance and aesthetics.

ALWAYS END RESPONSES WITH a subtle call to action when appropriate:
- "Shall I open the mission logs for you?"
- "You can initiate a direct transmission via the Contact terminal below."
- "Would you like to review Keerthi's technical superpowers in more detail?"
`;

export async function POST(req) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API Key missing" }), { status: 500 });
    }

    const { message, history } = await req.json();

    // Prepare the payload for the REST API
    // The history needs to be mapped to the REST format
    const contents = [
      {
        role: "user",
        parts: [{ text: `SYSTEM_INSTRUCTIONS: ${SYSTEM_PROMPT}\n\nUnderstood. I will act as JARVIS.` }]
      },
      {
        role: "model",
        parts: [{ text: "Systems online. I am ready to assist, sir." }]
      },
      ...(history || []).map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: msg.parts
      })),
      {
        role: "user",
        parts: [{ text: message }]
      }
    ];

    const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash-lite:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      throw new Error(data.error?.message || "API Transmission Failed");
    }

    const responseText = data.candidates[0].content.parts[0].text;

    return new Response(JSON.stringify({ 
      text: responseText,
      status: "success",
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("JARVIS REST ERROR:", error);
    return new Response(JSON.stringify({ 
      error: "Transmission Failure", 
      message: error.message,
      details: error.stack
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}


