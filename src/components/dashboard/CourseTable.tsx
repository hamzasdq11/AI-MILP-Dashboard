import { motion } from "framer-motion";
import { activeCourses, cancelledCourses } from "@/data/allocationData";
import { useState } from "react";

export default function CourseTable() {
  const [showCancelled, setShowCancelled] = useState(false);
  const data = showCancelled ? cancelledCourses : activeCourses;

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="glass-card overflow-hidden"
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Course Allocation Matrix</h3>
          <p className="text-[11px] text-muted-foreground mt-0.5">
            {showCancelled ? "9 courses cancelled by solver" : "30 active courses · sorted by enrollment"}
          </p>
        </div>
        <div className="flex gap-1">
          <button
            onClick={() => setShowCancelled(false)}
            className={`text-xs px-3 py-1.5 rounded-md transition-colors ${!showCancelled ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            Active ({activeCourses.length})
          </button>
          <button
            onClick={() => setShowCancelled(true)}
            className={`text-xs px-3 py-1.5 rounded-md transition-colors ${showCancelled ? "bg-risk/15 text-risk" : "text-muted-foreground hover:text-foreground"}`}
          >
            Cancelled ({cancelledCourses.length})
          </button>
        </div>
      </div>

      <div className="overflow-auto max-h-[460px]">
        <table className="w-full text-xs">
          <thead className="sticky top-0" style={{ background: "hsl(var(--card))" }}>
            <tr className="border-b border-border">
              <th className="text-left p-3 text-muted-foreground font-medium">#</th>
              <th className="text-left p-3 text-muted-foreground font-medium">Course</th>
              <th className="text-right p-3 text-muted-foreground font-medium">Cap</th>
              <th className="text-right p-3 text-muted-foreground font-medium">Bidders</th>
              <th className="text-right p-3 text-muted-foreground font-medium">Enrolled</th>
              <th className="text-left p-3 text-muted-foreground font-medium pl-4">Fill %</th>
              <th className="text-right p-3 text-muted-foreground font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((course, i) => (
              <motion.tr
                key={course.name}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.02, duration: 0.3 }}
                className="border-b border-border/50 hover:bg-surface-hover transition-colors"
              >
                <td className="p-3 font-data text-muted-foreground">{i + 1}</td>
                <td className="p-3 font-medium text-foreground">{course.name}</td>
                <td className="p-3 text-right font-data text-muted-foreground">{course.capacity}</td>
                <td className="p-3 text-right font-data text-muted-foreground">{course.bidders}</td>
                <td className="p-3 text-right font-data font-semibold text-foreground">{course.enrolled}</td>
                <td className="p-3 pl-4 w-[140px]">
                  {course.status === "active" ? (
                    <div className="flex items-center gap-2">
                      <div className="confidence-bar flex-1">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${course.fillPercent}%` }}
                          transition={{ delay: 0.3 + i * 0.02, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
                          className="confidence-fill"
                          style={{
                            background: course.fillPercent === 100
                              ? "hsl(var(--success))"
                              : course.fillPercent >= 50
                              ? "hsl(var(--primary))"
                              : "hsl(var(--warning))"
                          }}
                        />
                      </div>
                      <span className="font-data text-muted-foreground w-10 text-right">{course.fillPercent.toFixed(0)}%</span>
                    </div>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="p-3 text-right">
                  <span className={course.status === "active" ? "status-active" : "status-cancelled"}>
                    {course.status === "active" ? "Active" : "Cancelled"}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
