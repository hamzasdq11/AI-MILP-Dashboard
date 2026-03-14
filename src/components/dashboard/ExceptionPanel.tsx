import { motion } from "framer-motion";
import { AlertTriangle, UserX, Info } from "lucide-react";

const exceptions = [
  {
    student: "S140",
    forced: ["Negotiation & Conflict Management", "AI & Deep Learning"],
    reason: "Bid distribution caused capacity conflict requiring reassignment.",
  },
  {
    student: "S144",
    forced: ["Technology & Future of Work", "Negotiation & Conflict Mgmt", "IT Product Management"],
    reason: "Submitted zero bids on any course — all 6 must be force-assigned.",
    critical: true,
  },
  {
    student: "S209",
    forced: ["International Marketing"],
    reason: "Minimum enrollment constraint forced one substitution.",
  },
  {
    student: "S281",
    forced: ["Business Model & Strategy"],
    reason: "Capacity ceiling on preferred course triggered reassignment.",
  },
  {
    student: "S350",
    forced: ["IT Product Management"],
    reason: "Low-demand course activation required absorption of extra student.",
  },
];

export default function ExceptionPanel() {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="space-y-4"
    >
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4" style={{ color: "hsl(var(--warning))" }} />
          <h3 className="text-sm font-semibold text-foreground">Exception Audit Log</h3>
        </div>
        <p className="text-[11px] text-muted-foreground mb-4">
          5 students received forced (zero-bid) assignments. This is the hard minimum required by the constraint system.
        </p>

        <div className="space-y-3">
          {exceptions.map((ex, i) => (
            <motion.div
              key={ex.student}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.3 }}
              className="p-3 rounded-md border"
              style={{
                background: ex.critical ? "hsl(var(--risk) / 0.06)" : "hsl(var(--muted) / 0.3)",
                borderColor: ex.critical ? "hsl(var(--risk) / 0.2)" : "hsl(var(--border))",
              }}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <UserX className="w-3.5 h-3.5" style={{ color: ex.critical ? "hsl(var(--risk))" : "hsl(var(--warning))" }} />
                  <span className="font-data text-xs font-semibold text-foreground">{ex.student}</span>
                  {ex.critical && <span className="status-cancelled">Critical</span>}
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {ex.forced.length} forced course{ex.forced.length > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex flex-wrap gap-1 mb-1.5">
                {ex.forced.map(c => (
                  <span key={c} className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: "hsl(var(--warning) / 0.1)", color: "hsl(var(--warning))" }}>
                    {c}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground">{ex.reason}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Public Service Marketing Insight */}
      <div className="glass-card p-4">
        <div className="flex items-center gap-2 mb-3">
          <Info className="w-4 h-4" style={{ color: "hsl(var(--primary))" }} />
          <h3 className="text-sm font-semibold text-foreground">Counter-Intuitive Insight</h3>
        </div>
        <div className="p-3 rounded-md" style={{ background: "hsl(var(--primary) / 0.06)", border: "1px solid hsl(var(--primary) / 0.15)" }}>
          <p className="text-xs font-medium text-foreground mb-1">Public Service Marketing — Cancelled Despite 43 Bidders</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed">
            The solver determined that redistributing PSM's 43 bidders to their other preferred courses yields
            higher total cohort satisfaction than keeping PSM active. This is a non-obvious outcome that
            <span className="font-semibold" style={{ color: "hsl(var(--primary))" }}> only global optimisation can discover </span>
            — a rule-based system filtering on demand ≥ 40 would have produced a suboptimal result.
          </p>
        </div>
        <div className="mt-3">
          <span className="ai-badge">AI Attribution</span>
          <p className="text-[10px] text-muted-foreground mt-1.5">
            Source: MILP Solver (SciPy HiGHS) · Confidence: 1.00 · Human Override: Enabled
          </p>
        </div>
      </div>
    </motion.div>
  );
}
