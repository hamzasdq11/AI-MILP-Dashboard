import { motion } from "framer-motion";
import { ArrowRight, Database, Brain, BarChart3, Lightbulb, FileSpreadsheet, Settings2 } from "lucide-react";

const steps = [
  {
    icon: Lightbulb,
    label: "Problem Definition",
    desc: "373 students must each be assigned exactly 6 electives from 39 available courses, respecting capacity limits and maximising preference satisfaction.",
    color: "hsl(38, 92%, 50%)",
    human: true,
  },
  {
    icon: FileSpreadsheet,
    label: "Data Collection",
    desc: "Bid matrix (373 × 39) from WAI survey, course capacities, faculty constraints, and institutional rules collected via structured questionnaire.",
    color: "hsl(228, 62%, 22%)",
    human: true,
  },
  {
    icon: Settings2,
    label: "MILP Formulation",
    desc: "14,959 binary decision variables, 11,488 constraints (capacity, fairness, load-balancing), and weighted objective function formulated mathematically.",
    color: "hsl(228, 62%, 22%)",
    human: true,
  },
  {
    icon: Brain,
    label: "AI/MILP Solver",
    desc: "SciPy HiGHS Branch-and-Cut engine solves the NP-hard optimisation in 13.2s, achieving provably global optimum (MIP gap: 0.065%).",
    color: "hsl(152, 60%, 36%)",
    human: false,
  },
  {
    icon: BarChart3,
    label: "Output & Analysis",
    desc: "96.74% bid satisfaction, 30 active courses, only 5 forced assignments. Counter-intuitive solver decisions analysed (e.g., PSM cancellation).",
    color: "hsl(152, 60%, 36%)",
    human: false,
  },
  {
    icon: Database,
    label: "Dashboard & Insights",
    desc: "Interactive Decision Intelligence Interface with What-If scenario engine, constraint audit, and AI executive summary for the Academic Policy Office.",
    color: "hsl(228, 62%, 22%)",
    human: true,
  },
];

const tools = [
  { name: "Python 3.11", role: "Core programming language" },
  { name: "SciPy MILP (HiGHS)", role: "Optimisation solver engine" },
  { name: "Claude AI", role: "Code generation, dashboard development, prompt engineering" },
  { name: "Lovable", role: "Web application builder (React + Vite + Tailwind)" },
  { name: "Pandas / NumPy", role: "Data wrangling & matrix operations" },
  { name: "Recharts", role: "Interactive data visualisation" },
];

export default function MethodologyPanel() {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="space-y-5"
    >
      {/* Pipeline */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-bold text-foreground mb-1">Methodology Pipeline</h3>
        <p className="text-[10px] text-muted-foreground font-medium mb-5">
          End-to-end workflow from problem identification to actionable decision support
        </p>

        <div className="space-y-0">
          {steps.map((step, i) => (
            <motion.div
              key={step.label}
              initial={{ x: -15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <div className="flex gap-4">
                {/* Timeline line */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                    style={{ background: step.color, color: "white" }}
                  >
                    <step.icon className="w-5 h-5" />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-0.5 flex-1 my-1" style={{ background: "hsl(228, 30%, 85%)" }} />
                  )}
                </div>

                {/* Content */}
                <div className="pb-5 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-foreground">{step.label}</span>
                    <span
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                      style={{
                        background: step.human ? "hsl(228, 62%, 18%, 0.08)" : "hsl(152, 60%, 36%, 0.08)",
                        color: step.human ? "hsl(228, 62%, 18%)" : "hsl(152, 60%, 36%)",
                        border: `1px solid ${step.human ? "hsl(228, 62%, 18%, 0.15)" : "hsl(152, 60%, 36%, 0.15)"}`,
                      }}
                    >
                      {step.human ? "Human" : "AI/Solver"}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Tools Used */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-bold text-foreground mb-1">AI Tools & Platforms Used</h3>
        <p className="text-[10px] text-muted-foreground font-medium mb-4">
          Technology stack powering the allocation engine and interface
        </p>

        <div className="grid grid-cols-2 gap-2.5">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.3 }}
              className="p-3 rounded-xl flex items-start gap-3"
              style={{ background: "hsl(228, 30%, 96%)", border: "1.5px solid hsl(228, 30%, 90%)" }}
            >
              <div className="w-2 h-2 rounded-full mt-1 flex-shrink-0" style={{ background: "hsl(228, 62%, 22%)" }} />
              <div>
                <span className="text-[11px] font-bold text-foreground">{tool.name}</span>
                <p className="text-[10px] text-muted-foreground font-medium mt-0.5">{tool.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
