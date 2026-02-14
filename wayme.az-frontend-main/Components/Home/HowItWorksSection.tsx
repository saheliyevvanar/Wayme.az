"use client";
import { motion, Variants } from "framer-motion";
import React from "react";

interface Step {
  number: number;
  title: string;
  description: string;
}

const HowItWorksSection = () => {
  const steps: Step[] = [
    {
      number: 1,
      title: "Şəxsi məlumatları doldurun",
      description:
        "Nəticələrin fərdiləşdirilməsi üçün adınızı, soyadınızı və doğum tarixinizi göstərin",
    },
    {
      number: 2,
      title: "Bacarıqlarınızı qeyd edin",
      description:
        "Hazırda malik olduğunuz bilik və bacarıqları seçin (minimum 3 bacarıq)",
    },
    {
      number: 3,
      title: "İstiqamət və ixtisas seçin",
      description:
        "Maraqlandığınız sahəni və ixtisası seçə bilərsiniz (məcburi deyil)",
    },
    {
      number: 4,
      title: "30 suallı testdən keçin",
      description:
        "Şəxsi keyfiyyətləriniz və üstünlükləriniz haqqında sualları cavablandırın",
    },
    {
      number: 5,
      title: "Ətraflı analiz əldə edin",
      description:
        "AI tövsiyələri, bacarıq uyğunluğu və öyrənmə resursları ilə nəticələri görün",
    },
    {
      number: 6,
      title: "PDF hesabatı emailə alın",
      description:
        "Fərdi inkişaf planı ilə PDF formatında ətraflı hesabat yükləyin",
    },
  ];

  // Split steps into top and bottom rows
  const topRow = steps.slice(0, 3);
  const bottomRow = steps.slice(3, 6);

  // Animation variants
  const topItemVariants: Variants = {
    hidden: { opacity: 0, y: -50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  const bottomItemVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  const StepCard = ({
    step,
    variants,
    index,
  }: {
    step: Step;
    variants: Variants;
    index: number;
  }) => (
    <motion.div
      className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-[#0D1B2A] border border-white/5 hover:border-white/10 transition-all duration-300"
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      custom={index}
    >
      {/* Number Badge with Gradient */}
      <div className="relative mb-5">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl linear-gradient-bg flex items-center justify-center">
          <span className="text-white font-bold text-xl sm:text-2xl">
            {step.number}
          </span>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-base sm:text-lg mb-3">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
        {step.description}
      </p>
    </motion.div>
  );

  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.h2
          className="text-gradient text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Necə işləyir
        </motion.h2>

        {/* Desktop Layout - 3 columns */}
        <div className="hidden lg:block space-y-6">
          {/* Top Row */}
          <div className="grid grid-cols-3 gap-6">
            {topRow.map((step, index) => (
              <StepCard
                key={step.number}
                step={step}
                variants={topItemVariants}
                index={index}
              />
            ))}
          </div>

          {/* Bottom Row */}
          <div className="grid grid-cols-3 gap-6">
            {bottomRow.map((step, index) => (
              <StepCard
                key={step.number}
                step={step}
                variants={bottomItemVariants}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Tablet Layout - 2 columns */}
        <div className="hidden sm:grid lg:hidden grid-cols-2 gap-5">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              variants={index < 3 ? topItemVariants : bottomItemVariants}
              index={index % 3}
            />
          ))}
        </div>

        {/* Mobile Layout - 1 column */}
        <div className="grid sm:hidden grid-cols-1 gap-4">
          {steps.map((step, index) => (
            <StepCard
              key={step.number}
              step={step}
              variants={index < 3 ? topItemVariants : bottomItemVariants}
              index={index % 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
