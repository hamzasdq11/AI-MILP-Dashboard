import { motion } from "framer-motion";
import { Brain, ChevronRight } from "lucide-react";

const insights = [
  {
    title: "Optimal Allocation Achieved",
    text: "The system achieved 96.7% bid satisfaction — meaning students collectively received courses worth 354,821 of a possible 366,773 bid points. No other valid allocation exists that can exceed this.",
  },
  {
    title: "Capacity Utilisation",
    text: "3 courses hit full capacity (Corporate Strategy, Product & Brand Mgmt, Sales & Distribution). 7 courses at minimum viable enrollment (40 students).",
  },
  {
    title: "Fairness Analysis",
    text: "92.2% of students got their top-6 or 5 of top-6 preferences. Only 5 students (1.3%) required forced assignment — the hard minimum under institutional constraints.",
  },
  {
    title: "Solver Decision: PSM Cancelled",
    text: "Public Service Marketing (43 bidders) was cancelled by the solver. Redistributing those students to their alternate preferences increased total satisfaction — a counter-intuitive outcome only discoverable through MILP.",
  },
  {
    title: "APO Recommendation",
    text: "Contact Student S144 directly — they submitted zero bids and required full forced allocation. For future terms, mandate minimum 8–10 bids per student.",
  },
];

export default function AIAssistantPanel() {
  return (
    <motion.aside
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
      className="w-[320px] min-w-[320px] h-screen border-l border-border overflow-y-auto bg-card"
    >
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "hsl(var(--primary) / 0.1)" }}>
            <Brain className="w-3.5 h-3.5 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-foreground">AI Executive Summary</h2>
            <p className="text-[10px] text-muted-foreground">Natural language analysis</p>
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
            className="p-3 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer group bg-background"
          >
            <div className="flex items-start justify-between mb-1">
              <h4 className="text-xs font-semibold text-foreground">{insight.title}</h4>
              <ChevronRight className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-[11px] text-muted-foreground leading-relaxed">{insight.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Human-in-the-Loop */}
      <div className="p-4 border-t border-border">
        <p className="section-title">Human-in-the-Loop</p>
        <p className="text-[11px] text-muted-foreground mb-3">
          The AI provides recommendations. The final decision rests with the Academic Policy Office.
        </p>
        <button className="w-full py-2.5 rounded-lg text-xs font-semibold border-2 transition-colors border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          Confirm AI Suggestion
        </button>
        <button className="w-full py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground transition-colors mt-2">
          Override & Adjust Manually
        </button>
      </div>
    </motion.aside>
  );
}
