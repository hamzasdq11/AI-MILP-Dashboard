import { motion } from "framer-motion";
import { 
  BarChart3, 
  Brain, 
  Settings, 
  Database,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Zap
} from "lucide-react";
import { modelMetrics } from "@/data/allocationData";

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
      className="w-[260px] min-w-[260px] h-screen border-r flex flex-col"
      style={{ 
        background: "hsl(var(--sidebar-background))",
        borderColor: "hsl(var(--sidebar-border))",
      }}
    >
      {/* Logo */}
      <div className="p-5" style={{ borderBottom: "1px solid hsl(var(--sidebar-border))" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--sidebar-primary) / 0.2)" }}>
            <Brain className="w-5 h-5" style={{ color: "hsl(var(--sidebar-primary))" }} />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight" style={{ color: "hsl(var(--primary-foreground))" }}>MILP Allocator</h1>
            <p className="text-[10px]" style={{ color: "hsl(var(--sidebar-foreground))" }}>IIM Ranchi · Term IV</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5">
        <p className="text-[10px] font-semibold uppercase tracking-widest px-3 pt-2 mb-2" style={{ color: "hsl(var(--sidebar-foreground) / 0.6)" }}>
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
            <span>{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* Model Status */}
      <div className="p-4" style={{ borderTop: "1px solid hsl(var(--sidebar-border))" }}>
        <p className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: "hsl(var(--sidebar-foreground) / 0.6)" }}>
          Model Status
        </p>
        <div className="space-y-2.5">
          <StatusRow icon={<CheckCircle2 className="w-3 h-3" />} label="Solver" value={modelMetrics.solver.split(" ")[0]} color="success" />
          <StatusRow icon={<Zap className="w-3 h-3" />} label="Latency" value={`${modelMetrics.solveTime}s`} color="success" />
          <StatusRow icon={<Settings className="w-3 h-3" />} label="MIP Gap" value="0.065%" color="success" />
          <StatusRow icon={<Database className="w-3 h-3" />} label="Variables" value="14,959" color="primary" />
        </div>
      </div>
    </motion.aside>
  );
}

function StatusRow({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  const colorMap: Record<string, string> = {
    success: "hsl(var(--success))",
    primary: "hsl(var(--sidebar-primary))",
    warning: "hsl(var(--warning))",
  };
  return (
    <div className="flex items-center justify-between text-xs">
      <div className="flex items-center gap-2" style={{ color: "hsl(var(--sidebar-foreground))" }}>
        <span style={{ color: colorMap[color] }}>{icon}</span>
        <span>{label}</span>
      </div>
      <span className="font-data font-medium" style={{ color: "hsl(var(--primary-foreground))" }}>{value}</span>
    </div>
  );
}
