import {
  FileText,
  CreditCard,
  Bed,
  Pill,
  Eye,
  Lock,
  Stethoscope,
  UserCog,
  Users,
  LayoutDashboard,
  BarChart3,
  Settings,
  ClipboardList,
  CalendarCheck,
  Shield,
  ShieldCheck,
  Server,
  KeyRound,
  Fingerprint,
  Clock,
  TrendingUp,
  Zap,
  Heart,
  DollarSign,
  AlertTriangle,
  CheckCircle2,
  Building2,
  type LucideIcon,
} from "lucide-react";

// ─── NAVIGATION ────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#workflow" },
  { label: "Security", href: "#security" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
] as const;

// ─── HERO STATS ────────────────────────────────────────────────────────────
export const HERO_STATS = [
  { value: 500, suffix: "+", label: "Hospitals Onboarded" },
  { value: 2, suffix: "M+", label: "Patients Managed" },
  { value: 99.9, suffix: "%", label: "Uptime Guaranteed" },
  { value: 72, suffix: "hrs", label: "Average Go-Live" },
] as const;

// ─── TRUST LOGOS ───────────────────────────────────────────────────────────
export const TRUST_LOGOS = [
  "Apollo Hospitals",
  "Fortis Healthcare",
  "Max Healthcare",
  "Manipal Hospitals",
  "Narayana Health",
  "Medanta",
  "AIIMS Partner",
  "Columbia Asia",
] as const;

export const COMPLIANCE_BADGES = [
  { name: "HIPAA Compliant", icon: ShieldCheck },
  { name: "ISO 27001", icon: Shield },
  { name: "SOC 2 Type II", icon: Lock },
  { name: "GDPR Ready", icon: Fingerprint },
] as const;

// ─── PROBLEMS ──────────────────────────────────────────────────────────────
export interface Problem {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const PROBLEMS: Problem[] = [
  {
    icon: FileText,
    title: "Patient Records Lost Between Departments",
    description:
      "Paper-based OPD notes never reach the IPD ward. Doctors repeat the same questions on every admission, wasting time and creating clinical risk.",
  },
  {
    icon: CreditCard,
    title: "Revenue Leakage from Billing Errors",
    description:
      "Without integrated billing, procedures and medicines aren't always invoiced. Every missed charge is lost revenue that compounds daily.",
  },
  {
    icon: Bed,
    title: "No Real-Time Bed Availability View",
    description:
      "Staff call across departments to find available beds. Without a central dashboard, admission delays happen every single day.",
  },
  {
    icon: Pill,
    title: "Pharmacy Running on Paper Registers",
    description:
      "Handwritten records, missed expiry dates, and zero low-stock alerts lead to shortages exactly when medicines are critical.",
  },
  {
    icon: Eye,
    title: "Zero Audit Trail for Accountability",
    description:
      "When errors occur, there's no record of who did what or when. Internal accountability becomes impossible without a system of record.",
  },
  {
    icon: Lock,
    title: "No Role-Based Staff Access Control",
    description:
      "Everyone sees everything — patient data, billing, pharmacy. No separation means privacy violations and compliance risk.",
  },
];

// ─── FEATURE MODULES ───────────────────────────────────────────────────────
export interface FeatureModule {
  icon: LucideIcon;
  name: string;
  description: string;
  highlights: string[];
}

export const FEATURE_MODULES: FeatureModule[] = [
  {
    icon: Stethoscope,
    name: "OPD Management",
    description: "Streamline outpatient workflows from appointment to prescription.",
    highlights: ["Smart Scheduling", "Live Queue", "E-Prescriptions", "Auto Follow-ups"],
  },
  {
    icon: Bed,
    name: "IPD Management",
    description: "Complete inpatient care from admission through discharge.",
    highlights: ["Bed Assignment", "Ward Dashboard", "Daily Notes", "Discharge Summary"],
  },
  {
    icon: Pill,
    name: "Pharmacy Management",
    description: "End-to-end pharmacy operations with intelligent inventory control.",
    highlights: ["Stock Tracking", "Expiry Alerts", "Batch Management", "POS Billing"],
  },
  {
    icon: CreditCard,
    name: "Billing & Payments",
    description: "Unified billing that captures every charge automatically.",
    highlights: ["Multi-line Bills", "Partial Payments", "Insurance Claims", "Revenue Reports"],
  },
  {
    icon: UserCog,
    name: "Doctor Portal",
    description: "Dedicated dashboards for physicians with clinical tools.",
    highlights: ["Patient History", "Lab Integration", "Digital Notes", "Schedule Management"],
  },
  {
    icon: Users,
    name: "Patient Management",
    description: "Complete patient lifecycle from registration to follow-up.",
    highlights: ["Quick Registration", "Smart Search", "Visit History", "Document Upload"],
  },
  {
    icon: ClipboardList,
    name: "Reception & Front Desk",
    description: "Efficient front desk operations that reduce patient wait times.",
    highlights: ["Walk-in Queue", "Appointment Booking", "Token System", "Patient Check-in"],
  },
  {
    icon: BarChart3,
    name: "Reports & Analytics",
    description: "Data-driven insights for informed hospital management decisions.",
    highlights: ["Revenue Analytics", "Occupancy Trends", "Department KPIs", "Custom Reports"],
  },
  {
    icon: Settings,
    name: "Hospital Settings",
    description: "Centralized configuration for your entire hospital setup.",
    highlights: ["Multi-branch", "Fee Categories", "Template Builder", "User Management"],
  },
];

// ─── ROLE-BASED FEATURES ───────────────────────────────────────────────────
export interface Role {
  key: string;
  label: string;
  icon: LucideIcon;
  title: string;
  badge: string;
  description: string;
  features: string[];
}

export const ROLES: Role[] = [
  {
    key: "admin",
    label: "Hospital Admin",
    icon: LayoutDashboard,
    title: "Hospital Administrator",
    badge: "Full Access",
    description:
      "Complete visibility and control over every department, staff member, and financial metric in your hospital.",
    features: [
      "Real-time operational dashboard",
      "Full patient records management",
      "Staff accounts and permissions",
      "Complete billing oversight",
      "Ward and bed management",
      "7 comprehensive report types",
      "System-wide audit trail",
      "Hospital configuration",
    ],
  },
  {
    key: "doctor",
    label: "Doctor",
    icon: Stethoscope,
    title: "Physician",
    badge: "Clinical Access",
    description:
      "A private dashboard showing only your patients and appointments. Zero access to other doctors' data.",
    features: [
      "Today's appointment queue",
      "Patient medical history",
      "Digital diagnosis and notes",
      "E-prescription with dosage",
      "Lab test recommendations",
      "IPD patient management",
      "Treatment progress tracking",
      "Discharge summary writing",
    ],
  },
  {
    key: "receptionist",
    label: "Receptionist",
    icon: CalendarCheck,
    title: "Front Desk Staff",
    badge: "Front Desk Access",
    description:
      "Handles registration, scheduling, queue management, and patient-facing operations efficiently.",
    features: [
      "New patient registration",
      "Appointment scheduling",
      "Live OPD queue management",
      "Patient search and lookup",
      "IPD admission workflow",
      "Payment collection",
      "Bed availability check",
      "Daily activity summary",
    ],
  },
  {
    key: "pharmacist",
    label: "Pharmacist",
    icon: Pill,
    title: "Pharmacy Staff",
    badge: "Pharmacy Access",
    description:
      "Dedicated pharmacy dashboard for medicine management from purchase entry to dispensing.",
    features: [
      "Medicine database management",
      "Purchase entry with batch data",
      "Real-time stock levels",
      "30/60/90 day expiry alerts",
      "POS billing counter",
      "Prescription dispensing",
      "Supplier management",
      "Pharmacy-specific reports",
    ],
  },
];

// ─── WORKFLOW STEPS ────────────────────────────────────────────────────────
export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  details: string[];
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: 1,
    title: "Setup & Configure",
    description:
      "We configure AxonX Medtech for your hospital's specific departments, fee structures, and workflows. No generic templates.",
    icon: Settings,
    details: [
      "Department mapping",
      "Fee configuration",
      "Template customization",
      "Branding setup",
    ],
  },
  {
    step: 2,
    title: "Onboard Your Team",
    description:
      "Each staff member gets role-specific training. Doctors, receptionists, pharmacists — everyone learns their dashboard.",
    icon: Users,
    details: [
      "Role-based training",
      "Video walkthroughs",
      "Practice environment",
      "24/7 support access",
    ],
  },
  {
    step: 3,
    title: "Go Live in 72 Hours",
    description:
      "From signed agreement to fully operational system in just 72 hours. We handle the heavy lifting so you don't have to.",
    icon: Zap,
    details: [
      "Data migration",
      "Parallel run period",
      "Go-live support",
      "Post-launch monitoring",
    ],
  },
];

// ─── SECURITY FEATURES ─────────────────────────────────────────────────────
export interface SecurityFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const SECURITY_FEATURES: SecurityFeature[] = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description: "AES-256 encryption for data at rest and TLS 1.3 for data in transit.",
  },
  {
    icon: KeyRound,
    title: "Role-Based Access Control",
    description: "Granular permissions ensure staff only see what they need.",
  },
  {
    icon: Fingerprint,
    title: "Multi-Factor Authentication",
    description: "Optional MFA for admin and clinical accounts adds an extra security layer.",
  },
  {
    icon: Eye,
    title: "Complete Audit Trail",
    description: "Every action logged with timestamp, user, and IP address for full accountability.",
  },
  {
    icon: Server,
    title: "SOC 2 Infrastructure",
    description: "Hosted on SOC 2 compliant cloud infrastructure with 99.9% uptime SLA.",
  },
  {
    icon: Shield,
    title: "HIPAA Compliance",
    description: "Built from the ground up to meet HIPAA privacy and security requirements.",
  },
];

// ─── BENEFITS ──────────────────────────────────────────────────────────────
export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
  metric: string;
}

export const BENEFITS: Benefit[] = [
  {
    icon: Clock,
    title: "Save 4+ Hours Daily",
    description: "Eliminate manual data entry, paper filing, and phone-based coordination between departments.",
    metric: "4hrs/day",
  },
  {
    icon: DollarSign,
    title: "Recover 15% Revenue",
    description: "Integrated billing captures every procedure, medicine, and consultation fee automatically.",
    metric: "15%",
  },
  {
    icon: AlertTriangle,
    title: "Reduce Errors by 90%",
    description: "Digital prescriptions, automated stock tracking, and structured forms eliminate manual mistakes.",
    metric: "90%",
  },
  {
    icon: TrendingUp,
    title: "3x Faster Operations",
    description: "From patient registration to discharge, every workflow is optimized for speed and accuracy.",
    metric: "3x",
  },
  {
    icon: Heart,
    title: "Better Patient Experience",
    description: "Shorter wait times, accurate billing, no repeat questions, and digital records patients can access.",
    metric: "4.8★",
  },
  {
    icon: CheckCircle2,
    title: "100% Compliance Ready",
    description: "Built-in audit trails, access controls, and encryption ensure you meet every regulatory requirement.",
    metric: "100%",
  },
];

// ─── TESTIMONIALS ──────────────────────────────────────────────────────────
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization: string;
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "AxonX Medtech transformed how we operate. Our billing errors dropped to near-zero, and doctors actually enjoy using the system. The 72-hour go-live wasn't just marketing — they delivered.",
    author: "Dr. Rajesh Sharma",
    role: "Medical Director",
    organization: "Sunrise Multi-Specialty Hospital",
    rating: 5,
  },
  {
    quote:
      "We evaluated 12 HMS solutions before choosing AxonX Medtech. The role-based access control was the deciding factor. Our pharmacy team, receptionists, and doctors each get exactly what they need — nothing more.",
    author: "Priya Mehta",
    role: "Hospital Administrator",
    organization: "CarePlus Medical Center",
    rating: 5,
  },
  {
    quote:
      "The real-time bed management alone saved us 2 hours of phone calls every day. Add the integrated pharmacy module and automated billing, and we recovered our investment in the first month.",
    author: "Dr. Anil Kapoor",
    role: "Chief Operating Officer",
    organization: "LifeLine Hospital Group",
    rating: 5,
  },
];

// ─── FAQ ───────────────────────────────────────────────────────────────────
export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Is each hospital's data completely private and isolated?",
    answer:
      "Yes. AxonX Medtech uses multi-tenant architecture with complete data isolation. Each hospital's patient records, billing, staff information, and configurations are entirely separate. Privacy is enforced at the database level — not just the application layer.",
  },
  {
    question: "Can I restrict what each staff member can see and do?",
    answer:
      "Absolutely. AxonX Medtech uses strict role-based access control (RBAC). A Receptionist cannot view billing reports. A Doctor cannot access pharmacy stock. Each role has a dedicated dashboard with only the relevant features. Custom roles can also be configured.",
  },
  {
    question: "Does AxonX Medtech work on tablets and mobile devices?",
    answer:
      "AxonX Medtech is a web-based platform that runs in any modern browser — Chrome, Edge, Firefox, Safari. It's fully responsive and optimized for desktops, laptops, and tablets. No app installation is needed at your hospital.",
  },
  {
    question: "Is the pharmacy module included in the standard package?",
    answer:
      "Yes. Complete pharmacy management — medicine database, stock tracking, purchase entry with batch and expiry data, low-stock alerts, POS billing counter, supplier management, and prescription dispensing — is included in every AxonX Medtech plan.",
  },
  {
    question: "How quickly can we go live?",
    answer:
      "Most hospitals go live within 72 hours of signing up. This includes department configuration, staff account creation, role-based training, and initial data setup. We provide dedicated onboarding support to ensure a smooth transition.",
  },
  {
    question: "What kind of reports can the admin generate?",
    answer:
      "Hospital administrators can generate 7 comprehensive report types: Revenue Report, OPD Report, IPD Report, Pharmacy Sales Report, Outstanding Payments Report, Stock Report, and Expiry Report. All reports support date range filtering, export to PDF/Excel, and scheduled delivery.",
  },
  {
    question: "Is patient data secure and compliant?",
    answer:
      "Security is foundational, not an add-on. AxonX Medtech uses AES-256 encryption, TLS 1.3, JWT authentication with automatic session expiry, BCrypt password hashing, role-based access enforcement, complete audit logging, and multi-tenant data isolation. We are HIPAA compliant and ISO 27001 certified.",
  },
  {
    question: "Do I need to install any software or maintain servers?",
    answer:
      "No. AxonX Medtech is entirely cloud-based. Your staff accesses it through a web browser. No installation, no servers to maintain, no IT infrastructure required at your hospital. We handle all updates, backups, and security patches automatically.",
  },
];

// ─── FOOTER ────────────────────────────────────────────────────────────────
export const FOOTER_LINKS = {
  product: [
    { label: "OPD Management", href: "#features" },
    { label: "IPD Management", href: "#features" },
    { label: "Pharmacy", href: "#features" },
    { label: "Billing & Payments", href: "#features" },
    { label: "Reports & Analytics", href: "#features" },
    { label: "Doctor Portal", href: "#features" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Contact", href: "#cta" },
    { label: "Partners", href: "#" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "System Status", href: "#" },
    { label: "Release Notes", href: "#" },
    { label: "Help Center", href: "#" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "HIPAA Compliance", href: "#" },
    { label: "Data Processing Agreement", href: "#" },
  ],
} as const;

// ─── TICKER ITEMS ──────────────────────────────────────────────────────────
export const TICKER_ITEMS = [
  "OPD Management",
  "IPD Management",
  "Pharmacy",
  "Billing & Payments",
  "Doctor Portal",
  "Patient Records",
  "Live Dashboard",
  "Audit Trail",
  "Role-Based Access",
  "Multi-Tenant Security",
  "Reports & Analytics",
  "Ward Management",
] as const;
