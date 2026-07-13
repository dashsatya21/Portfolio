import { useCallback, useEffect, useRef, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS & DATA
// ─────────────────────────────────────────────────────────────────────────────

const TYPEWRITER_WORDS = [
  "Developer", "Enthusiast", "Problem Solver", "Gamer", "Learner","Innovator", "Debugger", "Team Player", "Communicator", "Specialist","Coder","Builder","Architect","Tester","Designer",
  "Investigator","Analyst","Mentor","Learner","Negotiator","Strategist","Planner","Collaborator"
  ];

const NAV_ITEMS = ["About", "Skills", "Experience", "Projects", "Education"];

const BG_IMAGE = "/Portfolio/bg.jpeg";
const ACCENT   = "#5ecfff";
const ACCENT2  = "#9195F6";
const GLOW_RGB = "94,207,255";

const PROFILE = {
  name:     "Satyabrata Dash",
  role:     "Support Operations Specialist @ Amazon → Backend Engineer",
  stack:    "Java · Spring Boot · SQL · REST APIs",
  location: "Bengaluru, India",
  email:    "satyabrata211297@gmail.com",
  phone:    "+91 7008651986",
  linkedin: "https://www.linkedin.com/in/satyabrata2112",
  github:   "https://github.com/dashsatya21",
  summary:
    "I'm a backend developer with 3+ years of operations experience at Amazon and BYJU'S, where I learned to diagnose failures under pressure through root-cause analysis, SOP design, and systems that had to hold up at scale. I've applied that same discipline to backend development - building four full-stack Java and Spring Boot applications with PostgreSQL, Docker, and strong test coverage. <br /><br />I bring the same structured, root-cause mindset to both domains - equally suited to owning complex operations work (case investigation, escalation management, process design) or shipping backend features. Whether your team needs operational rigor or engineering execution, I'd welcome the conversation.",
  skills: [
    { cat: "Language",       val: "Core Java, OOPs, Collections, Data Structures & Algorithms (DSA), Servlets, JSP" },
    { cat: "Frameworks",     val: "Spring Boot (Microservices), Spring (IOC & MVC), Hibernate (ORM)" },
    { cat: "APIs & Testing", val: "RESTful APIs, JSON, JUnit 5, Postman, OpenAPI 3 (Swagger)" },
    { cat: "Database",       val: "PostgreSQL, SQL (CRUD, Joins, Indexing), JDBC" },
    { cat: "Tools & AI",     val: "Maven, GitHub, Eclipse IDE, Copilot, Claude" },
    { cat: "Concepts",       val: "Caching, Debugging, Log Analysis, Query Optimisation, SDLC, Agile" },
    { cat: "Additional",     val: "IBM Planning Analytics, Amazon Web Services (AWS), Excel, PowerBI" },
  ],
  experience: [
    {
      role: "Support Operations Specialist",
      company: "Amazon",
      period: "02/2025 – 08/2026",
      loc: "Bengaluru, India",
      bullets: [
        "Resolved 30+ complex FBA inventory, reimbursement, policy-related and operational cases for sellers daily with 100% accuracy while ensuring compliance with Amazon operational standards and seller policies.",
        "Performed investigations for lost, damaged, and reimbursement-related cases while maintaining SLA adherence and exceeding team KPIs to ensure the highest Seller Experience.",
        "Created SOPs and optimised workflows for defect prevention and reconciliation, and case investigations, reducing new associate onboarding time by ~45% and improving team efficiency by ~48%.",
        "Mentored and trained 40+ new associates on operational processes, investigation standards, SOP adherence, and internal tools, enabling faster ramp-up and consistent quality and compliant delivery.",
        "Recognised as a top-performing Ops Associate for 6 months by exceeding SLA targets with accurate, high-volume case resolution.",
        "Conducted detailed root-cause analysis on recurring operational and seller-impacting issues and delivered data-driven recommendations that reduced repeat cases by ~28%, minimising financial and compliance risks.",
        "Collaborated with cross-functional stakeholders to escalate systemic operational risks, improve seller compliance processes, and enhance overall FBA process improvements.",
      ],
    },
    {
      role: "Student Success Specialist",
      company: "BYJU'S",
      period: "09/2022 – 04/2024",
      loc: "Bengaluru, India",
      bullets: [
        "Managed a team of 10 mentors to deliver high-quality customer service while consistently meeting KPIs and SLAs.",
        "Led onboarding and training of new associates, improving integration, ramp-up speed, and overall team performance through structured mentoring and guidance.",
        "Created weekly rosters, maintained operational trackers, prepared performance reports for workforce and management planning.",
        "Monitored, analyzed, and reported daily escalations and performance trends to management, providing actionable insights for process improvement and service enhancement.",
        "Conducted high-volume outbound engagement calls (4+ hours talk time and 45+ connected calls daily), improving customer engagement and increasing conversion rates from 9% to 33% within 2 months.",
        "Handled inbound customer queries, troubleshooting issues related to tablets and e-readers, and managed escalations by coordinating with internal and external stakeholders for timely resolution.",
        "Ensured smooth operational support by maintaining service quality standards, resolving customer concerns efficiently, and supporting day-to-day coordination activities in a fast-paced environment.",
      ],
    },
    {
      role: "Regional Reservations Associate",
      company: "TAJ Group of Hotels (IHCL)",
      period: "06/2022 – 09/2022",
      loc: "Chennai, India",
      bullets: [
        "Managed end-to-end reservations for 5 Taj hotels across multiple channels - telephone, mail, fax, OTA, and central reservation systems - maintaining accurate records and ensuring seamless communication of updates, cancellations, and modifications to the front desk.",
        "Drove revenue optimization by determining strategic room rates and contributing to occupancy forecasts, leveraging in-depth knowledge of room categories, package plans, selling status, and credit policies.",
        "Delivered exceptional guest experience by responding promptly to inquiries, preparing confirmation letters, and arranging client travel programs, while researching seasonal trends to target new clientele and maintaining a courteous, professional rapport with guests, managers, and fellow employees.",
      ],
    },
  ],
  projects: [
    {
      name: "Weather App",
      link: "https://weather-deam.onrender.com/",
      tech: "Spring Boot 3.2 · PostgreSQL · OpenWeatherMap API · Docker · Caffeine Cache",
      pts: [
        "Architected the service layer using Template Method and Facade patterns, cutting duplicate code by ~60%; reduced external API calls by ~90% via Caffeine cache with city-level key granularity.",
        "Wrote JUnit 5 + Mockito tests covering model validation, service error contracts (404/500 wrapping), and HTTP-layer behaviour with @WebMvcTest + MockMvc — each layer tested without a live DB or server.",
        "Deployed to Render via multi-stage Docker (70% smaller image); designed search_history schema with JPA indexes and a custom JPQL aggregate query for session-scoped history and trending-cities feature.",
      ],
    },
    {
      name: "Inventory Management System",
      link: "https://inventory-management-td2z.onrender.com/",
      tech: "Java · Spring Boot · PostgreSQL · Hibernate · Thymeleaf",
      pts: [
        "Built a full-stack Inventory Management System with a clean layered architecture — DAO abstraction, dual REST/UI controllers, and a centralised Facade mapper for entity-DTO conversion and error-response building.",
        "Engineered secure paginated search with JPQL case-insensitive SKU/name matching, sort-field whitelisting, and full encapsulation of Spring's Page/Pageable behind a clean PagedResponseDto contract.",
        "Built an exception hierarchy mapped to precise HTTP codes; deployed via multi-stage Docker on Render with dynamic PORT injection.",
      ],
    },
    {
      name: "Co Work Space",
      link: "https://github.com/dashsatya21/co_work_space",
      tech: "Java · Spring Boot · PostgreSQL · Hibernate · Swagger",
      pts: [
        "Designed a Co-Working Space management REST API using Spring Boot 3.1.4 and Java 17 with a layered architecture (Controller → Service → DAO → Repository), backed by PostgreSQL and Hibernate ORM for end-to-end workspace lifecycle management.",
        "Architected a 5-tier cascaded domain model (CoWorkSpace → Building → Floor → WorkSpace → Room) with parent-scoped CRUD endpoints, enum-based room classification, and unique-constrained user management.",
        "Enforced consistent and predictable API behavior through a generic typed response wrapper, centralized global exception handling with domain-specific custom exceptions, and Swagger UI documentation — improving debuggability and API consumer experience.",
      ],
    },
    {
      name: "Book Store",
      link: "https://book-store-7gsj.onrender.com/",
      tech: "Java · Spring Boot · PostgreSQL · Bootstrap · Docker",
      pts: [
        "Built a production-ready full-stack bookstore with paginated product listing, search, and CRUD operations; containerised using multi-stage Docker builds with environment-driven config for cloud portability.",
        "Designed a clean 4-layer Java backend (Controller → Service → DAO → Repository) with custom exception handling, DTO pattern, and Thymeleaf-driven views handling book creation, updates, deletions, and file uploads.",
        "Optimised data retrieval by integrating Spring Data JPA with PostgreSQL, implementing runtime sorting and pagination to reduce manual SQL and handle large inventories efficiently at scale.",
      ],
    },
  ],
  education: [
    { deg: "M.Sc. Hospitality Administration (Sales & Marketing)", inst: "IHM Bangalore (IGNOU)",             period: "Jul 2020 – Aug 2022", score: "74.00%" },
    { deg: "B.Sc. Hospitality and Hotel Administration",           inst: "IHM Mumbai (IGNOU)",               period: "Jun 2016 – Jun 2020", score: "62.36%" },
    { deg: "Class XII",                                             inst: "Sri Aurobindo's Rourkela School",  period: "Apr 2015 – Apr 2016", score: "84.60%" },
    { deg: "Class X",                                               inst: "Sri Aurobindo's Rourkela School",  period: "Apr 2013 – Apr 2014", score: "88.83%" },
  ],
  cert: "Java Backend Development Certification · JSpiders | 05/2024 – 12/2024 | Core Java, Collections, JDBC, Hibernate, Spring Boot, REST APIs, SQL",
};

const NON_TECH_SKILLS = [
  { category: "Operations & Case Management",  color: ACCENT, glow: `rgba(${GLOW_RGB},0.18)`, skills: ["End-to-End Issue Resolution", "SLA Adherence", "Inventory Audits"] },
  { category: "Quality & Compliance",          color: ACCENT, glow: `rgba(${GLOW_RGB},0.18)`, skills: ["Process Audits", "Quality Assurance (QA)", "SOP Implementation"] },
  { category: "Data Visualisation & Reporting",color: ACCENT, glow: `rgba(${GLOW_RGB},0.18)`, skills: ["Data Visualisation", "Dashboard Interpretation", "Analytical Reporting", "Insight Communication"] },
  { category: "Analysis & Communication",      color: ACCENT, glow: `rgba(${GLOW_RGB},0.18)`, skills: ["Root Cause Analysis (RCA)", "Stakeholder Collaboration", "Customer Obsession"] },
  { category: "Core Professional Skills",      color: ACCENT, glow: `rgba(${GLOW_RGB},0.18)`, skills: ["Analytical Thinking", "Problem Solving", "Business Communication", "Attention to Detail"] },
];

// ─────────────────────────────────────────────────────────────────────────────
// SHARED STYLES  (avoids inline-object duplication across cards)
// ─────────────────────────────────────────────────────────────────────────────

const glassCard = (hov = false, extra = {}) => ({
  background:       hov ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)",
  border:           `1px solid ${hov ? `rgba(${GLOW_RGB},0.35)` : "rgba(255,255,255,0.1)"}`,
  borderRadius:     14,
  backdropFilter:   "blur(8px)",
  position:         "relative",
  overflow:         "hidden",
  transition:       "all 0.28s ease",
  boxShadow:        hov ? `0 0 28px rgba(${GLOW_RGB},0.18)` : "none",
  ...extra,
});

const accentLine = (hov = false) => ({
  position:     "absolute",
  top: 0, left: 0, right: 0,
  height:       3,
  background:   `linear-gradient(90deg, ${ACCENT}cc, transparent)`,
  borderRadius: "14px 14px 0 0",
  opacity:      hov ? 1 : 0.45,
  transition:   "opacity 0.28s ease",
});

const cornerOrb = (hov = false, color = `rgba(${GLOW_RGB},0.18)`) => ({
  position:     "absolute",
  top: -30, right: -30,
  width: 90, height: 90,
  borderRadius: "50%",
  background:   color,
  filter:       "blur(22px)",
  opacity:      hov ? 0.9 : 0.35,
  transition:   "opacity 0.28s ease",
  pointerEvents:"none",
});

const pillBase = {
  display:       "inline-flex",
  alignItems:    "center",
  gap:           8,
  borderRadius:  8,
  fontSize:      16.25,
  fontWeight:    600,
  textDecoration:"none",
  cursor:        "pointer",
  transition:    "all 0.2s",
};

// ─────────────────────────────────────────────────────────────────────────────
// INJECT GOOGLE FONTS  (runs once at module level, outside React lifecycle)
// ─────────────────────────────────────────────────────────────────────────────

(function injectFonts() {
  if (document.getElementById("portfolio-fonts")) return;
  const link = document.createElement("link");
  link.id   = "portfolio-fonts";
  link.rel  = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Dancing+Script:wght@900&display=swap";
  document.head.appendChild(link);
})();

// ─────────────────────────────────────────────────────────────────────────────
// TYPEWRITER BADGE
// ─────────────────────────────────────────────────────────────────────────────

function TypewriterBadge({
  words       = TYPEWRITER_WORDS,
  typingSpeed = 110,
  deleteSpeed = 65,
  pauseMs     = 2000,
}) {
  const [wordIdx,  setWordIdx]  = useState(0);
  const [chars,    setChars]    = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused,   setPaused]   = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const word = words[wordIdx];
    clearTimeout(timerRef.current);

    if (paused) {
      timerRef.current = setTimeout(() => { setPaused(false); setDeleting(true); }, pauseMs);
      return;
    }

    if (!deleting) {
      if (chars.length < word.length) {
        timerRef.current = setTimeout(() => setChars(word.slice(0, chars.length + 1)), typingSpeed);
      } else {
        setPaused(true);
      }
    } else {
      if (chars.length > 0) {
        timerRef.current = setTimeout(() => setChars(chars.slice(0, -1)), deleteSpeed);
      } else {
        setDeleting(false);
        setWordIdx(i => (i + 1) % words.length);
      }
    }

    return () => clearTimeout(timerRef.current);
  }, [chars, deleting, paused, wordIdx, words, typingSpeed, deleteSpeed, pauseMs]);

  return (
    <>
      <style>{`
        @keyframes tw-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .tw-word {
          background: linear-gradient(90deg, ${ACCENT2} 0%, #22edfc 50%, ${ACCENT2} 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: tw-shimmer 2.8s linear infinite;
        }
      `}</style>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "clamp(4px,1vw,14px)", fontFamily: "'Caveat', cursive" }}>
        <span style={{ fontSize: "clamp(1.3rem,3vw,2.625rem)", fontWeight: 700, color: "rgba(255,255,255,.65)", letterSpacing: "0.06em", textShadow: `0 0 40px rgba(145,149,246,.6)`, lineHeight: 1.3 }}>
          I'm a
        </span>
        <span className="tw-word" style={{ fontSize: "clamp(1.4rem,3.2vw,2.75rem)", fontWeight: 700, minWidth: "2ch", minHeight: "1.4em", display: "inline-block", lineHeight: 1.3, paddingRight: "0.1em", paddingBottom: "0.1em" }}>
          {chars}
        </span>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// ANIMATED DOTS CANVAS
// ─────────────────────────────────────────────────────────────────────────────

const getDotCount  = () => Math.floor((window.innerWidth * window.innerHeight) / 5000);
const DOT_LINK_DIST = 100;

function DotsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;

    const dots = [];

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const newCount = getDotCount();
      dots.length = 0;
      for (let i = 0; i < newCount; i++) {
        dots.push({
          x:  Math.random() * canvas.width,
          y:  Math.random() * canvas.height,
          r:  Math.random() * 3 + 1,
          vx: (Math.random() - 0.5) * 1.4,
          vy: (Math.random() - 0.5) * 1.4,
        });
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      raf = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move & draw dots
      dots.forEach(d => {
        if (d.x < 0 || d.x > canvas.width)  d.vx *= -1;
        if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
        d.x += d.vx;
        d.y += d.vy;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.fill();
      });

      // Draw connecting lines
      ctx.beginPath();
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          if (Math.hypot(dots[j].x - dots[i].x, dots[j].y - dots[i].y) < DOT_LINK_DIST) {
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
          }
        }
      }
      ctx.lineWidth   = 0.15;
      ctx.strokeStyle = "rgba(255,255,255,0.45)";
      ctx.stroke();
    };

    animate();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", zIndex: 3, pointerEvents: "none" }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRIMITIVE UI COMPONENTS
// ─────────────────────────────────────────────────────────────────────────────

function SectionHeading({ children }) {
  return (
    <div style={{
      fontSize:        24,
      fontWeight:      700,
      letterSpacing:   "0.2em",
      textTransform:   "uppercase",
      color:           ACCENT,
      borderBottom:    `1px solid rgba(${GLOW_RGB},0.22)`,
      paddingBottom:   8,
      marginBottom:    18,
      textShadow:      `0 0 25px ${ACCENT2}`,
    }}>
      {children}
    </div>
  );
}

function TechTag({ label }) {
  return (
    <span style={{
      display:      "inline-block",
      background:   `rgba(${GLOW_RGB},0.12)`,
      color:        ACCENT,
      border:       `1px solid rgba(${GLOW_RGB},0.25)`,
      borderRadius: 20,
      padding:      "2px 10px",
      fontSize:     18,
      marginRight:  5,
      marginBottom: 5,
    }}>
      {label}
    </span>
  );
}

function SkillPill({ label, color }) {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:      "inline-block",
        background:   hov ? `${color}22` : "rgba(255,255,255,0.06)",
        border:       `1px solid ${hov ? color : "rgba(255,255,255,0.12)"}`,
        color:        hov ? color : "rgba(255,255,255,0.72)",
        borderRadius: 20,
        padding:      "4px 13px",
        fontSize:     20,
        marginRight:  6,
        marginBottom: 7,
        cursor:       "default",
        transition:   "all 0.22s ease",
        fontFamily:   "'Caveat', cursive",
        fontWeight:   400,
        letterSpacing:"0.02em",
      }}
    >
      {label}
    </span>
  );
}

// Reusable hover-button / hover-link style helpers
function useHoverStyle(base, hovered) {
  const [hov, setHov] = useState(false);
  return {
    style:        hov ? { ...base, ...hovered } : base,
    onMouseEnter: () => setHov(true),
    onMouseLeave: () => setHov(false),
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SKILL CARD  (used for both Tech & Non-Tech grids)
// ─────────────────────────────────────────────────────────────────────────────

function SkillCard({ group, index }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...glassCard(hov, { padding: "20px 22px", animation: "fadeUp 0.45s ease both", animationDelay: `${index * 0.08}s` }),
        boxShadow: hov ? `0 0 28px ${group.glow}` : "none",
        border:    `1px solid ${hov ? `${group.color}55` : "rgba(255,255,255,0.1)"}`,
      }}
    >
      <div style={accentLine(hov)} />
      <div style={cornerOrb(hov, group.glow)} />
      <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: group.color, fontFamily: "'Caveat', cursive", marginBottom: 14 }}>
        {group.category}
      </div>
      <div style={{ lineHeight: 1 }}>
        {group.skills.map((sk, i) => <SkillPill key={i} label={sk} color={group.color} />)}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EXPERIENCE CARD
// ─────────────────────────────────────────────────────────────────────────────

function ExperienceCard({ ex, index }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={glassCard(hov, { padding: "22px 24px", marginBottom: 14, animation: "fadeUp 0.45s ease both", animationDelay: `${index * 0.08}s` })}
    >
      <div style={accentLine(hov)} />
      <div style={cornerOrb(hov)} />

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 22, color: "#fff", marginBottom: 4 }}>{ex.role}</div>
          <div style={{ fontSize: 18, color: ACCENT }}>
            {ex.company}
            <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 6px" }}>·</span>
            <span style={{ fontSize: 16, color: "rgba(255,255,255,0.45)" }}>{ex.loc}</span>
          </div>
        </div>
        <span style={{ background: `rgba(${GLOW_RGB},0.1)`, border: `1px solid rgba(${GLOW_RGB},0.25)`, color: ACCENT, borderRadius: 20, padding: "3px 12px", fontSize: 20, whiteSpace: "nowrap", alignSelf: "flex-start", flexShrink: 0, fontFamily: "'Caveat', cursive", fontWeight: 600 }}>
          {ex.period}
        </span>
      </div>

      <ul style={{ margin: "0 0 0 4px", paddingLeft: 20, listStyleType: "disc", color: "rgba(255,255,255,0.75)", fontSize: 20, lineHeight: 1.75 }}>
        {ex.bullets.map((b, i) => <li key={i} style={{ marginBottom: 5 }}>{b}</li>)}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT CARD
// ─────────────────────────────────────────────────────────────────────────────

function ProjectCard({ pr, index }) {
  const [hov, setHov] = useState(false);
  const linkHover = useHoverStyle(
    { background: "rgba(34,197,94,0.12)", borderColor: "rgba(34,197,94,0.35)" },
    { background: "rgba(34,197,94,0.25)", borderColor: "#22c55e" }
  );

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={glassCard(hov, { padding: "22px 24px", marginBottom: 14, animation: "fadeUp 0.45s ease both", animationDelay: `${index * 0.08}s` })}
    >
      <div style={accentLine(hov)} />
      <div style={cornerOrb(hov)} />

      {/* Name + link */}
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
        <div style={{ fontWeight: 700, fontSize: 20, color: "#fff" }}>{pr.name}</div>
        {pr.link && (
          <a
            href={pr.link}
            target="_blank"
            rel="noopener noreferrer"
            {...linkHover}
            style={{
              ...pillBase,
              ...linkHover.style,
              border:      `1px solid`,
              borderRadius: 6,
              padding:     "3px 11px",
              fontSize:    14,
              color:       "#22c55e",
              fontFamily:  "'Caveat', cursive",
            }}
          >
            <ExternalLinkIcon size={11} color="#22c55e" />
            Link
          </a>
        )}
      </div>

      {/* Tech tags */}
      <div style={{ marginBottom: 14, lineHeight: 1.6 }}>
        {pr.tech.split(" · ").map((t, i) => <TechTag key={i} label={t} />)}
      </div>

      <ul style={{ margin: "0 0 0 4px", paddingLeft: 20, listStyleType: "disc", color: "rgba(255,255,255,0.75)", fontSize: 20, lineHeight: 1.75 }}>
        {pr.pts.map((pt, i) => <li key={i} style={{ marginBottom: 5 }}>{pt}</li>)}
      </ul>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// EDUCATION CARD
// ─────────────────────────────────────────────────────────────────────────────

function EducationCard({ edu, index }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={glassCard(hov, {
        padding:       "20px 24px",
        marginBottom:  12,
        display:       "flex",
        justifyContent:"space-between",
        alignItems:    "center",
        flexWrap:      "wrap",
        gap:           10,
        animation:     "fadeUp 0.45s ease both",
        animationDelay:`${index * 0.08}s`,
      })}
    >
      <div style={accentLine(hov)} />
      <div style={cornerOrb(hov)} />
      <div>
        <div style={{ fontWeight: 700, fontSize: 17.5, color: "#fff", marginBottom: 3 }}>{edu.deg}</div>
        <div style={{ fontSize: 16.25, color: ACCENT, marginBottom: 2 }}>{edu.inst}</div>
        <div style={{ fontSize: 14.38, color: "rgba(255,255,255,0.45)" }}>{edu.period}</div>
      </div>
      <div style={{ background: `rgba(${GLOW_RGB},0.1)`, border: `1px solid rgba(${GLOW_RGB},0.28)`, borderRadius: 8, padding: "6px 16px", fontSize: 20, fontWeight: 700, color: ACCENT, flexShrink: 0 }}>
        {edu.score}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATION CARD
// ─────────────────────────────────────────────────────────────────────────────

function CertificationCard({ cert }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={glassCard(hov, { padding: "20px 24px", animation: "fadeUp 0.45s ease both", animationDelay: "0.32s" })}
    >
      <div style={accentLine(hov)} />
      <div style={cornerOrb(hov)} />
      <div style={{ fontSize: 20, color: "rgba(255,255,255,0.82)", lineHeight: 1.7 }}>{cert}</div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RESUME MODAL
// ─────────────────────────────────────────────────────────────────────────────

function ResumeModal({ onClose }) {
  const dlBtnBase = {
    ...pillBase,
    justifyContent: "center",
    background:  `rgba(${GLOW_RGB},0.13)`,
    border:      `1px solid rgba(${GLOW_RGB},0.4)`,
    padding:     "11px 20px",
    color:       ACCENT,
    fontFamily:  "'Caveat', cursive",
    width:       "100%",
  };

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", inset: 0, background: "rgba(5,8,20,0.72)", backdropFilter: "blur(6px)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position:         "relative",
          background:       "rgba(255,255,255,0.07)",
          border:           "1px solid rgba(255,255,255,0.13)",
          borderRadius:     18,
          backdropFilter:   "blur(18px)",
          boxShadow:        `0 8px 48px rgba(0,0,0,0.55), 0 0 60px rgba(${GLOW_RGB},0.08)`,
          padding:          "38px 40px 32px",
          minWidth:         340,
          maxWidth:         480,
          width:            "90vw",
          overflow:         "hidden",
          animation:        "fadeUp 0.28s ease both",
        }}
      >
        {/* Top accent + corner orb */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${ACCENT}cc, transparent)`, borderRadius: "18px 18px 0 0" }} />
        <div style={{ position: "absolute", top: -35, right: -35, width: 110, height: 110, borderRadius: "50%", background: `rgba(${GLOW_RGB},0.18)`, filter: "blur(28px)", pointerEvents: "none" }} />

        <div style={{ fontSize: 22, fontWeight: 700, color: ACCENT, letterSpacing: "0.12em", textTransform: "uppercase", textShadow: `0 0 20px ${ACCENT2}`, marginBottom: 8, fontFamily: "'Caveat', cursive" }}>
          Download Resume
        </div>
        <div style={{ fontSize: 15.5, color: "rgba(255,255,255,0.5)", marginBottom: 30, fontFamily: "'Caveat', cursive" }}>
          Choose the version that fits your needs
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 32 }}>
          {[
            { href: "/Portfolio/Satyabrata_Dash_Resume.pdf",         label: "Download Technical Resume" },
            { href: "/Portfolio/Resume_Satyabrata_Dash.pdf",          label: "Download Non-Technical Resume" },
          ].map(({ href, label }) => (
            <DownloadLink key={label} href={href} label={label} style={dlBtnBase} />
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <CancelButton onClick={onClose} />
        </div>
      </div>
    </div>
  );
}

function DownloadLink({ href, label, style }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      download
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...style,
        background:   hov ? `rgba(${GLOW_RGB},0.26)` : style.background,
        borderColor:  hov ? ACCENT : `rgba(${GLOW_RGB},0.4)`,
      }}
    >
      <DownloadIcon size={15} color={ACCENT} />
      {label}
    </a>
  );
}

function CancelButton({ onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...pillBase,
        background:   hov ? "rgba(220,50,50,0.18)" : "rgba(255,255,255,0.07)",
        border:       `1px solid ${hov ? "rgba(220,50,50,0.6)" : "rgba(255,255,255,0.2)"}`,
        padding:      "8px 20px",
        fontSize:     15.5,
        color:        hov ? "#ff6b6b" : "rgba(255,255,255,0.88)",
        fontFamily:   "'Caveat', cursive",
      }}
    >
      Cancel
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// INLINE SVG ICONS  (keeps imports zero-dependency)
// ─────────────────────────────────────────────────────────────────────────────

const ExternalLinkIcon = ({ size = 15, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const DownloadIcon = ({ size = 15, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const EmailIcon = ({ size = 15, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LinkedInIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#7db8e8">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="rgba(255,255,255,0.88)">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// NAV LOGO  (animated color-cycling SVG from public folder)
// ─────────────────────────────────────────────────────────────────────────────

function NavLogo() {
  const [color, setColor] = useState("#5ecfff");

  useEffect(() => {
    const values = "0123456789abcdef";
    const randomHex = () =>
      "#" + Array.from({ length: 6 }, () => values[Math.floor(Math.random() * values.length)]).join("");

    const interval = setInterval(() => setColor(randomHex()), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <img
      src="/Portfolio/navsvg.svg"
      alt="SD"
      width="38"
      height="38"
      style={{
        flexShrink: 0,
        filter: `drop-shadow(0 0 25px ${color})`,
        boxShadow: `0 0 6px 2px ${color}B3,0 0 14px 4px ${color}B3)`,
        transition: "filter 0.5s ease-in-out infinite",
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────────────

function Navbar({ activeNav, onNavClick }) {
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);

  const navTextStyle = (n) => ({
    background:   activeNav === n ? `rgba(${GLOW_RGB},0.14)` : "transparent",
    border:       `1px solid ${activeNav === n ? `rgba(${GLOW_RGB},0.4)` : "transparent"}`,
    color:        hoveredNav === n ? "cyan" : activeNav === n ? ACCENT : "rgba(255,255,255,0.6)",
    borderRadius: 7,
    padding:      "6px 14px",
    fontSize:     15,
    fontWeight:   900,
    cursor:       "pointer",
    transition:   "all 0.2s",
    fontFamily:   '"Dancing Script", cursive',
    textShadow:
      hoveredNav === n
        ? "1px 1px 2px black, 0 0 0.7em white, 0 0 0.14em #008080"
        : activeNav === n
        ? "none"
        : "1px 1px 2px black, 0 0 0.7em #00674b, 0 0 0.14em #00674b",
  });

  const handleClick = (n) => {
    onNavClick(n);
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, background: "rgba(6,9,22,0.88)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(255,255,255,0.07)", zIndex: 150, padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 54 }}>
        <NavLogo />

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 4 }} className="desktop-nav">
          {NAV_ITEMS.map(n => (
            <button
              key={n}
              onClick={() => handleClick(n)}
              onMouseEnter={() => setHoveredNav(n)}
              onMouseLeave={() => setHoveredNav(null)}
              style={navTextStyle(n)}
            >
              {n}
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(m => !m)}
          className="ham-btn"
          style={{ background: "none", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 6, color: "#fff", padding: "6px 10px", cursor: "pointer", fontSize: 18, display: "none" }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{ position: "fixed", top: 54, left: 0, right: 0, background: "rgba(6,9,22,0.97)", zIndex: 140, borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column", padding: "8px 0" }}>
          {NAV_ITEMS.map(n => (
            <button
              key={n}
              onClick={() => handleClick(n)}
              onMouseEnter={() => setHoveredNav(n)}
              onMouseLeave={() => setHoveredNav(null)}
              style={{ background: "transparent", border: "none", padding: "12px 24px", textAlign: "left", cursor: "pointer", fontFamily: '"Dancing Script", cursive', fontSize: 15, ...navTextStyle(n) }}
            >
              {n}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT CHIP
// ─────────────────────────────────────────────────────────────────────────────

const chipStyle = { display: "inline-flex", alignItems: "center", gap: 5, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "5px 13px", fontSize: 15, color: "rgba(255,255,255,0.75)", textDecoration: "none" };

function ContactChips() {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
      <span style={chipStyle}>📍 <span>{PROFILE.location}</span></span>
      <a href={`mailto:${PROFILE.email}`} style={{ ...chipStyle, cursor: "pointer" }}>✉️ <span>{PROFILE.email}</span></a>
      <a href={`tel:${PROFILE.phone}`}    style={{ ...chipStyle, cursor: "pointer" }}>📱 <span>{PROFILE.phone}</span></a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL / ACTION BUTTONS
// ─────────────────────────────────────────────────────────────────────────────

function SocialButtons({ onResumeClick }) {
  const [hovLI, setHovLI] = useState(false);
  const [hovGH, setHovGH] = useState(false);
  const [hovDL, setHovDL] = useState(false);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 28 }}>
      {/* LinkedIn */}
      <a
        href={PROFILE.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovLI(true)}
        onMouseLeave={() => setHovLI(false)}
        style={{ ...pillBase, background: hovLI ? "rgba(10,102,194,0.30)" : "rgba(10,102,194,0.15)", border: `1px solid ${hovLI ? "rgba(10,102,194,0.85)" : "rgba(10,102,194,0.45)"}`, padding: "8px 16px", color: "#7db8e8" }}
      >
        <LinkedInIcon /> LinkedIn
      </a>

      {/* GitHub */}
      <a
        href={PROFILE.github}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovGH(true)}
        onMouseLeave={() => setHovGH(false)}
        style={{ ...pillBase, background: hovGH ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.07)", border: `1px solid ${hovGH ? "rgba(255,255,255,0.45)" : "rgba(255,255,255,0.2)"}`, padding: "8px 16px", color: "rgba(255,255,255,0.88)" }}
      >
        <GitHubIcon /> GitHub
      </a>

      {/* Download Resume */}
      <button
        onClick={onResumeClick}
        onMouseEnter={() => setHovDL(true)}
        onMouseLeave={() => setHovDL(false)}
        style={{ ...pillBase, background: hovDL ? `rgba(${GLOW_RGB},0.26)` : `rgba(${GLOW_RGB},0.13)`, border: `1px solid ${hovDL ? ACCENT : `rgba(${GLOW_RGB},0.4)`}`, padding: "8px 16px", color: ACCENT, fontFamily: "'Caveat', cursive" }}
      >
        <DownloadIcon color={ACCENT} /> Download Resume
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN PORTFOLIO
// ─────────────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeNav,       setActiveNav]       = useState("About");
  const [showResumeModal, setShowResumeModal] = useState(false);

  const scrollTo = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveNav(id);
  }, []);

  // Build Tech Skill groups in the same shape as NON_TECH_SKILLS
  const techSkillGroups = PROFILE.skills.map(sk => ({
    category: sk.cat,
    color:    ACCENT,
    glow:     `rgba(${GLOW_RGB},0.18)`,
    skills:   sk.val.split(",").map(s => s.trim()),
  }));

  return (
    <div style={{ minHeight: "100vh", background: `url(${BG_IMAGE}) no-repeat fixed center / cover`, color: "#e8eaf0", fontFamily: "'Caveat', cursive", position: "relative" }}>
      {/* Dark overlay */}
      <div style={{ position: "fixed", inset: 0, background: "rgba(5,8,20,0.72)", zIndex: 2, pointerEvents: "none" }} />

      <DotsCanvas />
      <Navbar activeNav={activeNav} onNavClick={scrollTo} />

      {/* Page body */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "80px 20px", position: "relative", zIndex: 10 }}>

        {/* ── ABOUT ─────────────────────────────────────────────────── */}
        <section id="About" style={{ marginBottom: 60, scrollMarginTop: 69 }}>
          <div style={{ fontSize: 16, color: ACCENT, letterSpacing: "0.12em", textTransform: "uppercase" }}>Hello, I'm</div>

          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0 24px", marginBottom: 4 }}>
            <span style={{ fontWeight: 700, color: "#fff", fontSize: "clamp(1.5rem,3.5vw,3rem)", lineHeight: 1.1 }}>
              {PROFILE.name}
            </span>
            <TypewriterBadge />
          </div>

          <div style={{ fontSize: "clamp(1.19rem,3.13vw,1.44rem)", color: "#8ab4d0", marginBottom: 6 }}>{PROFILE.role}</div>
          <div style={{ fontSize: 17.5, color: ACCENT, fontWeight: 600, marginBottom: 26 }}>{PROFILE.stack}</div>

          <ContactChips />
          <SocialButtons onResumeClick={() => setShowResumeModal(true)} />

          {/* Summary */}
          <div style={{ background: `rgba(${GLOW_RGB},0.05)`, border: `1px solid rgba(${GLOW_RGB},0.14)`, borderLeft: `3px solid ${ACCENT}`, borderRadius: "0 10px 10px 0", padding: "16px 20px", fontSize: 22, lineHeight: 1.8, color: "rgba(255,255,255,0.8)" }}>
            {PROFILE.summary}
          </div>
        </section>

        {/* ── TECHNICAL SKILLS ──────────────────────────────────────── */}
        <section id="Skills" style={{ marginBottom: 60, scrollMarginTop: 69 }}>
          <SectionHeading>Technical Skills</SectionHeading>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
            {techSkillGroups.map((g, i) => <SkillCard key={i} group={g} index={i} />)}
          </div>
        </section>

        {/* ── NON-TECHNICAL SKILLS ──────────────────────────────────── */}
        <section id="Non-Tech" style={{ marginBottom: 60, scrollMarginTop: 69 }}>
          <SectionHeading>Non-Technical Skills</SectionHeading>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
            {NON_TECH_SKILLS.map((g, i) => <SkillCard key={i} group={g} index={i} />)}
          </div>
        </section>

        {/* ── EXPERIENCE ────────────────────────────────────────────── */}
        <section id="Experience" style={{ marginBottom: 60, scrollMarginTop: 69 }}>
          <SectionHeading>Professional Experience</SectionHeading>
          {PROFILE.experience.map((ex, i) => <ExperienceCard key={i} ex={ex} index={i} />)}
        </section>

        {/* ── PROJECTS ──────────────────────────────────────────────── */}
        <section id="Projects" style={{ marginBottom: 60, scrollMarginTop: 69 }}>
          <SectionHeading>Projects</SectionHeading>
          {PROFILE.projects.map((pr, i) => <ProjectCard key={i} pr={pr} index={i} />)}
        </section>

        {/* ── EDUCATION ─────────────────────────────────────────────── */}
        <section id="Education" style={{ marginBottom: 40, scrollMarginTop: 69 }}>
          <SectionHeading>Education & Certification</SectionHeading>
          {PROFILE.education.map((edu, i) => <EducationCard key={i} edu={edu} index={i} />)}
          <CertificationCard cert={PROFILE.cert} />
        </section>

        {/* ── FOOTER ────────────────────────────────────────────────── */}
        <footer style={{ textAlign: "center", paddingTop: 24, paddingBottom: 8, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <FooterEmailLink />
        </footer>
      </div>

      {/* ── RESUME MODAL ──────────────────────────────────────────── */}
      {showResumeModal && <ResumeModal onClose={() => setShowResumeModal(false)} />}

      {/* ── GLOBAL STYLES ─────────────────────────────────────────── */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        * { box-sizing: border-box; }
        body { margin: 0; }
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .ham-btn     { display: block !important; }
        }
        @media (min-width: 641px) {
          .ham-btn { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function FooterEmailLink() {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={`mailto:${PROFILE.email}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...pillBase,
        background:   hov ? `rgba(${GLOW_RGB},0.26)` : `rgba(${GLOW_RGB},0.13)`,
        border:       `1px solid ${hov ? ACCENT : `rgba(${GLOW_RGB},0.4)`}`,
        padding:      "9px 22px",
        color:        ACCENT,
      }}
    >
      <EmailIcon color={ACCENT} />
      Contact via Mail
    </a>
  );
}
