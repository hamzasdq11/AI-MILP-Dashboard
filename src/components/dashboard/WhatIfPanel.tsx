import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Zap, RotateCcw } from "lucide-react";
import { modelMetrics } from "@/data/allocationData";

export default function WhatIfPanel() {
  const [minEnrollment, setMinEnrollment] = useState(40);
  const [fairnessCap, setFairnessCap] = useState(5);
  const [coursesPerStudent, setCoursesPerStudent] = useState(6);

  const simulation = useMemo(() => {
    // Simulated impact of parameter changes
    const baseRatio = modelMetrics.satisfactionRatio;
    let adjustedRatio = baseRatio;
    let adjustedCourses = 30;
    let adjustedForced = 5;

    // Lower min enrollment → more courses can run → potentially higher satisfaction
    if (minEnrollment < 40) {
      adjustedCourses = Math.min(39, 30 + Math.floor((40 - minEnrollment) / 5));
      adjustedRatio = Math.min(99, baseRatio + (40 - minEnrollment) * 0.08);
    } else if (minEnrollment > 40) {
      adjustedCourses = Math.max(20, 30 - Math.floor((minEnrollment - 40) / 10));
      adjustedRatio = Math.max(85, baseRatio - (minEnrollment - 40) * 0.15);
    }

    // Fairness cap changes
    if (fairnessCap > 5) {
      adjustedRatio = Math.min(99, adjustedRatio + (fairnessCap - 5) * 0.05);
      adjustedForced = Math.min(fairnessCap, adjustedForced + Math.floor((fairnessCap - 5) / 2));
    } else if (fairnessCap < 5) {
      adjustedRatio = Math.max(90, adjustedRatio - (5 - fairnessCap) * 0.3);
      adjustedForced = fairnessCap;
    }

    // Courses per student
    if (coursesPerStudent !== 6) {
      adjustedRatio = Math.max(80, adjustedRatio - Math.abs(coursesPerStudent - 6) * 2);
    }

    const adjustedSatisfaction = Math.round((adjustedRatio / 100) * modelMetrics.satisfactionTheoretical);

    return {
      ratio: adjustedRatio.toFixed(1),
      courses: adjustedCourses,
      forced: adjustedForced,
      satisfaction: adjustedSatisfaction,
      delta: (adjustedRatio - baseRatio).toFixed(2),
    };
  }, [minEnrollment, fairnessCap, coursesPerStudent]);

  const reset = () => {
    setMinEnrollment(40);
    setFairnessCap(5);
    setCoursesPerStudent(6);
  };

  const isModified = minEnrollment !== 40 || fairnessCap !== 5 || coursesPerStudent !== 6;

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="space-y-4"
    >
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" style={{ color: "hsl(var(--warning))" }} />
            <h3 className="text-sm font-semibold text-foreground">What-If Scenario Engine</h3>
          </div>
          {isModified && (
            <button onClick={reset} className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors">
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
        <p className="text-[11px] text-muted-foreground mb-5">
          Adjust parameters to see how the allocation shifts. This empowers managers to explore trade-offs before re-running the solver.
        </p>

        <div className="space-y-5">
          <SliderControl
            label="Minimum Enrollment Threshold"
            value={minEnrollment}
            min={20}
            max={80}
            onChange={setMinEnrollment}
            suffix=" students"
            baseline={40}
          />
          <SliderControl
            label="Fairness Cap (Max Forced)"
            value={fairnessCap}
            min={0}
            max={20}
            onChange={setFairnessCap}
            suffix=" students"
            baseline={5}
          />
          <SliderControl
            label="Courses Per Student"
            value={coursesPerStudent}
            min={4}
            max={8}
            onChange={setCoursesPerStudent}
            suffix=" courses"
            baseline={6}
          />
        </div>
      </div>

      {/* Simulated Results */}
      <div className="glass-card p-4">
        <h4 className="text-xs font-semibold text-foreground mb-3">Projected Outcome</h4>
        <div className="grid grid-cols-2 gap-3">
          <ResultCard
            label="Predicted Satisfaction"
            value={`${simulation.ratio}%`}
            delta={parseFloat(simulation.delta)}
          />
          <ResultCard
            label="Active Courses"
            value={`${simulation.courses}/39`}
            delta={simulation.courses - 30}
          />
          <ResultCard
            label="Forced Assignments"
            value={`${simulation.forced}`}
            delta={simulation.forced - 5}
            invertDelta
          />
          <ResultCard
            label="Total Bid Points"
            value={simulation.satisfaction.toLocaleString()}
            delta={simulation.satisfaction - modelMetrics.satisfactionAchieved}
          />
        </div>

        {isModified && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 p-2.5 rounded-md" style={{ background: "hsl(var(--primary) / 0.08)" }}
          >
            <p className="text-[11px]" style={{ color: "hsl(var(--primary))" }}>
              ⚡ These are projected estimates. Click "Confirm & Re-Solve" to run the MILP solver with updated parameters.
            </p>
          </motion.div>
        )}

        {isModified && (
          <button className="w-full mt-3 py-2 rounded-md text-xs font-medium transition-colors" style={{ background: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" }}>
            Confirm AI Suggestion & Re-Solve
          </button>
        )}
      </div>
    </motion.div>
  );
}

function SliderControl({
  label, value, min, max, onChange, suffix, baseline,
}: {
  label: string; value: number; min: number; max: number; onChange: (v: number) => void; suffix: string; baseline: number;
}) {
  const isChanged = value !== baseline;
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className={`font-data text-xs font-semibold ${isChanged ? "text-warning" : "text-foreground"}`}>
          {value}{suffix}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={e => onChange(parseInt(e.target.value))}
        className="slider-track w-full appearance-none"
      />
      <div className="flex justify-between text-[9px] text-muted-foreground mt-0.5">
        <span>{min}</span>
        <span className="text-muted-foreground/50">baseline: {baseline}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function ResultCard({ label, value, delta, invertDelta }: { label: string; value: string; delta: number; invertDelta?: boolean }) {
  const isPositive = invertDelta ? delta <= 0 : delta >= 0;
  return (
    <div className="p-3 rounded-md" style={{ background: "hsl(var(--muted) / 0.5)" }}>
      <span className="text-[10px] text-muted-foreground">{label}</span>
      <div className="font-data text-lg font-bold text-foreground mt-0.5">{value}</div>
      {delta !== 0 && (
        <span className="text-[10px] font-data" style={{ color: isPositive ? "hsl(var(--success))" : "hsl(var(--risk))" }}>
          {delta > 0 ? "+" : ""}{typeof delta === "number" && Math.abs(delta) > 100 ? delta.toLocaleString() : delta}
        </span>
      )}
    </div>
  );
}
