import { Link } from "react-router-dom";

import { ArrowUpRight } from "./icons";

const stages = {
  2: {
    body: "Five-plus years shipping production web applications for UK and US teams. I work across the whole stack: architecture, multi-tenant data isolation, auth and RBAC, CI/CD, and the tests that keep it standing.",
    to: "/about",
    cta: "Read the background",
  },
  3: {
    body: "Recent work: a multi-tenant team workspace on Convex and WebRTC, a parking access system secured with passkeys, and an Android mental-health companion with server-side AI guardrails. All of it linked.",
    to: "/projects",
    cta: "See the projects",
  },
  4: {
    body: "Open to full-time full-stack roles: remote as a contractor or through an employer of record, or with relocation. Tell me what you're building.",
    to: "/contact",
    cta: "Get in touch",
  },
};

const HomeInfo = ({ currentStage }) => {
  if (currentStage === 1) {
    return (
      <div className="sky-card card-in py-5 px-7 text-ink mx-5 max-w-2xl">
        <p className="meta !text-horizon">Full-Stack Engineer · Lahore · UTC+5</p>
        <h1 className="mt-2 font-display font-bold sm:text-[1.9rem] text-xl leading-tight tracking-[-0.02em]">
          Hi, I&apos;m Syed Laeeq Ahmed.
        </h1>
        <p className="mt-2 sm:text-base text-sm text-muted leading-relaxed">
          I build multi-tenant SaaS and web applications in React, Next.js,
          Node.js and TypeScript, from Lahore, for teams in the UK and US.
        </p>
      </div>
    );
  }

  const stage = stages[currentStage];
  if (!stage) return null;

  return (
    <div className="info-box card-in" key={currentStage}>
      <p className="sm:text-base text-sm text-center leading-relaxed text-ink/85">
        {stage.body}
      </p>
      <Link to={stage.to} className="btn">
        {stage.cta}
        <ArrowUpRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default HomeInfo;
