"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import { Plus } from "lucide-react";

export type NouveauteType = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  lining?: string | null;
  wearing?: string | null;
  height?: string | null;
};

interface Props {
  nouveautes: NouveauteType[];
}

export default function AnimatedShowcase({ nouveautes }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play the slider
  useEffect(() => {
    if (nouveautes.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % nouveautes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [nouveautes.length]);

  if (!nouveautes || nouveautes.length === 0) return null;

  const currentItem = nouveautes[currentIndex];

  // Variants for product image (sliding left/right and rotating)
  const productVariants: Variants = {
    initial: {
      x: 150,
      opacity: 0,
      rotateY: 0,
    },
    animate: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
    },
    exit: {
      x: -150,
      opacity: 0,
      rotateY: -15, // Light rotation like turning its back
      transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] },
    },
  };

  // Variants for text content (fade out / fade in synchronized)
  const textVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.4, delay: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <section className="relative w-full max-w-[96%] mx-auto h-[80vh] min-h-[600px] bg-[#f0f0f0] overflow-hidden flex items-center mt-12 rounded-[2rem]  mx-2 sm:mx-4 lg:mx-8">
      {/* Background Spotlight Circle */}
      <motion.div
        className="absolute left-1/2 top-1/2 w-[500px] h-[500px] bg-white rounded-full mix-blend-normal shadow-sm"
        animate={{
          x: `calc(-50% + ${currentIndex % 2 === 0 ? 15 : -15}px)`,
          y: "-50%",
        }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Center: Image (Absolute Bottom) */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[90%] md:h-[95%] w-[90%] sm:w-[70%] lg:w-[45%] max-w-[500px] flex justify-center items-end z-10 pointer-events-none"
        style={{ perspective: "1000px" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            variants={productVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute inset-0 flex justify-center items-end"
          >
            <div className="relative w-full h-full">
              <Image
                src={currentItem.imageUrl || "/man/test2.png"}
                alt={currentItem.name}
                fill
                className="object-contain object-bottom drop-shadow-2xl"
                priority
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative z-10 max-w-[80%] mx-auto w-full h-full grid grid-cols-1 lg:grid-cols-3 items-center px-4 sm:px-6 lg:px-8 py-12">
        {/* Left Side: Info */}
        <div className="flex flex-col z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col"
            >
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-2 font-sans max-w-sm leading-tight">
                {currentItem.name}
              </h2>
              <p className="text-3xl text-slate-400 font-light">
                ${currentItem.price}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center: Image Spacer */}
        <div className="hidden lg:block w-full h-[400px] md:h-[550px]" />

        {/* Right Side: Features */}
        <div className="flex flex-col items-end z-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentItem.id}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col gap-6 text-right"
            >
              {currentItem.lining && (
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase mb-1">
                    Lining
                  </span>
                  <span className="text-sm font-medium text-slate-800">
                    {currentItem.lining}
                  </span>
                </div>
              )}
              {currentItem.wearing && (
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase mb-1">
                    Wearing
                  </span>
                  <span className="text-sm font-medium text-slate-800">
                    {currentItem.wearing}
                  </span>
                </div>
              )}
              {currentItem.height && (
                <div className="flex flex-col">
                  <span className="text-xs text-slate-400 font-semibold tracking-wider uppercase mb-1">
                    Height
                  </span>
                  <span className="text-sm font-medium text-slate-800">
                    {currentItem.height}
                  </span>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-30 max-w-[80%] mx-auto w-full">
        {/* Slider Dots */}
        <div className="flex items-center gap-3">
          {nouveautes.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className="relative w-8 h-1 bg-slate-300 rounded-full overflow-hidden focus:outline-none transition-colors hover:bg-slate-400"
            >
              {currentIndex === idx && (
                <motion.div
                  layoutId="activeDot"
                  className="absolute inset-0 bg-black rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
