"use client";

import { useBasic } from "@/hooks/useBasic";
import { Menu } from "lucide-react";
import { Logo } from "./header";
import { navList } from "@/lib/nav-list";
import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FaMinus, FaPlus } from "react-icons/fa6";

export function MobileNav() {
  const { nav, openNav, closeNav } = useBasic();
  const [expanded, setExpanded] = useState<number | null>(null);

  const toggleAction = (index: number) => {
    setExpanded(expanded === index ? null : index);
  };

  return (
    <div className="relative flex sm:hidden">
      <button onClick={openNav} type="button" title="nav-button block" className="z-50">
        <Menu />
      </button>
      <div
        onClick={closeNav}
        className={`${nav ? "opacity-100 z-40" : "opacity-0"} fixed inset-0 bg-black/50 transition duration-200`}
      />
      <div
        className={`${
          nav ? "translate-x-0 border-r" : "-translate-x-full"
        } fixed z-50 bg-secondary w-2/3 top-0 bottom-0 left-0 border-primary transition duration-200`}
      >
        <div className="p-3">
          <Logo />
          <div className="py-4 space-y-1">
            {navList.map((item, i) => (
              <div key={i}>
                <div className="flex justify-between gap-1 text-sm pb-2">
                  <Link onClick={closeNav} href={item.href} className="border-b border-primary py-3 w-full">
                    {item.label}
                  </Link>
                  <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: expanded === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => toggleAction(i)}
                    className="flex items-center justify-center border-b w-12"
                  >
                    {expanded === i ? <FaMinus /> : <FaPlus />}
                  </motion.div>
                </div>
                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      {item.subMenu.map((itm, idx) => (
                        <div key={idx}>
                          <Link onClick={closeNav} href={itm.href} className="py-2 block pl-2">
                            {itm.label}
                          </Link>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
