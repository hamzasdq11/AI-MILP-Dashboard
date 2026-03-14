import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { studentStats } from "@/data/allocationData";

const donutData = studentStats.map(s => ({ name: s.label, value: s.count }));
const COLORS = [
  "hsl(160, 70%, 36%)",
  "hsl(230, 60%, 24%)",
  "hsl(38, 92%, 50%)",
  "hsl(0, 72%, 51%)",
  "hsl(280, 55%, 50%)",
];

export default function SatisfactionDonut() {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.25, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="glass-card p-5"
    >
      <h3 className="text-sm font-semibold text-foreground mb-1">Student Satisfaction Breakdown</h3>
      <p className="text-[11px] text-muted-foreground mb-3">How many of each student's top-6 they received</p>

      <div className="flex items-center gap-4">
        <div className="w-[140px] h-[140px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={65}
                dataKey="value"
                strokeWidth={2}
                stroke="hsl(0, 0%, 100%)"
              >
                {donutData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-data text-lg font-bold text-primary">96.7%</span>
            <span className="text-[9px] text-muted-foreground">Satisfaction</span>
          </div>
        </div>

        <div className="flex-1 space-y-2">
          {studentStats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-2 text-xs">
              <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: COLORS[i] }} />
              <span className="text-muted-foreground flex-1">{stat.label}</span>
              <span className="font-data font-medium text-foreground">{stat.count}</span>
              <span className="font-data text-muted-foreground w-12 text-right">{stat.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
