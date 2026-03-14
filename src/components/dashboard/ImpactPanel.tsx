import { motion } from "framer-motion";
import { Users, Building2, TrendingUp, AlertCircle, Rocket, Target } from "lucide-react";

const stakeholders = [
  {
    icon: Building2,
    title: "Academic Policy Office (APO)",
    desc: "Replace manual Excel-based allocation with a provably optimal solver. Eliminate weeks of ad-hoc adjustments and student complaints.",
    impact: "70% reduction in allocation cycle time",
  },
  {
    icon: Users,
    title: "373 Students (per term)",
    desc: "96.7% receive courses they actually bid for. Only 1.3% face forced assignments vs. the arbitrary assignments of manual systems.",
    impact: "92.2% got top-6 or 5-of-top-6",
  },
  {
    icon: Target,
    title: "Faculty & Department Heads",
    desc: "Data-driven course activation decisions. Clear evidence for which courses to run, cancel, or expand based on demand analysis.",
    impact: "9 courses cancelled with data justification",
  },
];

const scalability = [
  { metric: "Students", current: "373", scalable: "5,000+", note: "Solver scales with O(n²) variable growth" },
  { metric: "Courses", current: "39", scalable: "200+", note: "Linear constraint growth per course" },
  { metric: "Solve Time", current: "13.2s", scalable: "< 5 min", note: "HiGHS parallelization for larger instances" },
  { metric: "Institutions", current: "1 (IIM Ranchi)", scalable: "All IIMs/IITs", note: "Model is parameterised and reusable" },
];

const limitations = [
  "Static bid data — does not account for real-time preference changes after bidding closes",
  "Single-objective optimisation — currently maximises total satisfaction, could extend to multi-objective (equity + efficiency)",
  "No group/section constraints — does not handle timetable clashes or sectional preferences",
  "Fairness metric is binary (forced/not-forced) — could be refined to measure degree of preference deviation",
];

const futureScope = [
  { title: "Multi-Term Optimisation", desc: "Extend to allocate across Terms IV–VI simultaneously, balancing course load over a student's entire programme" },
  { title: "Timetable Integration", desc: "Add time-slot clash constraints to ensure no student is assigned overlapping courses" },
  { title: "Preference Elicitation AI", desc: "Use NLP to analyse course descriptions and recommend bids to students based on career goals" },
  { title: "Real-Time Dashboard", desc: "Connect to a live Supabase backend for real-time solver execution and result tracking" },
];

export default function ImpactPanel() {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="space-y-5"
    >
      {/* Stakeholder Impact */}
      <div className="glass-card p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(228, 62%, 18%)", color: "white" }}>
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Practical & Managerial Relevance</h3>
            <p className="text-[10px] text-muted-foreground font-medium">Who benefits and how this creates value</p>
          </div>
        </div>

        <div className="space-y-3">
          {stakeholders.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.3 }}
              className="p-4 rounded-xl bg-card"
              style={{ border: "1.5px solid hsl(228, 30%, 88%)", borderLeft: "4px solid hsl(228, 62%, 22%)" }}
            >
              <div className="flex items-start gap-3">
                <s.icon className="w-5 h-5 mt-0.5 flex-shrink-0" style={{ color: "hsl(228, 62%, 22%)" }} />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-foreground">{s.title}</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: "hsl(152, 60%, 36%, 0.08)", color: "hsl(152, 60%, 36%)", border: "1px solid hsl(152, 60%, 36%, 0.15)" }}>
                      {s.impact}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">{s.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scalability */}
      <div className="glass-card p-5">
        <h3 className="text-sm font-bold text-foreground mb-1">Scalability Analysis</h3>
        <p className="text-[10px] text-muted-foreground font-medium mb-4">How this solution scales to larger institutions</p>

        <div className="overflow-hidden rounded-xl" style={{ border: "1.5px solid hsl(228, 30%, 88%)" }}>
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: "hsl(228, 62%, 18%)" }}>
                <th className="text-left p-3 text-[10px] font-bold uppercase tracking-wider text-white">Metric</th>
                <th className="text-center p-3 text-[10px] font-bold uppercase tracking-wider text-white">Current</th>
                <th className="text-center p-3 text-[10px] font-bold uppercase tracking-wider text-white">Scalable To</th>
                <th className="text-left p-3 text-[10px] font-bold uppercase tracking-wider text-white">Note</th>
              </tr>
            </thead>
            <tbody>
              {scalability.map((s, i) => (
                <tr key={s.metric} style={{ borderBottom: "1px solid hsl(228, 30%, 92%)", background: i % 2 === 0 ? "white" : "hsl(228, 30%, 98%)" }}>
                  <td className="p-3 font-semibold text-foreground">{s.metric}</td>
                  <td className="p-3 text-center font-data font-bold text-foreground">{s.current}</td>
                  <td className="p-3 text-center font-data font-bold" style={{ color: "hsl(152, 60%, 36%)" }}>{s.scalable}</td>
                  <td className="p-3 text-muted-foreground font-medium">{s.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Limitations & Future */}
      <div className="grid grid-cols-2 gap-5">
        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertCircle className="w-4 h-4" style={{ color: "hsl(38, 92%, 50%)" }} />
            <h3 className="text-xs font-bold text-foreground">Current Limitations</h3>
          </div>
          <div className="space-y-2">
            {limitations.map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
                className="flex gap-2 text-[10px] text-muted-foreground font-medium leading-relaxed"
              >
                <span className="text-warning mt-0.5 flex-shrink-0">•</span>
                <span>{l}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="glass-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Rocket className="w-4 h-4" style={{ color: "hsl(152, 60%, 36%)" }} />
            <h3 className="text-xs font-bold text-foreground">Future Scope</h3>
          </div>
          <div className="space-y-2.5">
            {futureScope.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <span className="text-[11px] font-bold text-foreground">{f.title}</span>
                <p className="text-[10px] text-muted-foreground font-medium mt-0.5">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
