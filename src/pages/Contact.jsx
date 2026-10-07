import emailjs from "@emailjs/browser";
import usePageMeta from "../hooks/usePageMeta";
import { Canvas } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useRef, useState } from "react";

import Alert from "../components/Alert";
import Loader from "../components/Loader";
import { MailIcon, PhoneIcon, SendIcon } from "../components/icons";
import useAlert from "../hooks/useAlert";
import useCanvasActive from "../hooks/useCanvasActive";
import { Fox } from "../models/Fox";
import { profile } from "../constants";
import {
  EASE,
  EASE_GLIDE,
  gsap,
  prefersReducedMotion,
  splitWords,
} from "../lib/motion";

const Contact = () => {
  usePageMeta({
    title: "Contact Syed Laeeq Ahmed | Full-Stack Engineer",
    description:
      "Hiring for a full-stack role or need something built? Send a message or email laeeqthedev@gmail.com. Replies usually within a day.",
    path: "/contact",
  });

  const root = useRef(null);
  const headline = useRef(null);
  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const { alert, showAlert, hideAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState("idle");
  const [sceneRef, sceneActive] = useCanvasActive();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      const words = splitWords(headline.current);

      gsap
        .timeline({ defaults: { ease: EASE } })
        .from("[data-eyebrow]", { autoAlpha: 0, y: 12, duration: 0.5 })
        .from(
          words,
          { yPercent: 115, duration: 0.9, stagger: 0.05, ease: EASE_GLIDE },
          "-=0.25"
        )
        .from("[data-lede]", { autoAlpha: 0, y: 16, duration: 0.7 }, "-=0.55")
        .from(
          "[data-field]",
          { autoAlpha: 0, y: 18, duration: 0.6, stagger: 0.08 },
          "-=0.4"
        )
        .from(
          "[data-rail] > *",
          { autoAlpha: 0, x: -10, duration: 0.45, stagger: 0.05 },
          "-=0.5"
        )
        .from(
          "[data-scene]",
          { autoAlpha: 0, scale: 0.95, duration: 1, ease: EASE_GLIDE },
          "-=1"
        );
    }, root);

    return () => ctx.revert();
  }, []);

  const handleChange = ({ target: { name, value } }) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleFocus = (e) => {
    setCurrentAnimation("walk");
    if (!prefersReducedMotion() && e?.target?.closest("[data-field]")) {
      gsap.to(e.target.closest("[data-field]"), {
        x: 4,
        duration: 0.35,
        ease: EASE,
      });
    }
  };

  const handleBlur = (e) => {
    setCurrentAnimation("idle");
    if (!prefersReducedMotion() && e?.target?.closest("[data-field]")) {
      gsap.to(e.target.closest("[data-field]"), {
        x: 0,
        duration: 0.35,
        ease: EASE,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setCurrentAnimation("hit");

    emailjs
      .send(
        import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          to_name: profile.name,
          from_email: form.email,
          to_email: profile.email,
          message: form.message,
        },
        import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          setLoading(false);
          showAlert({
            show: true,
            text: "Message sent. I'll reply within a day.",
            type: "success",
          });
          setTimeout(() => {
            hideAlert(false);
            setCurrentAnimation("idle");
            setForm({ name: "", email: "", message: "" });
          }, 3500);
        },
        (error) => {
          setLoading(false);
          setCurrentAnimation("idle");
          console.error(error);
          showAlert({
            show: true,
            text: `That didn't send. Email me directly at ${profile.email}.`,
            type: "danger",
          });
        }
      );
  };

  return (
    <section className="max-container" ref={root}>
      {alert.show && <Alert {...alert} />}

      <p className="meta" data-eyebrow>
        Contact
      </p>
      <h1 className="head-text mt-3">
        <span ref={headline} className="inline-block">
          Tell me what you&apos;re building.
        </span>
      </h1>
      <p className="mt-6 text-muted leading-relaxed max-w-2xl" data-lede>
        Hiring for a full-stack role, or need something built? Send a message
        below or reach me directly. Either works, and I usually reply within a
        day.
      </p>

      <div className="mt-12 flex lg:flex-row flex-col gap-12">
        <div className="flex-1 min-w-[50%] flex flex-col">
          <form ref={formRef} onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <label className="font-display font-medium text-sm" data-field>
              Name
              <input
                type="text"
                name="name"
                className="input"
                placeholder="Your name"
                required
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>

            <label className="font-display font-medium text-sm" data-field>
              Email
              <input
                type="email"
                name="email"
                className="input"
                placeholder="you@company.com"
                required
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>

            <label className="font-display font-medium text-sm" data-field>
              Message
              <textarea
                name="message"
                rows="5"
                className="textarea"
                placeholder="What are you building?"
                required
                value={form.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </label>

            <div data-field>
              <button type="submit" disabled={loading} className="btn">
                <SendIcon />
                {loading ? "Sending…" : "Send message"}
              </button>
            </div>
          </form>

          <div className="mt-12 pt-8 border-t border-rule">
            <p className="meta">Direct</p>
            <div className="mt-4 flex flex-col gap-3" data-rail>
              <a href={`mailto:${profile.email}`} className="link-out">
                <MailIcon />
                {profile.email}
              </a>
              <a href={`tel:${profile.phone.replace(/\s/g, "")}`} className="link-out">
                <PhoneIcon />
                {profile.phone}
              </a>
            </div>
          </div>
        </div>

        <div
          ref={sceneRef}
          className="lg:w-1/2 w-full lg:h-auto md:h-[500px] h-[320px] hero-panel !p-0"
          data-scene
        >
          <Canvas
            frameloop={sceneActive ? "always" : "never"}
            camera={{ position: [0, 0, 5], fov: 75, near: 0.1, far: 1000 }}
            dpr={[1, 1.5]}
            gl={{ antialias: false, powerPreference: "high-performance" }}
          >
            <directionalLight position={[0, 0, 1]} intensity={2.5} />
            <ambientLight intensity={1} />
            <pointLight position={[5, 10, 0]} intensity={2} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />

            <Suspense fallback={<Loader />}>
              <Fox
                currentAnimation={currentAnimation}
                position={[0.5, 0.35, 0]}
                rotation={[12.629, -0.6, 0]}
                scale={[0.5, 0.5, 0.5]}
              />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Contact;
