import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { profile } from "../constants";
import { CloseIcon, DownloadIcon, MenuIcon } from "./icons";

const routes = [
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile panel whenever the route changes.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-colors duration-300 ${
        scrolled || open
          ? "bg-paper/85 backdrop-blur-md border-b border-rule"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between sm:px-16 px-6 py-4">
        <NavLink
          to="/"
          className="font-display font-bold tracking-tight text-ink text-lg"
        >
          Laeeq<span className="blue-gradient_text">theDev</span>
        </NavLink>

        {/* Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {routes.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-link ${
                  isActive
                    ? "nav-link-active text-horizon"
                    : "text-ink hover:text-horizon"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <a
            href={profile.resume}
            download
            className="inline-flex items-center gap-2 font-display text-[0.8rem] font-medium px-4 py-2 rounded-full border border-rule bg-white text-ink transition-colors hover:border-horizon hover:text-horizon"
          >
            <DownloadIcon />
            Resume
          </a>
        </nav>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="md:hidden p-2 -mr-2 rounded-lg text-ink"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile panel */}
      <nav
        id="mobile-nav"
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-glide ${
          open ? "max-h-72" : "max-h-0"
        }`}
      >
        <div className="px-6 pb-6 pt-1 flex flex-col gap-1">
          {routes.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `nav-link py-3 border-b border-rule ${
                  isActive ? "text-horizon" : "text-ink"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <a
            href={profile.resume}
            download
            className="nav-link py-3 text-ink inline-flex items-center gap-2"
          >
            <DownloadIcon />
            Download resume
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
