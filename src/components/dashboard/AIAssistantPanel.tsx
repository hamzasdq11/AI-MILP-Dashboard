import { motion } from "framer-motion";
import { Brain, ChevronRight, Lightbulb } from "lucide-react";

const insights = [
  {
    title: "Optimal Allocation Achieved",
    text: "The system achieved 96.7% bid satisfaction — meaning students collectively received courses worth 354,821 of a possible 366,773 bid points. No other valid allocation exists that can exceed this.",
    type: "success",
  },
  {
    title: "Capacity Utilisation",
    text: "3 courses hit full capacity (Corporate Strategy, Product & Brand Mgmt, Sales & Distribution). 7 courses at minimum viable enrollment (40 students).",
    type: "info",
  },
  {
    title: "Fairness Analysis",
    text: "92.2% of students got their top-6 or 5 of top-6 preferences. Only 5 students (1.3%) required forced assignment — the hard minimum under institutional constraints.",
    type: "info",
  },
  {
    title: "Solver Decision: PSM Cancelled",
    text: "Public Service Marketing (43 bidders) was cancelled by the solver. Redistributing those students to their alternate preferences increased total satisfaction — a counter-intuitive outcome only discoverable through MILP.",
    type: "warning",
  },
  {
    title: "APO Recommendation",
    text: "Contact Student S144 directly — they submitted zero bids and required full forced allocation. For future terms, mandate minimum 8–10 bids per student.",
    type: "action",
  },
];

const typeColors: Record<string, string> = {
  success: "hsl(152, 60%, 36%)",
  info: "hsl(228, 62%, 18%)",
  warning: "hsl(38, 92%, 50%)",
  action: "hsl(0, 72%, 51%)",
};

export default function AIAssistantPanel() {
  return (
    <motion.aside
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="w-[320px] min-w-[320px] h-screen overflow-y-auto"
      style={{
        background: "linear-gradient(180deg, hsl(220, 25%, 97%), hsl(220, 25%, 95%))",
        borderLeft: "2px solid hsl(228, 30%, 82%)",
      }}
    >
      <div className="p-5" style={{ borderBottom: "2px solid hsl(228, 30%, 85%)" }}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, hsl(228, 62%, 18%), hsl(228, 55%, 28%))" }}
          >
            <Brain className="w-4 h-4 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-foreground">AI Executive Summary</h2>
            <p className="text-[10px] text-muted-foreground font-medium">Natural language analysis</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-3">
        {insights.map((insight, i) => (
          <motion.div
            key={i}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="p-4 rounded-xl bg-card cursor-pointer group transition-shadow hover:shadow-md"
            style={{
              border: "1.5px solid hsl(228, 30%, 85%)",
              borderLeft: `4px solid ${typeColors[insight.type]}`,
            }}
          >
            <div className="flex items-start justify-between mb-1.5">
              <h4 className="text-xs font-bold text-foreground leading-tight">{insight.title}</h4>
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{insight.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Human-in-the-Loop */}
      <div className="p-4" style={{ borderTop: "2px solid hsl(228, 30%, 85%)" }}>
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="w-3.5 h-3.5" style={{ color: "hsl(228, 62%, 18%)" }} />
          <p className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: "hsl(228, 30%, 55%)" }}>
            Human-in-the-Loop
          </p>
        </div>
        <p className="text-[11px] text-muted-foreground mb-4">
          The AI provides recommendations. The final decision rests with the Academic Policy Office.
        </p>
        <button
          className="w-full py-2.5 rounded-xl text-xs font-bold text-white transition-all hover:shadow-lg"
          style={{ background: "linear-gradient(135deg, hsl(228, 62%, 18%), hsl(228, 55%, 28%))" }}
        >
          Confirm AI Suggestion
        </button>
        <button className="w-full py-2 rounded-xl text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors mt-2 border border-transparent hover:border-border">
          Override & Adjust Manually
        </button>
      </div>
    </motion.aside>
  );
}
