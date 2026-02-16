"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import CtaSection from "../Components/Home/CtaSection";
import InsightCardsSection from "../Components/Home/InsightCardsSection";
import ProfessionCardsSection from "../Components/Home/ProfessionCardsSection";
import BenefitsSection from "../Components/Home/BenefitsSection";
import Footer from "../Components/Layout/Footer";
import Hero from "../Components/Layout/Hero/page";
import HowItWorks from "@/Components/howworks/page";
import HowItWorksSection from "@/Components/Home/HowItWorksSection";

const Page = () => {
  const [userCount, setUserCount] = useState<number>(15);

  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';
        
        if (!isLocalhost) {
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://waymeaz-production.up.railway.app/api";
          const response = await fetch(`${apiUrl}/statistics/user-count`);
          if (response.ok) {
            const count = await response.json();
            setUserCount(count);
          }
        }
      } catch (error) {
        const saved = localStorage.getItem("testUserCount");
        if (saved) {
          setUserCount(Number(saved));
        }
      }
    };
    fetchUserCount();
  }, []);

  // Keep localStorage in sync when count changes
  useEffect(() => {
    localStorage.setItem("testUserCount", String(userCount));
  }, [userCount]);

  const router = useRouter();

  const handleStartTest = async () => {
    try {
      const isLocalhost = typeof window !== 'undefined' && window.location.hostname === 'localhost';
      
      if (!isLocalhost) {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://waymeaz-production.up.railway.app/api";
        const response = await fetch(`${apiUrl}/statistics/increment-users`, {
          method: "POST",
        });
        if (response.ok) {
          const newCount = await response.json();
          setUserCount(newCount);
        } else {
          setUserCount((prev) => prev + 1);
        }
      } else {
        // Local dev - just increment
        setUserCount((prev) => prev + 1);
      }
    } catch (error) {
      console.error("Backend uğursuz:", error);
      setUserCount((prev) => prev + 1);
    }
    router.push("/sexsi-melumatlar");
  };

  return (
    <div className="relative min-h-screen bg-[#091E3E] text-white selection:bg-blue-500/30">
      {/* Background Elements */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute -right-[10%] bottom-[20%] h-[50%] w-[50%] rounded-full bg-purple-600/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute left-[30%] top-[40%] h-[30%] w-[30%] rounded-full bg-indigo-600/5 blur-[100px]" />
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <main className="relative z-10 flex w-full flex-col pb-20 pt-16">
        <Hero onStartTest={handleStartTest} />

        <div className="mx-auto flex w-full max-w-6xl flex-col gap-24 px-6 mt-24">
          <InsightCardsSection />
          <ProfessionCardsSection />
          <HowItWorksSection />
          <BenefitsSection userCount={userCount} />
          <CtaSection onStart={handleStartTest} />
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Page;
