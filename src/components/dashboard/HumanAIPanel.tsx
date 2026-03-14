import { motion } from "framer-motion";
import { User, Bot, ArrowRight } from "lucide-react";

const contributions = [
  {
    category: "Problem Formulation",
    human: "Identified the real-world allocation problem at IIM Ranchi, defined constraints (C1–C5), fairness criteria, and objective function design",
    ai: "None — entirely human-designed based on institutional knowledge",
    humanPct: 100,
  },
  {
    category: "Data Collection & Preparation",
    human: "Designed WAI questionnaire, collected 373 student bid responses, validated data integrity, defined capacity tables",
    ai: "None — primary data collected via institutional survey",
    humanPct: 100,
  },
  {
    category: "Mathematical Modelling",
    human: "Formulated MILP: decision variables, constraint equations, weighted bid objective function, fairness indicator design",
    ai: "Claude assisted in translating mathematical formulation to SciPy syntax and debugging constraint indexing",
    humanPct: 75,
  },
  {
    category: "Solver & Optimisation",
    human: "Selected solver (HiGHS), tuned parameters, validated feasibility, interpreted MIP gap",
    ai: "SciPy HiGHS engine performed the Branch-and-Cut search across 14,959 variables to find global optimum in 13.2s",
    humanPct: 30,
  },
  {
    category: "Result Interpretation",
    human: "Analysed why PSM was cancelled despite 43 bidders, identified S144 zero-bid anomaly, drew managerial recommendations",
    ai: "Solver output provided the raw allocation data; human interpreted counter-intuitive outcomes",
    humanPct: 80,
  },
  {
    category: "Dashboard & Visualisation",
    human: "Designed information architecture, selected KPIs, defined What-If scenario parameters, wrote AI executive summary content",
    ai: "Claude + Lovable generated React code, Tailwind styling, Recharts integration, and interactive components",
    humanPct: 40,
  },
];

export default function HumanAIPanel() {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-bold text-foreground mb-1">Human vs AI Contribution</h3>
        <p className="text-[10px] text-muted-foreground font-medium mb-5">
          Transparent attribution of human decisions vs AI-generated outputs across each project phase
        </p>

        {/* Legend */}
        <div className="flex gap-4 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ background: "hsl(228, 62%, 22%)" }} />
            <span className="text-[10px] font-bold text-foreground">Human Contribution</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ background: "hsl(152, 60%, 36%)" }} />
            <span className="text-[10px] font-bold text-foreground">AI Contribution</span>
          </div>
        </div>

        <div className="space-y-4">
          {contributions.map((c, i) => (
            <motion.div
              key={c.category}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.3 }}
              className="p-4 rounded-xl"
              style={{ background: "hsl(228, 30%, 97%)", border: "1.5px solid hsl(228, 30%, 90%)" }}
            >
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold text-foreground">{c.category}</span>
                <span className="font-data text-[10px] font-bold" style={{ color: "hsl(228, 62%, 22%)" }}>
                  {c.humanPct}% Human
                </span>
              </div>

              {/* Bar */}
              <div className="h-2.5 rounded-full overflow-hidden flex mb-3" style={{ background: "hsl(228, 30%, 90%)" }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${c.humanPct}%` }}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                  className="h-full rounded-full"
                  style={{ background: "hsl(228, 62%, 22%)" }}
                />
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${100 - c.humanPct}%` }}
                  transition={{ delay: 0.5 + i * 0.06, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                  className="h-full"
                  style={{ background: "hsl(152, 60%, 36%)" }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="flex gap-2">
                  <User className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: "hsl(228, 62%, 22%)" }} />
                  <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">{c.human}</p>
                </div>
                <div className="flex gap-2">
                  <Bot className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: "hsl(152, 60%, 36%)" }} />
                  <p className="text-[10px] text-muted-foreground leading-relaxed font-medium">{c.ai}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="glass-card p-5">
        <h4 className="text-xs font-bold text-foreground mb-3">Attribution Summary</h4>
        <div className="grid grid-cols-3 gap-3">
          <SummaryCard label="Overall Human" value="~65%" desc="Problem design, data, interpretation" color="hsl(228, 62%, 22%)" />
          <SummaryCard label="Overall AI" value="~35%" desc="Solving, code generation, styling" color="hsl(152, 60%, 36%)" />
          <SummaryCard label="Key Insight" value="Hybrid" desc="Human sets rules, AI finds optimum" color="hsl(38, 92%, 50%)" />
        </div>
      </div>
    </motion.div>
  );
}

function SummaryCard({ label, value, desc, color }: { label: string; value: string; desc: string; color: string }) {
  return (
    <div className="p-4 rounded-xl text-center" style={{ background: `${color}08`, border: `1.5px solid ${color}20` }}>
      <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      <div className="font-data text-2xl font-bold mt-1" style={{ color }}>{value}</div>
      <p className="text-[9px] text-muted-foreground font-medium mt-1">{desc}</p>
    </div>
  );
}
