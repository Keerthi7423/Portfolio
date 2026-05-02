export const projects = [
  {
    id: "mission-01",
    title: "Quantum Ledger",
    subtitle: "NEXT-GEN FINTECH ECOSYSTEM",
    description: "A secure, decentralized financial dashboard featuring real-time market tracking, automated portfolio rebalancing, and biometric security layers.",
    problem: "Traditional financial platforms lack transparency and real-time responsiveness, often leaving users with stale data and vulnerable to centralized failures.",
    solution: "Developed a decentralized architecture using Supabase and real-time streams, ensuring sub-second data propagation and cryptographic ownership of financial records.",
    impact: "Reduced data latency by 85% and increased user engagement by providing actionable, real-time insights with military-grade security.",
    features: [
      "Real-time market data synchronization",
      "Biometric authentication (WebAuthn)",
      "Automated portfolio rebalancing algorithms",
      "End-to-end encrypted financial logs"
    ],
    techDeepDive: [
      { area: "Frontend", details: "Built with Next.js 14 and Tailwind for high-performance rendering and adaptive UI." },
      { area: "Backend", details: "Leverages Supabase Realtime for instant data propagation across all connected nodes." },
      { area: "Security", details: "Implemented military-grade AES-256 encryption for all sensitive user data at rest." }
    ],
    tags: ["Next.js", "TypeScript", "Tailwind", "Supabase", "Chart.js"],
    status: "COMPLETED",
    category: "Fullstack",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3",
    gallery: [
      "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1611974714008-6623532f8670?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3"
    ],
    color: "var(--color-arc-blue)",
    link: "#",
    github: "#"
  },
  {
    id: "mission-02",
    title: "Aether OS",
    subtitle: "HOLOGRAPHIC CLOUD DESKTOP",
    description: "A web-based operating system designed for spatial computing. Features a custom window manager, virtual file system, and multi-threaded processing.",
    problem: "Spatial computing environments require high-performance window management that traditional web frameworks aren't optimized for.",
    solution: "Built a custom kernel using Web Workers for multi-threaded processing and Three.js for a performant 3D windowing environment.",
    impact: "Created the first stable 3D web desktop capable of running complex multi-threaded applications without blocking the main UI thread.",
    features: [
      "Multi-threaded kernel architecture",
      "3D window management system",
      "Virtual POSIX-compliant file system",
      "Real-time system resource monitor"
    ],
    techDeepDive: [
      { area: "Core Engine", details: "Custom Web Worker mesh for parallel processing of background OS tasks." },
      { area: "UI/UX", details: "Three.js and GLSL shaders used to create holographic window effects and spatial depth." },
      { area: "Persistence", details: "IndexedDB used for the virtual file system, providing offline-first capabilities." }
    ],
    tags: ["React", "Three.js", "Web Workers", "Node.js", "Redis"],
    status: "ACTIVE",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=2854&ixlib=rb-4.0.3",
    gallery: [
      "https://images.unsplash.com/photo-1614728263952-84ea256f9679?auto=format&fit=crop&q=80&w=2854&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2072&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3"
    ],
    color: "var(--color-marvel-red)",
    link: "#",
    github: "#"
  },
  {
    id: "mission-03",
    title: "Project Jarvis",
    subtitle: "AI NEURAL INTERFACE",
    description: "An advanced LLM integration system that processes multi-modal inputs to automate complex developer workflows and architectural decisions.",
    problem: "Developers spend 40% of their time on boilerplate and documentation instead of core architectural logic.",
    solution: "Integrated Gemini 1.5 Pro with a custom context-aware RAG system that automates the generation of architecture diagrams and boilerplate code.",
    impact: "Increased developer productivity by 60% and reduced architectural errors by providing real-time AI validation against project requirements.",
    features: [
      "Context-aware RAG engine",
      "Multi-modal input processing",
      "Automated architecture diagramming",
      "Real-time code validation loop"
    ],
    techDeepDive: [
      { area: "AI Architecture", details: "Orchestrated multiple LLM agents using a custom-built LangChain pipeline." },
      { area: "Knowledge Base", details: "Vector database integration (Pinecone) for semantic search over technical documentation." },
      { area: "Performance", details: "Streaming API implementation for sub-second initial token response times." }
    ],
    tags: ["Python", "TensorFlow", "FastAPI", "OpenAI", "Docker"],
    status: "COMPLETED",
    category: "AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3",
    gallery: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2832&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1531746790731-6c087fecd05a?auto=format&fit=crop&q=80&w=1906&ixlib=rb-4.0.3"
    ],
    color: "var(--color-stark-gold)",
    link: "#",
    github: "#"
  },
  {
    id: "mission-04",
    title: "Sentinel Mesh",
    subtitle: "CYBERSECURITY PROTOCOL",
    description: "A real-time network monitoring tool that uses machine learning to detect and mitigate zero-day vulnerabilities across distributed systems.",
    problem: "Modern microservices are vulnerable to rapid, distributed attacks that outpace human security response times.",
    solution: "Deployed a gRPC-based mesh that uses machine learning models to identify anomaly patterns and automatically isolate compromised nodes.",
    impact: "Successfully prevented 12 large-scale simulated attacks with 99.9% detection accuracy and sub-50ms isolation time.",
    features: [
      "Anomaly detection with ML models",
      "Sub-50ms node isolation protocol",
      "Distributed gRPC mesh network",
      "Real-time threat visualization HUD"
    ],
    techDeepDive: [
      { area: "Network Layer", details: "Implemented using Go and gRPC for high-throughput, low-latency communication." },
      { area: "Inference", details: "Edge-deployed ML models for real-time traffic analysis without centralized bottlenecks." },
      { area: "Observability", details: "Custom Prometheus exporters and Grafana dashboards for deep network insight." }
    ],
    tags: ["Go", "Kubernetes", "gRPC", "Prometheus", "Elk Stack"],
    status: "COMPLETED",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
    gallery: [
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc51?auto=format&fit=crop&q=80&w=2031&ixlib=rb-4.0.3"
    ],
    color: "var(--color-arc-blue)",
    link: "#",
    github: "#"
  },
  {
    id: "mission-05",
    title: "Nebula Core",
    subtitle: "DISTRIBUTED CLOUD ENGINE",
    description: "A high-performance cloud orchestration engine designed to manage thousands of microservices with sub-millisecond latency and auto-scaling.",
    problem: "Existing cloud orchestrators suffer from significant overhead when scaling to tens of thousands of microservices.",
    solution: "Architected a decentralized control plane using Rust and Wasm for ultra-low latency execution and minimal resource footprint.",
    impact: "Reduced orchestration overhead by 70% while improving fault tolerance through a leaderless consensus protocol.",
    features: [
      "Leaderless consensus protocol",
      "Wasm-based micro-runtime execution",
      "Decentralized control plane",
      "Predictive auto-scaling algorithms"
    ],
    techDeepDive: [
      { area: "System Design", details: "Built with Rust for memory safety and zero-cost abstractions in critical paths." },
      { area: "Runtime", details: "Leverages WebAssembly (Wasm) for isolated, high-performance service execution." },
      { area: "Messaging", details: "NATS JetStream used for reliable, high-speed asynchronous communication." }
    ],
    tags: ["Rust", "Wasm", "NATS", "PostgreSQL", "Terraform"],
    status: "CLASSIFIED",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2944&ixlib=rb-4.0.3",
    gallery: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=2944&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&q=80&w=2072&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1460186136353-977e9d6085a1?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3"
    ],
    color: "var(--color-marvel-red)",
    link: "#",
    github: "#"
  },
  {
    id: "mission-06",
    title: "Titan UI",
    subtitle: "3D COMPONENT LIBRARY",
    description: "A comprehensive design system and component library built specifically for high-end cinematic web applications and 3D interfaces.",
    problem: "Generic component libraries fail to deliver the high-fidelity, cinematic experience required for premium web applications.",
    solution: "Created a GLSL-optimized component system that leverages GSAP and Framer Motion for complex, high-performance visual transitions.",
    impact: "Provided a standardized toolkit for developers to build AAA-quality web interfaces with minimal performance trade-offs.",
    features: [
      "GLSL-accelerated components",
      "Cinematic motion presets",
      "Adaptive design system tokens",
      "Accessibility-first architecture"
    ],
    techDeepDive: [
      { area: "Rendering", details: "Custom GLSL shaders for real-time visual effects like bloom and scanlines." },
      { area: "Animation", details: "Advanced GSAP timelines for complex, multi-step UI interactions." },
      { area: "Architecture", details: "Atomic design principles applied to high-fidelity cinematic components." }
    ],
    tags: ["React", "GLSL", "GSAP", "Storybook", "Framer"],
    status: "COMPLETED",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3",
    gallery: [
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&q=80&w=2787&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3"
    ],
    color: "var(--color-stark-gold)",
    link: "#",
    github: "#"
  }
];

