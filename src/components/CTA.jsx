import { Link } from "react-router-dom";

import { profile } from "../constants";

const CTA = () => (
  <section className="cta">
    <div className="flex-1">
      <p className="cta-text">
        Have something you need built?
      </p>
      <p className="mt-2 text-haze max-md:text-center">
        {profile.availability}. Usually replies within a day.
      </p>
    </div>
    <div className="flex gap-3 max-md:w-full max-md:flex-col">
      <Link to="/contact" className="btn">
        Start a conversation
      </Link>
      <a href={profile.resume} download className="btn-ghost">
        Download resume
      </a>
    </div>
  </section>
);

export default CTA;
