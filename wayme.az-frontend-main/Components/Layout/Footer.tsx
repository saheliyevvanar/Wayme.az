import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="relative mt-50 border-t border-white/5 bg-transparent py-16">
      {/* Top divider glow */}
      <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

      <div className="mx-auto max-w-6xl px-6 relative z-10">
        <div className="grid gap-12 md:grid-cols-2">
          <div className="flex flex-col items-center gap-6 md:items-start text-center md:text-left">
            <div className="text-3xl font-black tracking-tighter text-white">
              WAYME<span className="text-blue-500 italic">.AZ</span>
            </div>
            <p className="max-w-md text-base leading-relaxed text-slate-400">
              Professional karyera bələdçiniz. Gələcəyin peşəsini bu gündən bizimlə kəşf edin və professional inkişafınıza başlayın.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end justify-center gap-8">
            <div className="flex gap-4">
              {[Linkedin, Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="group glass-card flex h-12 w-12 items-center justify-center rounded-xl p-0"
                >
                  <Icon className="h-5 w-5 text-slate-400 transition-all duration-300 group-hover:scale-110 group-hover:text-blue-400" />
                </a>
              ))}
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">
              Sosial Şəbəkələrimiz
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8 text-center">
          <p className="text-[10px] font-bold text-slate-600 tracking-[0.2em] uppercase">
            © 2026 WAYME.AZ — KARYERA YÖNLƏNDİRMƏ PLATFORMASI. BÜTÜN HÜQUQLAR QORUNUR.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
