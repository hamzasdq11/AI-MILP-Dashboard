// Real data from the MILP solver output

export interface CourseData {
  name: string;
  capacity: number;
  bidders: number;
  enrolled: number;
  fillPercent: number;
  status: "active" | "cancelled";
  reason?: string;
}

export interface KPIData {
  label: string;
  value: string;
  subLabel: string;
  trend?: "up" | "down" | "neutral";
}

export interface StudentStat {
  label: string;
  count: number;
  percent: number;
}

export const kpis: KPIData[] = [
  { label: "Bid Satisfaction", value: "96.74%", subLabel: "354,821 / 366,773 pts", trend: "up" },
  { label: "Students Allocated", value: "373", subLabel: "100% coverage", trend: "up" },
  { label: "Active Courses", value: "30/39", subLabel: "9 cancelled by solver", trend: "neutral" },
  { label: "Solve Time", value: "13.2s", subLabel: "HiGHS Branch-and-Cut", trend: "up" },
  { label: "Forced Assignments", value: "5", subLabel: "Max allowed: 5", trend: "neutral" },
  { label: "Decision Variables", value: "14,959", subLabel: "Binary (0/1)", trend: "neutral" },
];

export const studentStats: StudentStat[] = [
  { label: "Got exact top-6", count: 223, percent: 59.8 },
  { label: "Got 5 of top-6", count: 121, percent: 32.4 },
  { label: "Got 4 of top-6", count: 23, percent: 6.2 },
  { label: "Forced assignment", count: 5, percent: 1.3 },
  { label: "Zero bids submitted", count: 1, percent: 0.3 },
];

export const activeCourses: CourseData[] = [
  { name: "Corporate Strategy", capacity: 140, bidders: 251, enrolled: 140, fillPercent: 100, status: "active" },
  { name: "Product & Brand Mgmt", capacity: 140, bidders: 175, enrolled: 140, fillPercent: 100, status: "active" },
  { name: "Sales & Distribution Mgmt", capacity: 140, bidders: 203, enrolled: 140, fillPercent: 100, status: "active" },
  { name: "Integrated Marketing Comm.", capacity: 140, bidders: 191, enrolled: 139, fillPercent: 99.3, status: "active" },
  { name: "Data Warehousing & Viz", capacity: 140, bidders: 158, enrolled: 111, fillPercent: 79.3, status: "active" },
  { name: "Fixed Income Securities", capacity: 140, bidders: 114, enrolled: 105, fillPercent: 75.0, status: "active" },
  { name: "Design Thinking & Innovation", capacity: 140, bidders: 170, enrolled: 100, fillPercent: 71.4, status: "active" },
  { name: "Competitive & Coop. Strategy", capacity: 140, bidders: 172, enrolled: 100, fillPercent: 71.4, status: "active" },
  { name: "Derivatives", capacity: 140, bidders: 114, enrolled: 99, fillPercent: 70.7, status: "active" },
  { name: "Digital Transformation", capacity: 140, bidders: 126, enrolled: 88, fillPercent: 62.9, status: "active" },
  { name: "Project Management", capacity: 140, bidders: 130, enrolled: 76, fillPercent: 54.3, status: "active" },
  { name: "Supply Chain Management", capacity: 140, bidders: 120, enrolled: 71, fillPercent: 50.7, status: "active" },
  { name: "Org Development & Change", capacity: 140, bidders: 79, enrolled: 71, fillPercent: 50.7, status: "active" },
  { name: "Experiential Marketing", capacity: 70, bidders: 164, enrolled: 70, fillPercent: 100, status: "active" },
  { name: "Data Mining & Predictive", capacity: 70, bidders: 95, enrolled: 70, fillPercent: 100, status: "active" },
  { name: "Adv. Positive Psychology", capacity: 140, bidders: 98, enrolled: 69, fillPercent: 49.3, status: "active" },
  { name: "Consumer Behaviour", capacity: 140, bidders: 114, enrolled: 57, fillPercent: 40.7, status: "active" },
  { name: "Reigniting Employee Eng.", capacity: 140, bidders: 71, enrolled: 56, fillPercent: 40.0, status: "active" },
  { name: "Competency Management", capacity: 140, bidders: 62, enrolled: 55, fillPercent: 39.3, status: "active" },
  { name: "Pricing Analytics", capacity: 140, bidders: 80, enrolled: 54, fillPercent: 38.6, status: "active" },
  { name: "Talent Measurement", capacity: 70, bidders: 67, enrolled: 53, fillPercent: 75.7, status: "active" },
  { name: "Investment Management", capacity: 140, bidders: 63, enrolled: 51, fillPercent: 36.4, status: "active" },
  { name: "Pricing", capacity: 140, bidders: 108, enrolled: 43, fillPercent: 30.7, status: "active" },
  { name: "Negotiation & Conflict Mgmt", capacity: 140, bidders: 51, enrolled: 40, fillPercent: 28.6, status: "active" },
  { name: "International Marketing", capacity: 140, bidders: 89, enrolled: 40, fillPercent: 28.6, status: "active" },
  { name: "IT Product Management", capacity: 140, bidders: 49, enrolled: 40, fillPercent: 28.6, status: "active" },
  { name: "AI & Deep Learning", capacity: 70, bidders: 38, enrolled: 40, fillPercent: 57.1, status: "active" },
  { name: "Business Valuation", capacity: 70, bidders: 48, enrolled: 40, fillPercent: 57.1, status: "active" },
  { name: "Business Model & Strategy", capacity: 140, bidders: 105, enrolled: 40, fillPercent: 28.6, status: "active" },
  { name: "Technology & Future of Work", capacity: 70, bidders: 52, enrolled: 40, fillPercent: 57.1, status: "active" },
];

export const cancelledCourses: CourseData[] = [
  { name: "Forecasting & Decision Analysis", capacity: 140, bidders: 2, enrolled: 0, fillPercent: 0, status: "cancelled", reason: "Insufficient demand (<40)" },
  { name: "Game Theory & Strategic Behaviour", capacity: 140, bidders: 5, enrolled: 0, fillPercent: 0, status: "cancelled", reason: "Insufficient demand (<40)" },
  { name: "Public Service Marketing", capacity: 140, bidders: 43, enrolled: 0, fillPercent: 0, status: "cancelled", reason: "Solver optimised higher total by redistribution" },
  { name: "Data Analytics & ML Techniques", capacity: 140, bidders: 23, enrolled: 0, fillPercent: 0, status: "cancelled", reason: "Insufficient demand (<40)" },
  { name: "Sustainability in Value Chains", capacity: 140, bidders: 2, enrolled: 0, fillPercent: 0, status: "cancelled", reason: "Insufficient demand (<40)" },
  { name: "Lean Six Sigma Analytics", capacity: 140, bidders: 34, enrolled: 0, fillPercent: 0, status: "cancelled", reason: "Insufficient demand (<40)" },
  { name: "Managing Projects", capacity: 140, bidders: 11, enrolled: 0, fillPercent: 0, status: "cancelled", reason: "Insufficient demand (<40)" },
  { name: "India and World Economy", capacity: 140, bidders: 13, enrolled: 0, fillPercent: 0, status: "cancelled", reason: "Insufficient demand (<40)" },
  { name: "Risk & Resilience in Logistics", capacity: 140, bidders: 21, enrolled: 0, fillPercent: 0, status: "cancelled", reason: "Insufficient demand (<40)" },
];

export const modelMetrics = {
  solver: "HiGHS (Branch-and-Cut)",
  library: "SciPy 1.x MILP",
  language: "Python 3.11",
  totalVariables: 14959,
  assignmentVars: 14547,
  activationVars: 39,
  fairnessVars: 373,
  totalConstraints: 11488,
  optimality: "Global (MIP gap 0.065%)",
  solveTime: 13.2,
  satisfactionAchieved: 354821,
  satisfactionTheoretical: 366773,
  satisfactionRatio: 96.74,
};

export const constraintBreakdown = [
  { name: "C1: Course Load", count: 373, desc: "Exactly 6 courses per student" },
  { name: "C2: Capacity Ceiling", count: 39, desc: "Enrollment ≤ seat capacity" },
  { name: "C3: Min Enrollment", count: 39, desc: "≥40 students if course runs" },
  { name: "C4: Fairness Tracking", count: 11036, desc: "Zero-bid pair monitoring" },
  { name: "C5: Fairness Cap", count: 1, desc: "≤5 forced assignments" },
];

// Data for the enrollment distribution chart
export const enrollmentDistribution = activeCourses.map(c => ({
  name: c.name.length > 18 ? c.name.slice(0, 18) + "…" : c.name,
  enrolled: c.enrolled,
  capacity: c.capacity,
  remaining: c.capacity - c.enrolled,
}));

// Demand vs enrollment scatter data
export const demandVsEnrollment = activeCourses.map(c => ({
  name: c.name,
  demand: c.bidders,
  enrolled: c.enrolled,
  capacity: c.capacity,
}));
