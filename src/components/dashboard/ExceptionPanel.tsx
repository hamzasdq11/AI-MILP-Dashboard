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
      className="space-y-5"
    >
      <div className="glass-card p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(38, 92%, 50%)", color: "white" }}>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Exception Audit Log</h3>
            <p className="text-[10px] text-muted-foreground font-medium">
              5 students received forced (zero-bid) assignments
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {exceptions.map((ex, i) => (
            <motion.div
              key={ex.student}
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.06, duration: 0.3 }}
              className="p-4 rounded-xl bg-card"
              style={{
                border: ex.critical ? "2px solid hsl(0, 72%, 51%, 0.25)" : "1.5px solid hsl(228, 30%, 88%)",
                borderLeft: ex.critical ? "4px solid hsl(0, 72%, 51%)" : "4px solid hsl(38, 92%, 50%)",
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <UserX className="w-3.5 h-3.5" style={{ color: ex.critical ? "hsl(0, 72%, 51%)" : "hsl(38, 92%, 50%)" }} />
                  <span className="font-data text-xs font-bold text-foreground">{ex.student}</span>
                  {ex.critical && <span className="status-cancelled">Critical</span>}
                </div>
                <span className="text-[10px] text-muted-foreground font-bold">
                  {ex.forced.length} forced course{ex.forced.length > 1 ? "s" : ""}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {ex.forced.map(c => (
                  <span key={c} className="text-[10px] font-semibold px-2 py-0.5 rounded-md" style={{ background: "hsl(38, 92%, 50%, 0.1)", color: "hsl(38, 75%, 38%)" }}>
                    {c}
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-muted-foreground font-medium">{ex.reason}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(228, 62%, 18%)", color: "white" }}>
            <Info className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-foreground">Counter-Intuitive Insight</h3>
        </div>
        <div className="p-4 rounded-xl" style={{ background: "hsl(228, 62%, 18%, 0.04)", border: "1.5px solid hsl(228, 62%, 18%, 0.12)" }}>
          <p className="text-xs font-bold text-foreground mb-1.5">Public Service Marketing — Cancelled Despite 43 Bidders</p>
          <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">
            The solver determined that redistributing PSM's 43 bidders to their other preferred courses yields
            higher total cohort satisfaction than keeping PSM active. This is a non-obvious outcome that
            <span className="font-bold" style={{ color: "hsl(228, 62%, 18%)" }}> only global optimisation can discover </span>
            — a rule-based system filtering on demand ≥ 40 would have produced a suboptimal result.
          </p>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="ai-badge">AI Attribution</span>
          <p className="text-[10px] text-muted-foreground font-medium">
            Source: MILP Solver (SciPy HiGHS) · Confidence: 1.00
          </p>
        </div>
      </div>
    </motion.div>
  );
}
