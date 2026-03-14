import { useState } from "react";
import { Menu, X, Brain } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";
import KPIGrid from "@/components/dashboard/KPIGrid";
import CourseTable from "@/components/dashboard/CourseTable";
import EnrollmentChart from "@/components/dashboard/EnrollmentChart";
import SatisfactionDonut from "@/components/dashboard/SatisfactionDonut";
import ConstraintPanel from "@/components/dashboard/ConstraintPanel";
import WhatIfPanel from "@/components/dashboard/WhatIfPanel";
import ExceptionPanel from "@/components/dashboard/ExceptionPanel";
import AIAssistantPanel from "@/components/dashboard/AIAssistantPanel";
import MethodologyPanel from "@/components/dashboard/MethodologyPanel";
import HumanAIPanel from "@/components/dashboard/HumanAIPanel";
import ImpactPanel from "@/components/dashboard/ImpactPanel";

const Index = () => {
  const [activeSection, setActiveSection] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [aiPanelOpen, setAiPanelOpen] = useState(false);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed left-0 top-0 z-50 h-full lg:hidden"
            >
              <Sidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile AI Panel Overlay */}
      <AnimatePresence>
        {aiPanelOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40 lg:hidden"
              onClick={() => setAiPanelOpen(false)}
            />
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 h-full lg:hidden"
            >
              <AIAssistantPanel />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto min-w-0">
        {/* Header banner */}
        <div
          className="px-4 sm:px-8 py-4 sm:py-6 flex items-center justify-between gap-3"
          style={{
            background: "linear-gradient(135deg, hsl(228, 62%, 14%), hsl(228, 55%, 22%))",
          }}
        >
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors flex-shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0 flex-1">
            <h1 className="text-base sm:text-xl font-extrabold text-white tracking-tight truncate">
              Decision Intelligence Interface
            </h1>
            <p className="text-[10px] sm:text-xs mt-0.5 sm:mt-1 font-medium truncate" style={{ color: "hsl(220, 25%, 78%)" }}>
              IIM Ranchi · Term IV Elective Allocation · MILP Optimisation Engine
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <span className="hidden sm:inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-white/10 text-white border border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              MILP Engine Online
            </span>
            {/* Mobile: just the green dot */}
            <span className="sm:hidden w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            
            {/* Mobile AI panel toggle */}
            <button
              onClick={() => setAiPanelOpen(true)}
              className="lg:hidden p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <Brain className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="p-3 sm:p-6 space-y-4 sm:space-y-5">
          {activeSection === "overview" && (
            <div className="space-y-4 sm:space-y-5">
              <KPIGrid />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <EnrollmentChart />
                <SatisfactionDonut />
              </div>
              <CourseTable />
            </div>
          )}

          {activeSection === "courses" && (
            <div className="space-y-4 sm:space-y-5">
              <CourseTable />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                <EnrollmentChart />
                <SatisfactionDonut />
              </div>
            </div>
          )}

          {activeSection === "methodology" && <MethodologyPanel />}
          {activeSection === "humanai" && <HumanAIPanel />}
          {activeSection === "constraints" && <ConstraintPanel />}
          {activeSection === "whatif" && <WhatIfPanel />}
          {activeSection === "exceptions" && <ExceptionPanel />}
          {activeSection === "impact" && <ImpactPanel />}
        </div>
      </main>

      {/* Desktop AI Panel */}
      <div className="hidden lg:block">
        <AIAssistantPanel />
      </div>
    </div>
  );
};

export default Index;
