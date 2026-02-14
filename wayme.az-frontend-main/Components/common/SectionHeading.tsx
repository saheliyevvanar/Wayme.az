import React from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

const SectionHeading = ({ eyebrow, title, description }: SectionHeadingProps) => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <div className="h-px w-8 bg-blue-500/50" />
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-500/80 sm:text-xs">
          {eyebrow}
        </p>
      </div>
      <h2 className="text-gradient text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default SectionHeading;
