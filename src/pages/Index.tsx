import { useState } from "react";
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

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto">
        {/* Header banner — deep navy like PPTX title slide */}
        <div
          className="px-8 py-6 flex items-center justify-between"
          style={{
            background: "linear-gradient(135deg, hsl(228, 62%, 14%), hsl(228, 55%, 22%))",
          }}
        >
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-tight">
              Decision Intelligence Interface
            </h1>
            <p className="text-xs mt-1 font-medium" style={{ color: "hsl(220, 25%, 78%)" }}>
              IIM Ranchi · Term IV Elective Allocation · MILP Optimisation Engine
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider px-4 py-2 rounded-full bg-white/10 text-white border border-white/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              MILP Engine Online
            </span>
            <span className="text-[10px] font-data font-medium" style={{ color: "hsl(220, 25%, 68%)" }}>
              v1.0 · March 2026
            </span>
          </div>
        </div>

        {/* Content area */}
        <div className="p-6 space-y-5">
          {activeSection === "overview" && (
            <div className="space-y-5">
              <KPIGrid />
              <div className="grid grid-cols-2 gap-5">
                <EnrollmentChart />
                <SatisfactionDonut />
              </div>
              <CourseTable />
            </div>
          )}

          {activeSection === "courses" && (
            <div className="space-y-5">
              <CourseTable />
              <div className="grid grid-cols-2 gap-5">
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

      {/* Right Panel - AI Assistant */}
      <AIAssistantPanel />
    </div>
  );
};

export default Index;
