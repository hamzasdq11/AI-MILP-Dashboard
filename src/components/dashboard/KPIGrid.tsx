import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Minus, Info, BarChart2, Users, BookOpen, Zap, AlertTriangle, Binary } from "lucide-react";
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

const iconComponents: Record<string, React.ElementType> = {
  "Bid Satisfaction": BarChart2,
  "Students Allocated": Users,
  "Active Courses": BookOpen,
  "Solve Time": Zap,
  "Forced Assignments": AlertTriangle,
  "Decision Variables": Binary,
};

const iconColors: Record<string, string> = {
  "Bid Satisfaction": "hsl(228, 62%, 28%)",
  "Students Allocated": "hsl(210, 60%, 45%)",
  "Active Courses": "hsl(152, 50%, 38%)",
  "Solve Time": "hsl(38, 80%, 50%)",
  "Forced Assignments": "hsl(0, 60%, 50%)",
  "Decision Variables": "hsl(270, 50%, 50%)",
};

export default function KPIGrid() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
      {kpis.map((kpi, i) => {
        const IconComp = iconComponents[kpi.label];
        return (
        <motion.div
          key={kpi.label}
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: i * 0.06, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="kpi-card group"
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${iconColors[kpi.label]}15` }}>
                {IconComp && <IconComp className="w-3.5 h-3.5" style={{ color: iconColors[kpi.label] }} />}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                {kpi.label}
              </span>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <Info className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left" className="max-w-[260px] text-xs">
                <div className="ai-badge mb-1.5">AI Attribution</div>
                <p>{tooltips[kpi.label]}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="kpi-value">{kpi.value}</div>
          <div className="flex items-center gap-1.5 mt-2">
            {kpi.trend === "up" && <TrendingUp className="w-3 h-3 text-success" />}
            {kpi.trend === "down" && <TrendingDown className="w-3 h-3 text-risk" />}
            {kpi.trend === "neutral" && <Minus className="w-3 h-3 text-muted-foreground" />}
            <span className="text-[11px] text-muted-foreground font-medium">{kpi.subLabel}</span>
          </div>
        </motion.div>
        );
      })}
    </div>
  );
}
