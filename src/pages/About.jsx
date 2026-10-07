import { useLayoutEffect, useRef } from "react";

import CTA from "../components/CTA";
import Counter from "../components/Counter";
import HeroPlane from "../components/HeroPlane";
import Marquee from "../components/Marquee";
import ScrollProgress from "../components/ScrollProgress";
import TechIcon from "../components/TechIcon";
import usePageMeta from "../hooks/usePageMeta";
import {
  AwardIcon,
  BriefcaseIcon,
  CapIcon,
  ChartIcon,
  CompassIcon,
  DatabaseIcon,
  LanguagesIcon,
  LayersIcon,
  LayoutIcon,
  PinIcon,
  ServerIcon,
  ShieldIcon,
  SparkIcon,
} from "../components/icons";
import {
  certifications,
  education,
  experiences,
  profile,
  skillGroups,
} from "../constants";
import {
  EASE,
  EASE_GLIDE,
  gsap,
  prefersReducedMotion,
  revealUp,
  splitWords,
} from "../lib/motion";

/* Numbers straight from the CV. Every figure here also appears there. */
const results = [
  { value: 100, suffix: "+", label: "Teams onboarded", at: "WebflowX" },
  { value: 50, suffix: "+", label: "SMB customers served", at: "InvoiceStock" },
  { value: 28, suffix: "%", label: "Smaller frontend bundle", at: "InvoiceStock" },
  { value: 12, suffix: "+", label: "Clients delivered for", at: "North Foundry" },
];

const GROUP_ICONS = {
  Languages: LanguagesIcon,
  Frontend: LayoutIcon,
  Backend: ServerIcon,
  "Databases & Cloud": DatabaseIcon,
  "Auth & Security": ShieldIcon,
  "AI & Integrations": SparkIcon,
  "Testing & DevOps": LayersIcon,
};

const SectionHeading = ({ icon: Icon, title, count }) => (
  <div className="rule-heading" data-reveal>
    <span className="section-icon">
      <Icon />
    </span>
    <h2 className="subhead-text">{title}</h2>
    {count != null && <span className="meta ml-auto whitespace-nowrap">{count}</span>}
  </div>
);

const About = () => {
  const root = useRef(null);
  const headline = useRef(null);

  usePageMeta({
    title: "About Syed Laeeq Ahmed | Full-Stack Engineer, 5+ Years",
    description:
      "Experience, skills and results: North Foundry, WebflowX, Nexora Systems, InvoiceStock and Routelane. React, Next.js, TypeScript, Node.js. Download the resume.",
    path: "/about",
  });

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion();

      /* ---- Entrance: eyebrow, headline words, lede, hero panel ---- */
      const words = splitWords(headline.current);
      const tl = gsap.timeline({ defaults: { ease: EASE } });

      if (reduced) {
        tl.set("[data-hero]", { autoAlpha: 1 });
      } else {
        tl.from("[data-eyebrow]", { autoAlpha: 0, y: 12, duration: 0.5 })
          .from(
            words,
            { yPercent: 115, duration: 0.9, stagger: 0.045, ease: EASE_GLIDE },
            "-=0.25"
          )
          .from(
            "[data-lede] > *",
            { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.09 },
            "-=0.5"
          )
          .from(
            "[data-hero-visual]",
            { autoAlpha: 0, scale: 0.94, duration: 1, ease: EASE_GLIDE },
            "-=0.8"
          )
          .from(
            "[data-hero-meta] > *",
            { autoAlpha: 0, y: 10, duration: 0.5, stagger: 0.06 },
            "-=0.6"
          );
      }

      /* ---- Scroll reveals ---- */
      gsap.utils.toArray("[data-reveal]").forEach((el) => revealUp(el));

      gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
        revealUp(group.children, { trigger: group, stagger: 0.05 });
      });

      /* ---- Timeline: the spine draws itself as you scroll past ---- */
      if (!reduced) {
        gsap.fromTo(
          "[data-timeline-spine]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "[data-timeline]",
              start: "top 70%",
              end: "bottom 70%",
              scrub: 0.4,
            },
          }
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section className="max-container" ref={root}>
      <ScrollProgress />

      {/* ------------------------------ Hero ------------------------------ */}
      <div data-hero className="grid lg:grid-cols-[1.35fr_1fr] gap-8 lg:gap-12 items-center">
        <div>
          <p className="meta" data-eyebrow>
            About
          </p>
          <h1 className="head-text mt-3">
            <span ref={headline} className="inline-block">
              Full-stack engineer building software that scales.
            </span>
          </h1>

          <div
            className="mt-6 flex flex-col gap-4 text-muted max-w-2xl leading-relaxed"
            data-lede
          >
            <p>
              I&apos;m {profile.name}, based in {profile.location}, with{" "}
              {profile.yearsExperience} years of experience shipping production
              web applications for UK and US teams, much of it alongside a BSc
              in Computer Science.
            </p>
            <p>
              I work end to end across React and Next.js front ends, Node.js
              REST and GraphQL APIs, PostgreSQL, multi-tenant SaaS with
              role-based access control, real-time WebRTC features, CI/CD and
              LLM integrations.
            </p>
            <p>
              Right now I run{" "}
              <a
                href="https://northfoundry.co"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-link"
              >
                North Foundry
              </a>
              , a small studio building custom web apps, AI automation and CRM
              systems. I&apos;m now looking for a full-time software
              engineering role, remote or with relocation.
            </p>
          </div>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3" data-hero-meta>
            <span className="inline-flex items-center gap-2 text-sm text-haze">
              <PinIcon />
              {profile.location}
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-haze">
              <CompassIcon />
              {profile.availability}
            </span>
            <span className="inline-flex items-center gap-2 text-sm text-haze">
              <BriefcaseIcon />
              {profile.yearsExperience} years shipping
            </span>
          </div>
        </div>

        <div data-hero-visual className="hero-panel">
          <HeroPlane className="h-[220px] sm:h-[260px] w-full" />
          <p className="meta absolute bottom-4 left-5 !text-ink/40">
            Still flying · since 2019
          </p>
        </div>
      </div>

      <div className="mt-14" data-reveal>
        <Marquee />
      </div>

      {/* -------------------------- Measured results ---------------------- */}
      <div className="py-14">
        <SectionHeading icon={ChartIcon} title="Results" />
        {/* One strip, four equal cells: the numbers share a baseline at
            every width and nothing moves independently on scroll. */}
        <dl className="stat-strip mt-8" data-reveal>
          {results.map((r) => (
            <div key={r.label} className="stat-cell">
              <dt className="font-display font-bold text-[2.6rem] leading-none tracking-[-0.03em] text-ink tabular-nums">
                <Counter to={r.value} prefix={r.prefix} suffix={r.suffix} />
              </dt>
              <dd className="mt-3 text-sm text-ink">{r.label}</dd>
              <dd className="meta mt-1">{r.at}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* ------------------------------ Skills ---------------------------- */}
      <div className="pb-14">
        <SectionHeading
          icon={LayersIcon}
          title="Skills"
          count={`${skillGroups.reduce((n, g) => n + g.items.length, 0)} total`}
        />
        <div className="mt-8 grid md:grid-cols-2 gap-x-12 gap-y-9">
          {skillGroups.map((group) => {
            const Icon = GROUP_ICONS[group.label] || LayersIcon;
            return (
              <div key={group.label} className="flex flex-col gap-3" data-reveal>
                <p className="meta flex items-center gap-2 !text-ink">
                  <Icon className="w-3.5 h-3.5 text-horizon" />
                  {group.label}
                </p>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="skill-chip">
                      <TechIcon name={item} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* ---------------------------- Experience -------------------------- */}
      <div className="pb-14">
        <SectionHeading
          icon={BriefcaseIcon}
          title="Experience"
          count={`${experiences.length} roles`}
        />
        <div className="mt-8 relative" data-timeline>
          <span className="timeline-rail" aria-hidden="true">
            <span className="timeline-spine" data-timeline-spine />
          </span>

          {experiences.map((exp) => (
            <article
              key={`${exp.company}-${exp.date}`}
              className="timeline-item"
              data-current={exp.current ? "true" : "false"}
              data-reveal
            >
              <p className="timeline-date">
                {exp.date}
                <span className="block normal-case tracking-normal text-haze/80">
                  {exp.location}
                </span>
              </p>
              <div className="mt-2 md:mt-0">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <h3 className="font-display font-bold text-xl tracking-[-0.015em]">
                    {exp.company}
                  </h3>
                  {exp.current && <span className="pill-now">Now</span>}
                </div>
                <p className="mt-0.5 font-display font-medium text-horizon">
                  {exp.title}
                </p>
                <ul className="mt-3.5 flex flex-col gap-2">
                  {exp.points.map((point, i) => (
                    <li key={i} className="bullet">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* --------------------- Education & certifications ------------------ */}
      <div className="pb-14 grid md:grid-cols-2 gap-10 md:gap-12">
        <div>
          <SectionHeading icon={CapIcon} title="Education" />
          <ul className="mt-6 flex flex-col gap-4" data-reveal-group>
            {education.map((e) => (
              <li key={e.school} className="record-card">
                <p className="font-display font-medium">{e.qualification}</p>
                <p className="text-sm text-haze mt-1">{e.school}</p>
                <p className="meta mt-2">{e.date}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionHeading icon={AwardIcon} title="Certifications" />
          <ul className="mt-6 flex flex-col gap-4" data-reveal-group>
            {certifications.map((c) => (
              <li key={c.name} className="record-card">
                <p className="text-sm">{c.name}</p>
                <p className="meta mt-2">{c.date}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <hr className="border-rule" />
      <div data-reveal>
        <CTA />
      </div>
    </section>
  );
};

export default About;
