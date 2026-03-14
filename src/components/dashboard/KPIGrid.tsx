import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Info } from "lucide-react";
import { kpis } from "@/data/allocationData";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const tooltips: Record<string, string> = {
  "Bid Satisfaction": "Source: MILP Solver (SciPy HiGHS) · Confidence: 1.00 · Human Override: Enabled",
  "Students Allocated": "All 373 students received exactly 6 courses. Zero unallocated.",
  "Active Courses": "30 courses activated. 9 cancelled (8 low demand + 1 solver-optimised).",
  "Solve Time": "HiGHS Branch-and-Cut with 0.065% MIP gap guarantee.",
  "Forced Assignments": "Only 5 students received a zero-bid course. Hard-capped by C5.",
  "Decision Variables": "14,547 assignment + 39 activation + 373 fairness indicators.",
};

export default function KPIGrid() {
  return (
    <div className="grid grid-cols-3 gap-3">
      {kpis.map((kpi, i) => (
        <motion.div
          key={kpi.label}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.05, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
          className="kpi-card group"
        >
          <div className="flex items-start justify-between mb-2">
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              {kpi.label}
            </span>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Info className="w-3 h-3 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[260px] text-xs">
                <div className="ai-badge mb-1.5">AI Attribution</div>
                <p>{tooltips[kpi.label]}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="kpi-value">{kpi.value}</div>
          <div className="flex items-center gap-1.5 mt-1.5">
            {kpi.trend === "up" && <TrendingUp className="w-3 h-3" style={{ color: "hsl(var(--success))" }} />}
            {kpi.trend === "down" && <TrendingDown className="w-3 h-3" style={{ color: "hsl(var(--risk))" }} />}
            {kpi.trend === "neutral" && <Minus className="w-3 h-3 text-muted-foreground" />}
            <span className="text-[11px] text-muted-foreground">{kpi.subLabel}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
