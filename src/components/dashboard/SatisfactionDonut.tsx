import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { studentStats } from "@/data/allocationData";

const donutData = studentStats.map(s => ({ name: s.label, value: s.count }));
const COLORS = [
  "hsl(152, 60%, 36%)",
  "hsl(228, 62%, 22%)",
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
      <h3 className="text-sm font-bold text-foreground mb-1">Student Satisfaction Breakdown</h3>
      <p className="text-[10px] text-muted-foreground mb-4 font-medium">How many of each student's top-6 they received</p>

      <div className="flex items-center gap-5">
        <div className="w-[150px] h-[150px] relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutData}
                cx="50%"
                cy="50%"
                innerRadius={44}
                outerRadius={68}
                dataKey="value"
                strokeWidth={3}
                stroke="hsl(0, 0%, 100%)"
              >
                {donutData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-data text-xl font-bold" style={{ color: "hsl(228, 62%, 18%)" }}>96.7%</span>
            <span className="text-[8px] text-muted-foreground font-bold uppercase tracking-wider">Satisfaction</span>
          </div>
        </div>

        <div className="flex-1 space-y-2.5">
          {studentStats.map((stat, i) => (
            <div key={stat.label} className="flex items-center gap-2.5 text-xs">
              <div className="w-3 h-3 rounded flex-shrink-0" style={{ background: COLORS[i] }} />
              <span className="text-muted-foreground flex-1 font-medium">{stat.label}</span>
              <span className="font-data font-bold text-foreground">{stat.count}</span>
              <span className="font-data text-muted-foreground w-12 text-right">{stat.percent}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
