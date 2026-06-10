"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

// ─── Particle System ────────────────────────────────────────────────────────
interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    speedX: number;
    speedY: number;
    hue: number;
}

function useParticles(count: number) {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const arr: Particle[] = Array.from({ length: count }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2.5 + 0.8,
            opacity: Math.random() * 0.4 + 0.1,
            speedX: (Math.random() - 0.5) * 0.015,
            speedY: (Math.random() - 0.5) * 0.015,
            hue: Math.random() * 40 + 190, // cyan-blue range
        }));
        setParticles(arr);
    }, [count]);

    return particles;
}

// ─── Hydration-Safe Countdown Hook ──────────────────────────────────────────
function useCountdown(targetDate: Date) {
    const calcRemaining = useCallback(() => {
        const now = new Date().getTime();
        const diff = targetDate.getTime() - now;
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / (1000 * 60)) % 60),
            seconds: Math.floor((diff / 1000) % 60),
        };
    }, [targetDate]);

    const [remaining, setRemaining] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        setRemaining(calcRemaining());
        const interval = setInterval(() => {
            setRemaining(calcRemaining());
        }, 1000);
        return () => clearInterval(interval);
    }, [calcRemaining]);

    return remaining;
}

// ─── Animated Number Flip ───────────────────────────────────────────────────
function FlipUnit({ value, label }: { value: number; label: string }) {
    const display = String(value).padStart(2, "0");

    return (
        <div className="flex flex-col items-center gap-1 sm:gap-2">
            <div className="relative">
                {/* Glow behind card */}
                <div className="absolute -inset-1 rounded-xl bg-gradient-to-b from-cyan-500/20 to-blue-600/20 blur-md" />
                <div className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4">
                    <AnimatePresence mode="popLayout">
                        <motion.span
                            key={display}
                            initial={{ y: 16, opacity: 0, filter: "blur(2px)" }}
                            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                            exit={{ y: -16, opacity: 0, filter: "blur(2px)" }}
                            transition={{ type: "spring", stiffness: 350, damping: 25 }}
                            className="block font-heading text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-b from-white via-white to-white/60 bg-clip-text text-transparent"
                        >
                            {display}
                        </motion.span>
                    </AnimatePresence>
                </div>
            </div>
            <span className="text-[9px] sm:text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                {label}
            </span>
        </div>
    );
}

// ─── Separator Dots ─────────────────────────────────────────────────────────
function Separator() {
    return (
        <div className="flex flex-col items-center gap-1.5 pb-5 sm:pb-7">
            <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-1 h-1 rounded-full bg-cyan-400"
            />
            <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.3,
                }}
                className="w-1 h-1 rounded-full bg-cyan-400"
            />
        </div>
    );
}

// ─── Floating Orbs ──────────────────────────────────────────────────────────
function FloatingOrb({
    color,
    size,
    top,
    left,
    delay,
}: {
    color: string;
    size: number;
    top: string;
    left: string;
    delay: number;
}) {
    return (
        <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
                width: size,
                height: size,
                top,
                left,
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
            }}
            animate={{
                y: [0, -20, 0, 15, 0],
                x: [0, 10, -8, 5, 0],
                scale: [1, 1.08, 0.96, 1.04, 1],
            }}
            transition={{
                duration: 15 + delay * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
            }}
        />
    );
}

// ─── Stagger animation variants ─────────────────────────────────────────────
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.15 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
};

// ─── Main Component ─────────────────────────────────────────────────────────
export default function ComingSoon() {
    // Target date set by user (June 12, 2026)
    const [launchDate] = useState(() => new Date("2026-06-12T10:30:00"));
    const countdown = useCountdown(launchDate);
    const particles = useParticles(45);
    const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
    const containerRef = useRef<HTMLDivElement>(null);

    // Track mouse for subtle parallax
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({
                x: (e.clientX - rect.left) / rect.width,
                y: (e.clientY - rect.top) / rect.height,
            });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative flex h-screen min-h-[600px] w-full flex-col items-center justify-between overflow-hidden bg-black py-8 sm:py-12 md:py-16"
            style={{
                background:
                    "radial-gradient(ellipse 120% 80% at 50% -20%, rgba(6,30,60,1) 0%, rgba(2,8,23,1) 60%, rgba(0,0,0,1) 100%)",
            }}
        >
            {/* ── Background decoration orbs ───────────────────────────── */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <FloatingOrb
                    color="rgba(6,182,212,0.10)"
                    size={600}
                    top="-10%"
                    left="55%"
                    delay={0}
                />
                <FloatingOrb
                    color="rgba(59,130,246,0.08)"
                    size={500}
                    top="45%"
                    left="-5%"
                    delay={2}
                />
                <FloatingOrb
                    color="rgba(0,191,165,0.06)"
                    size={400}
                    top="65%"
                    left="65%"
                    delay={4}
                />

                {/* Mouse glow effect */}
                <motion.div
                    className="absolute w-[500px] h-[500px] rounded-full pointer-events-none opacity-60"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)",
                        left: `${mousePos.x * 100}%`,
                        top: `${mousePos.y * 100}%`,
                        transform: "translate(-50%, -50%)",
                    }}
                    animate={{
                        left: `${mousePos.x * 100}%`,
                        top: `${mousePos.y * 100}%`,
                    }}
                    transition={{ type: "spring", stiffness: 60, damping: 28 }}
                />
            </div>

            {/* ── Particle Field ────────────────────────────────────────── */}
            <div className="absolute inset-0 pointer-events-none">
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full"
                        style={{
                            width: p.size,
                            height: p.size,
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            background: `hsl(${p.hue}, 80%, 75%)`,
                        }}
                        animate={{
                            x: [0, p.speedX * 3000, 0],
                            y: [0, p.speedY * 3000, 0],
                            opacity: [p.opacity, p.opacity * 1.8, p.opacity],
                        }}
                        transition={{
                            duration: 15 + Math.random() * 15,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* ── Subtle grid & scan lines ──────────────────────────────── */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.012]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                }}
            />

            {/* ── Top Header Section ────────────────────────────────────── */}
            <motion.header
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 flex flex-col items-center gap-4 text-center px-4"
            >
                {/* Logo & Branding */}
                <motion.div variants={itemVariants} className="relative flex items-center gap-2.5">
                    <div className="relative">
                        <motion.div
                            className="w-10 h-10 rounded-xl border border-white/10 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 backdrop-blur-xl flex items-center justify-center"
                            animate={{ rotate: [0, 1.5, -1.5, 0] }}
                            transition={{
                                duration: 5,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                                <path
                                    d="M14 2L2 8v12l12 6 12-6V8L14 2z"
                                    stroke="url(#logo-grad)"
                                    strokeWidth="1.8"
                                    fill="none"
                                />
                                <path d="M14 8v12M8 11l6 3 6-3" stroke="url(#logo-grad)" strokeWidth="1.8" />
                                <defs>
                                    <linearGradient id="logo-grad" x1="2" y1="2" x2="26" y2="26">
                                        <stop stopColor="#06b6d4" />
                                        <stop offset="1" stopColor="#3b82f6" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </motion.div>
                        <motion.div
                            className="absolute -inset-1.5 rounded-xl border border-cyan-400/20 pointer-events-none"
                            animate={{ scale: [1, 1.12, 1], opacity: [0.4, 0, 0.4] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                    <span className="font-heading text-lg sm:text-xl font-bold tracking-tight text-white">
                        AxonX<span className="text-cyan-400"> Medtech</span>
                    </span>
                </motion.div>

                {/* Status Badge */}
                <motion.div variants={itemVariants}>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] backdrop-blur-md px-3.5 py-1">
                        <motion.div
                            className="w-1.5 h-1.5 rounded-full bg-emerald-400"
                            animate={{ scale: [1, 1.25, 1], opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <span className="text-[10px] sm:text-xs font-medium text-slate-300 tracking-wider">
                            Something revolutionary is brewing
                        </span>
                    </div>
                </motion.div>
            </motion.header>

            {/* ── Center Content Area (Headline, Timer) ────────────────── */}
            <motion.main
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 flex flex-col items-center gap-8 sm:gap-10 max-w-3xl mx-auto text-center px-4 w-full"
            >
                {/* Hero Headlines */}
                <motion.div variants={itemVariants} className="space-y-4 sm:space-y-5">
                    <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-white">
                        The Future of{" "}
                        <span className="block mt-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent">
                            Hospital Management
                        </span>
                        is Coming
                    </h1>
                    <p className="mx-auto max-w-md sm:max-w-lg text-xs sm:text-sm md:text-base text-slate-400 leading-relaxed">
                        We&apos;re building the operating system for modern healthcare facilities.
                        An intelligent, unified system designed to orchestrate entire hospital workflows.
                    </p>
                </motion.div>

                {/* Countdown Timer */}
                <motion.div variants={itemVariants} className="w-full flex justify-center py-2">
                    <div className="flex items-center gap-2 sm:gap-4 md:gap-5">
                        <FlipUnit value={countdown.days} label="Days" />
                        <Separator />
                        <FlipUnit value={countdown.hours} label="Hours" />
                        <Separator />
                        <FlipUnit value={countdown.minutes} label="Minutes" />
                        <Separator />
                        <FlipUnit value={countdown.seconds} label="Seconds" />
                    </div>
                </motion.div>
            </motion.main>

            {/* ── Footer / Copyright Section ───────────────────────────── */}
            <motion.footer
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 text-center px-4"
            >
                <p className="text-[10px] text-slate-600 tracking-wider uppercase font-semibold">
                    © {new Date().getFullYear()} AxonX Medtech Technologies. All rights reserved.
                </p>
            </motion.footer>

            {/* Bottom Glow Overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
        </div>
    );
}
