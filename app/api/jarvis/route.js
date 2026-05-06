import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
    // 1. Check if API Key is configured
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not defined in environment variables.");
      return new Response(JSON.stringify({ 
        error: "Internal System Error", 
        message: "JARVIS core logic is offline. Please configure the API key." 
      }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 2. Parse the request body
    const { message, history } = await req.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "No message provided." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 3. Initialize the model with system instructions
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_PROMPT 
    });

    // 4. Start/Resume chat session
    const chat = model.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    // 5. Send the message and get response
    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    // 6. Return the response
    return new Response(JSON.stringify({ 
      text,
      status: "success",
      timestamp: new Date().toISOString()
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    console.error("JARVIS API ERROR:", error);
    
    return new Response(JSON.stringify({ 
      error: "Transmission Failure", 
      message: "I'm sorry, I'm having trouble connecting to my core processing unit. Please try again later." 
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
