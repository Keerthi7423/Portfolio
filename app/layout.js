import { 
  Bebas_Neue, 
  Rajdhani, 
  Orbitron, 
  IBM_Plex_Sans, 
  IBM_Plex_Mono, 
  Chakra_Petch 
} from "next/font/google";
import "./globals.css";

const bebas = Bebas_Neue({ 
  subsets: ["latin"], 
  weight: "400",
  variable: "--font-bebas"
});

const rajdhani = Rajdhani({ 
  subsets: ["latin"], 
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani"
});

const orbitron = Orbitron({ 
  subsets: ["latin"], 
  weight: ["400", "500", "700"],
  variable: "--font-orbitron"
});

const ibmSans = IBM_Plex_Sans({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500"],
  variable: "--font-ibm-sans"
});

const ibmMono = IBM_Plex_Mono({ 
  subsets: ["latin"], 
  weight: ["400", "500"],
  variable: "--font-ibm-mono"
});

const chakra = Chakra_Petch({ 
  subsets: ["latin"], 
  weight: ["400", "500"],
  variable: "--font-chakra"
});

export const metadata = {
  title: "DevUniverse | Marvel-Style Portfolio",
  description: "High-end, cinematic portfolio of a Full Stack Developer inspired by Stark Industries.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${bebas.variable} ${rajdhani.variable} ${orbitron.variable} ${ibmSans.variable} ${ibmMono.variable} ${chakra.variable} font-sans bg-void text-text-primary antialiased selection:bg-marvel-red selection:text-white`}>
        {children}
      </body>
    </html>
  );
}

