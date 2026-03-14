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
      <div className="flex items-center justify-between p-5" style={{ borderBottom: "2px solid hsl(228, 30%, 90%)" }}>
        <div>
          <h3 className="text-sm font-bold text-foreground">Course Allocation Matrix</h3>
          <p className="text-[10px] text-muted-foreground mt-0.5 font-medium">
            {showCancelled ? "9 courses cancelled by solver" : "30 active courses · sorted by enrollment"}
          </p>
        </div>
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: "hsl(228, 30%, 92%)" }}>
          <button
            onClick={() => setShowCancelled(false)}
            className={`text-[10px] font-bold px-4 py-2 rounded-lg transition-all ${
              !showCancelled
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Active ({activeCourses.length})
          </button>
          <button
            onClick={() => setShowCancelled(true)}
            className={`text-[10px] font-bold px-4 py-2 rounded-lg transition-all ${
              showCancelled
                ? "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Cancelled ({cancelledCourses.length})
          </button>
        </div>
      </div>

      <div className="overflow-auto max-h-[460px]">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-card z-10">
            <tr style={{ borderBottom: "2px solid hsl(228, 30%, 88%)" }}>
              <th className="text-left p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">#</th>
              <th className="text-left p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Course</th>
              <th className="text-right p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Cap</th>
              <th className="text-right p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Bidders</th>
              <th className="text-right p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Enrolled</th>
              <th className="text-left p-3 pl-4 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Fill %</th>
              <th className="text-right p-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((course, i) => (
              <motion.tr
                key={course.name}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.02, duration: 0.3 }}
                className="transition-colors hover:bg-surface-hover"
                style={{ borderBottom: "1px solid hsl(228, 30%, 92%)" }}
              >
                <td className="p-3 font-data text-muted-foreground">{i + 1}</td>
                <td className="p-3 font-semibold text-foreground">{course.name}</td>
                <td className="p-3 text-right font-data text-muted-foreground">{course.capacity}</td>
                <td className="p-3 text-right font-data text-muted-foreground">{course.bidders}</td>
                <td className="p-3 text-right font-data font-bold text-foreground">{course.enrolled}</td>
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
                      <span className="font-data text-muted-foreground w-10 text-right font-medium">{course.fillPercent.toFixed(0)}%</span>
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
