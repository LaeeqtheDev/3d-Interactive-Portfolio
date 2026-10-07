import { Link } from "react-router-dom";

import { profile, quickLinks } from "../constants";
import { ArrowUpRight, MailIcon } from "./icons";

const Footer = () => (
  <footer className="site-footer">
    <div className="max-w-5xl mx-auto sm:px-16 px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16">
        <div className="md:max-w-xs">
          <p className="font-display font-bold text-lg tracking-tight">
            {profile.name}
          </p>
          <p className="mt-1 text-sm text-haze">{profile.role}</p>
          <p className="mt-4 text-sm text-haze">
            {profile.location} · {profile.availability}
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="link-out mt-4 inline-flex"
          >
            <MailIcon />
            {profile.email}
          </a>
        </div>

        <div className="flex-1">
          <p className="meta">Elsewhere</p>
          <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
            {quickLinks.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-out"
                >
                  {label}
                  <ArrowUpRight />
                </a>
              </li>
            ))}
            <li>
              <Link to="/contact" className="link-out">
                Send a message
                <ArrowUpRight />
              </Link>
            </li>
            <li>
              <a href={profile.resume} download className="link-out">
                Download resume
                <ArrowUpRight />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-12 pt-6 border-t border-sand-edge flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <p className="meta">
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="meta">Built with React Three Fiber · Vite</p>
      </div>
    </div>
  </footer>
);

export default Footer;
