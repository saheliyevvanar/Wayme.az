import Link from "next/link";
import React from "react";

type PrimaryButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const PrimaryButton = ({ href, children, className, onClick }: PrimaryButtonProps) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 text-sm font-bold text-slate-950 shadow-lg shadow-white/5 transition-all duration-300 hover:scale-[1.02] hover:bg-slate-50 hover:shadow-white/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/50 ${className ?? ""}`}
    >
      {children}
    </Link>
  );
};

export default PrimaryButton;
