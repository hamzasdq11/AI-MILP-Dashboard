import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { activeCourses } from "@/data/allocationData";

const chartData = activeCourses
  .sort((a, b) => b.enrolled - a.enrolled)
  .slice(0, 15)
  .map(c => ({
    name: c.name.length > 16 ? c.name.slice(0, 16) + "…" : c.name,
    enrolled: c.enrolled,
    capacity: c.capacity,
    fill: c.fillPercent,
  }));

const getBarColor = (fill: number) => {
  if (fill === 100) return "hsl(152, 60%, 36%)";
  if (fill >= 60) return "hsl(228, 62%, 22%)";
  return "hsl(228, 45%, 55%)";
};

export default function EnrollmentChart() {
  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="glass-card p-5"
    >
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-foreground">Enrollment Distribution</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">Top 15 courses · Capacity vs Enrolled</p>
        </div>
        <span className="ai-badge">AI Optimised</span>
      </div>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(228, 30%, 90%)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 8, fill: "hsl(220, 12%, 44%)", fontWeight: 500 }}
            angle={-40}
            textAnchor="end"
            height={70}
            axisLine={{ stroke: "hsl(228, 30%, 85%)" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fill: "hsl(220, 12%, 44%)", fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(0, 0%, 100%)",
              border: "2px solid hsl(228, 62%, 18%)",
              borderRadius: "12px",
              fontSize: "11px",
              color: "hsl(228, 55%, 12%)",
              boxShadow: "0 8px 24px hsl(228, 62%, 18%, 0.12)",
              fontWeight: 500,
            }}
          />
          <Bar dataKey="capacity" fill="hsl(228, 30%, 90%)" radius={[4, 4, 0, 0]} barSize={14} name="Capacity" />
          <Bar dataKey="enrolled" radius={[4, 4, 0, 0]} barSize={14} name="Enrolled">
            {chartData.map((entry, index) => (
              <Cell key={index} fill={getBarColor(entry.fill)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
