import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Zap, RotateCcw } from "lucide-react";
import { modelMetrics } from "@/data/allocationData";

export default function WhatIfPanel() {
  const [minEnrollment, setMinEnrollment] = useState(40);
  const [fairnessCap, setFairnessCap] = useState(5);
  const [coursesPerStudent, setCoursesPerStudent] = useState(6);

  const simulation = useMemo(() => {
    const baseRatio = modelMetrics.satisfactionRatio;
    let adjustedRatio = baseRatio;
    let adjustedCourses = 30;
    let adjustedForced = 5;

    if (minEnrollment < 40) {
      adjustedCourses = Math.min(39, 30 + Math.floor((40 - minEnrollment) / 5));
      adjustedRatio = Math.min(99, baseRatio + (40 - minEnrollment) * 0.08);
    } else if (minEnrollment > 40) {
      adjustedCourses = Math.max(20, 30 - Math.floor((minEnrollment - 40) / 10));
      adjustedRatio = Math.max(85, baseRatio - (minEnrollment - 40) * 0.15);
    }

    if (fairnessCap > 5) {
      adjustedRatio = Math.min(99, adjustedRatio + (fairnessCap - 5) * 0.05);
      adjustedForced = Math.min(fairnessCap, adjustedForced + Math.floor((fairnessCap - 5) / 2));
    } else if (fairnessCap < 5) {
      adjustedRatio = Math.max(90, adjustedRatio - (5 - fairnessCap) * 0.3);
      adjustedForced = fairnessCap;
    }

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
      className="space-y-5"
    >
      <div className="glass-card p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(38, 92%, 50%)", color: "white" }}>
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground">What-If Scenario Engine</h3>
              <p className="text-[10px] text-muted-foreground font-medium">Explore trade-offs before re-running the solver</p>
            </div>
          </div>
          {isModified && (
            <button onClick={reset} className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wider">
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>

        <div className="space-y-5 mt-5">
          <SliderControl label="Minimum Enrollment Threshold" value={minEnrollment} min={20} max={80} onChange={setMinEnrollment} suffix=" students" baseline={40} />
          <SliderControl label="Fairness Cap (Max Forced)" value={fairnessCap} min={0} max={20} onChange={setFairnessCap} suffix=" students" baseline={5} />
          <SliderControl label="Courses Per Student" value={coursesPerStudent} min={4} max={8} onChange={setCoursesPerStudent} suffix=" courses" baseline={6} />
        </div>
      </div>

      <div className="glass-card p-5">
        <h4 className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-4">Projected Outcome</h4>
        <div className="grid grid-cols-2 gap-3">
          <ResultCard label="Predicted Satisfaction" value={`${simulation.ratio}%`} delta={parseFloat(simulation.delta)} />
          <ResultCard label="Active Courses" value={`${simulation.courses}/39`} delta={simulation.courses - 30} />
          <ResultCard label="Forced Assignments" value={`${simulation.forced}`} delta={simulation.forced - 5} invertDelta />
          <ResultCard label="Total Bid Points" value={simulation.satisfaction.toLocaleString()} delta={simulation.satisfaction - modelMetrics.satisfactionAchieved} />
        </div>

        {isModified && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 p-3.5 rounded-xl"
            style={{ background: "hsl(228, 62%, 18%, 0.05)", border: "1.5px solid hsl(228, 62%, 18%, 0.12)" }}
          >
            <p className="text-[11px] font-semibold" style={{ color: "hsl(228, 62%, 18%)" }}>
              These are projected estimates. Click below to run the MILP solver with updated parameters.
            </p>
          </motion.div>
        )}

        {isModified && (
          <button
            className="w-full mt-3 py-3 rounded-xl text-xs font-bold text-white transition-all hover:shadow-lg"
            style={{ background: "linear-gradient(135deg, hsl(228, 62%, 18%), hsl(228, 55%, 28%))" }}
          >
            Confirm & Re-Solve with MILP Engine
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
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-muted-foreground font-semibold">{label}</span>
        <span className={`font-data text-xs font-bold ${isChanged ? "text-warning" : "text-foreground"}`}>
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
      <div className="flex justify-between text-[9px] text-muted-foreground mt-1 font-medium">
        <span>{min}</span>
        <span className="opacity-50">baseline: {baseline}</span>
        <span>{max}</span>
      </div>
    </div>
  );
}

function ResultCard({ label, value, delta, invertDelta }: { label: string; value: string; delta: number; invertDelta?: boolean }) {
  const isPositive = invertDelta ? delta <= 0 : delta >= 0;
  return (
    <div className="p-4 rounded-xl" style={{ background: "hsl(228, 30%, 96%)", border: "1.5px solid hsl(228, 30%, 90%)" }}>
      <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="font-data text-lg font-bold mt-1" style={{ color: "hsl(228, 62%, 18%)" }}>{value}</div>
      {delta !== 0 && (
        <span className={`text-[10px] font-data font-bold ${isPositive ? "text-success" : "text-risk"}`}>
          {delta > 0 ? "+" : ""}{typeof delta === "number" && Math.abs(delta) > 100 ? delta.toLocaleString() : delta}
        </span>
      )}
    </div>
  );
}
