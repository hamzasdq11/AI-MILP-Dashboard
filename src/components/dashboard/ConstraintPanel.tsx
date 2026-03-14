import { motion } from "framer-motion";
import { constraintBreakdown, modelMetrics } from "@/data/allocationData";
import { Shield, Lock, CheckCircle2 } from "lucide-react";

export default function ConstraintPanel() {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="space-y-5"
    >
      <div className="glass-card p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(228, 62%, 18%)", color: "white" }}>
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Constraint Architecture</h3>
            <p className="text-[10px] text-muted-foreground font-medium">
              {modelMetrics.totalConstraints.toLocaleString()} constraints ensure provably optimal allocation
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {constraintBreakdown.map((c, i) => {
            const pct = (c.count / modelMetrics.totalConstraints) * 100;
            return (
              <motion.div
                key={c.name}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.3 }}
                className="space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="text-foreground font-semibold">{c.name}</span>
                  <span className="font-data text-muted-foreground font-medium">{c.count.toLocaleString()}</span>
                </div>
                <div className="confidence-bar">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(pct, 2)}%` }}
                    transition={{ delay: 0.4 + i * 0.06, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                    className="confidence-fill"
                    style={{ background: "hsl(var(--primary))" }}
                  />
                </div>
                <p className="text-[10px] text-muted-foreground font-medium">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "hsl(152, 60%, 36%)", color: "white" }}>
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">Optimality Certificate</h3>
          </div>
        </div>
        <div className="space-y-0">
          {[
            { label: "Solver Engine", value: modelMetrics.solver },
            { label: "Optimality", value: modelMetrics.optimality },
            { label: "Library", value: modelMetrics.library },
            { label: "Satisfaction Achieved", value: `${modelMetrics.satisfactionAchieved.toLocaleString()} pts` },
            { label: "Theoretical Maximum", value: `${modelMetrics.satisfactionTheoretical.toLocaleString()} pts` },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between text-xs py-3" style={{ borderBottom: "1px solid hsl(228, 30%, 92%)" }}>
              <span className="text-muted-foreground font-medium">{item.label}</span>
              <span className="font-data text-foreground font-bold">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3.5 rounded-xl flex items-center gap-2.5" style={{ background: "hsl(152, 60%, 36%, 0.08)", border: "1.5px solid hsl(152, 60%, 36%, 0.2)" }}>
          <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0" />
          <span className="text-[11px] text-success font-bold">
            No feasible allocation can exceed this result
          </span>
        </div>
      </div>
    </motion.div>
  );
}
