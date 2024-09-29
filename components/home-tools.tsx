"use client";

import React from "react";
import {
  SiNextdotjs,
  SiVercel,
  SiShadcnui,
  SiTailwindcss,
  SiZod,
  SiPrisma,
  SiFramer,
  SiTypescript,
} from "react-icons/si";

const iconsLogo = [
  { title: "Next.js", icon: SiNextdotjs },
  { title: "Vercel", icon: SiVercel },
  { title: "Shadcn UI", icon: SiShadcnui },
  { title: "Tailwindcss", icon: SiTailwindcss },
  { title: "Zod", icon: SiZod },
  { title: "Prisma", icon: SiPrisma },
  { title: "Framer", icon: SiFramer },
  { title: "Typescript", icon: SiTypescript },
];

export default function HomeTools() {
  return (
    <div className="flex gap-8 flex-wrap justify-center pt-8">
      {iconsLogo.map((item, i) => (
        <div title={item.title} key={i} className={item.title === "Vercel" ? "text-primary" : ""}>
          {React.createElement(item.icon, { size: 32 })}
        </div>
      ))}
    </div>
  );
}
