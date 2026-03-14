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

const Index = () => {
  const [activeSection, setActiveSection] = useState("overview");

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-foreground tracking-tight">
              Decision Intelligence Interface
            </h1>
            <p className="text-xs text-muted-foreground mt-0.5">
              IIM Ranchi · Term IV Elective Allocation · MILP Optimisation Engine
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="ai-badge">MILP Engine Online</span>
            <span className="text-[10px] text-muted-foreground font-data">v1.0 · March 2026</span>
          </div>
        </div>

        {activeSection === "overview" && (
          <div className="space-y-4">
            <KPIGrid />
            <div className="grid grid-cols-2 gap-4">
              <EnrollmentChart />
              <SatisfactionDonut />
            </div>
            <CourseTable />
          </div>
        )}

        {activeSection === "courses" && (
          <div className="space-y-4">
            <CourseTable />
            <div className="grid grid-cols-2 gap-4">
              <EnrollmentChart />
              <SatisfactionDonut />
            </div>
          </div>
        )}

        {activeSection === "constraints" && <ConstraintPanel />}
        {activeSection === "whatif" && <WhatIfPanel />}
        {activeSection === "exceptions" && <ExceptionPanel />}
      </main>

      {/* Right Panel - AI Assistant */}
      <AIAssistantPanel />
    </div>
  );
};

export default Index;
