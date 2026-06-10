"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookDemoButtonProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function BookDemoButton({
  className,
  size = "md",
  href,
  type = "button",
  disabled = false,
  onClick,
  children = "Book Free Demo",
}: BookDemoButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Magnetic values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring configuration for smooth motion
  const springConfig = { stiffness: 120, damping: 12, mass: 0.2 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || window.innerWidth < 1024) return; // Only magnetic on large screens
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Distance from center of button
    const mouseX = clientX - (left + width / 2);
    const mouseY = clientY - (top + height / 2);
    
    // Restrict magnetic pull range
    const maxPull = 12; // pixels
    const pullX = (mouseX / (width / 2)) * maxPull;
    const pullY = (mouseY / (height / 2)) * maxPull;
    
    x.set(pullX);
    y.set(pullY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const buttonClasses = cn(
    "relative flex items-center justify-center font-heading font-extrabold text-white tracking-wide rounded-full transition-all duration-300 shadow-md group/btn select-none overflow-hidden outline-none cursor-pointer",
    {
      "text-xs px-5 py-2 h-9 gap-1.5": size === "sm",
      "text-sm px-7 py-3 h-11 lg:h-12 gap-2": size === "md",
      "text-base px-8 py-4 h-14 gap-2.5": size === "lg",
    },
    // High-tech, rich gradient color scheme (brand teal -> electric cyan -> royal blue)
    "bg-[linear-gradient(110deg,#00BFA5,30%,#00d2ff,70%,#1E88E5)] bg-[length:200%_auto] hover:bg-[right_center]",
    // Shadow glow mapping
    "shadow-teal-500/20 hover:shadow-cyan-400/35 hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none",
    className
  );

  const innerContent = (
    <>
      {/* Background Glow Ring */}
      <span className="absolute -inset-1 rounded-full bg-gradient-to-r from-healthcare-accent via-cyan-400 to-healthcare-secondary opacity-40 blur-md -z-10 transition-all duration-500 group-hover/btn:opacity-85 group-hover/btn:blur-lg group-hover/btn:scale-105" />
      
      {/* Ambient Pulsing Shadow Glow */}
      <span className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-healthcare-accent/50 to-healthcare-secondary/50 blur-lg -z-20 opacity-0 group-hover/btn:opacity-100 animate-soft-pulse" />

      {/* Sweep Shimmer Shine */}
      <span className="absolute top-0 bottom-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none -z-5 animate-shimmer-sweep" />

      {/* Interactive sparkles on hover (desktop only) */}
      {isHovered && (
        <span className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {/* Sparkle 1 */}
          <motion.span
            className="absolute top-2 left-4 text-white/80"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1, 0.5, 0], opacity: [0, 1, 0.8, 0], y: [-5, -15], x: [-5, 5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
          >
            <Sparkles className="size-3.5 fill-white" />
          </motion.span>
          {/* Sparkle 2 */}
          <motion.span
            className="absolute bottom-2 right-6 text-white/80"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [0, 1.2, 0.6, 0], opacity: [0, 1, 0.9, 0], y: [5, 12], x: [2, -6] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }}
          >
            <Sparkles className="size-3 fill-white" />
          </motion.span>
        </span>
      )}

      {/* Button Content Text & Icon */}
      <span className="relative z-10 flex items-center gap-1.5">
        {children}
      </span>
      <ArrowRight className="size-4 relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />
    </>
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="inline-block relative"
    >
      <motion.div
        style={{ x: springX, y: springY }}
        className="relative"
      >
        {href ? (
          <a href={href} className={buttonClasses} onClick={onClick}>
            {innerContent}
          </a>
        ) : (
          <button
            type={type}
            disabled={disabled}
            className={buttonClasses}
            onClick={onClick}
          >
            {innerContent}
          </button>
        )}
      </motion.div>
    </div>
  );
}
