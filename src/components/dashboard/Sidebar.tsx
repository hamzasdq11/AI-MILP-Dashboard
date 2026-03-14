import { motion } from "framer-motion";
import { 
  BarChart3, 
  Settings, 
  Database,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Zap,
  User
} from "lucide-react";
import { modelMetrics } from "@/data/allocationData";
import iimLogo from "@/assets/iim-ranchi-logo.png";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: "overview", label: "Command Center", icon: BarChart3 },
  { id: "courses", label: "Course Matrix", icon: Database },
  { id: "constraints", label: "Constraint Engine", icon: Layers },
  { id: "whatif", label: "What-If Analysis", icon: Zap },
  { id: "exceptions", label: "Exception Audit", icon: AlertTriangle },
];

export default function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="w-[260px] min-w-[260px] h-screen flex flex-col"
      style={{ 
        background: "linear-gradient(180deg, hsl(228, 62%, 14%), hsl(228, 62%, 10%))",
      }}
    >
      {/* IIM Ranchi Logo + Branding */}
      <div className="p-5 pb-4" style={{ borderBottom: "1px solid hsl(228, 45%, 22%)" }}>
        <div className="flex items-center gap-3">
          <img src={iimLogo} alt="IIM Ranchi" className="w-11 h-11 object-contain" style={{ filter: "brightness(0) invert(1)" }} />
          <div>
            <h1 className="text-sm font-extrabold text-white tracking-tight leading-tight">MILP Allocator</h1>
            <p className="text-[9px] font-medium" style={{ color: "hsl(220, 25%, 55%)" }}>
              AI-Powered Course Allocation
            </p>
          </div>
        </div>

        {/* Purpose statement */}
        <div className="mt-3 p-2.5 rounded-lg" style={{ background: "hsl(228, 50%, 18%)", border: "1px solid hsl(228, 45%, 24%)" }}>
          <p className="text-[9px] leading-relaxed font-medium" style={{ color: "hsl(220, 25%, 65%)" }}>
            Engineered to solve the <span className="text-white font-bold">NP-hard elective allocation problem</span> for 373 students across 39 courses using Mixed-Integer Linear Programming, maximising bid satisfaction under institutional constraints.
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 pt-4 space-y-1">
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] px-3 mb-3" style={{ color: "hsl(220, 25%, 45%)" }}>
          Navigation
        </p>
        {navItems.map((item, i) => (
          <motion.button
            key={item.id}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 + i * 0.05, duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            onClick={() => onSectionChange(item.id)}
            className={`nav-item w-full ${activeSection === item.id ? "active" : ""}`}
          >
            <item.icon className="w-4 h-4" />
            <span className="font-medium">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* Model Status */}
      <div className="p-4 mx-3 mb-2 rounded-xl" style={{ background: "hsl(228, 50%, 18%)", border: "1px solid hsl(228, 45%, 24%)" }}>
        <p className="text-[9px] font-bold uppercase tracking-[0.2em] mb-3" style={{ color: "hsl(220, 25%, 50%)" }}>
          Model Status
        </p>
        <div className="space-y-3">
          <StatusRow icon={<CheckCircle2 className="w-3 h-3" />} label="Solver" value={modelMetrics.solver.split(" ")[0]} color="success" />
          <StatusRow icon={<Zap className="w-3 h-3" />} label="Latency" value={`${modelMetrics.solveTime}s`} color="success" />
          <StatusRow icon={<Settings className="w-3 h-3" />} label="MIP Gap" value="0.065%" color="success" />
          <StatusRow icon={<Database className="w-3 h-3" />} label="Variables" value="14,959" color="primary" />
        </div>
      </div>

      {/* Author */}
      <div className="px-5 py-3" style={{ borderTop: "1px solid hsl(228, 45%, 22%)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "hsl(228, 50%, 22%)" }}>
            <User className="w-3.5 h-3.5" style={{ color: "hsl(210, 50%, 72%)" }} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-white leading-tight">Mohammad Hamza Siddiqui</p>
            <p className="text-[9px] font-medium" style={{ color: "hsl(220, 25%, 50%)" }}>IPM Year 1 · Roll: IPM29-24</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

function StatusRow({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const colorMap: Record<string, string> = {
    success: "hsl(152, 60%, 50%)",
    primary: "hsl(210, 50%, 72%)",
    warning: "hsl(38, 92%, 60%)",
  };
  return (
    <div className="flex items-center justify-between text-[11px]">
      <div className="flex items-center gap-2" style={{ color: "hsl(220, 25%, 60%)" }}>
        <span style={{ color: colorMap[color] }}>{icon}</span>
        <span>{label}</span>
      </div>
      <span className="font-data font-semibold text-white">{value}</span>
    </div>
  );
}
