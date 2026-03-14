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
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Constraint Architecture</h3>
        </div>
        <p className="text-[11px] text-muted-foreground mb-4">
          {modelMetrics.totalConstraints.toLocaleString()} constraints ensure provably optimal allocation
        </p>

        <div className="space-y-3">
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
                  <span className="text-foreground font-medium">{c.name}</span>
                  <span className="font-data text-muted-foreground">{c.count.toLocaleString()}</span>
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
                <p className="text-[10px] text-muted-foreground">{c.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="glass-card p-5">
        <div className="flex items-center gap-2 mb-3">
          <Lock className="w-4 h-4 text-success" />
          <h3 className="text-sm font-semibold text-foreground">Optimality Certificate</h3>
        </div>
        <div className="space-y-2">
          {[
            { label: "Solver Engine", value: modelMetrics.solver },
            { label: "Optimality", value: modelMetrics.optimality },
            { label: "Library", value: modelMetrics.library },
            { label: "Satisfaction Achieved", value: `${modelMetrics.satisfactionAchieved.toLocaleString()} pts` },
            { label: "Theoretical Maximum", value: `${modelMetrics.satisfactionTheoretical.toLocaleString()} pts` },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between text-xs py-1.5 border-b border-border last:border-0">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-data text-foreground font-medium">{item.value}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-lg flex items-center gap-2" style={{ background: "hsl(var(--success) / 0.08)", border: "1px solid hsl(var(--success) / 0.2)" }}>
          <CheckCircle2 className="w-3.5 h-3.5 text-success" />
          <span className="text-[11px] text-success font-medium">
            No feasible allocation can exceed this result
          </span>
        </div>
      </div>
    </motion.div>
  );
}
