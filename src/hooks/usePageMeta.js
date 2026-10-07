import { useEffect } from "react";

const SITE = "https://laeeqthedevportfolio.vercel.app";

const set = (selector, attr, value) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

/**
 * Per-route title, description and canonical URL.
 *
 * This is a client-rendered app, so index.html carries one set of tags for
 * every route. Search engines that run JavaScript read the values set here;
 * link previews that do not will fall back to the index.html defaults.
 */
const usePageMeta = ({ title, description, path = "/" }) => {
  useEffect(() => {
    const url = `${SITE}${path}`;

    document.title = title;
    set('meta[name="description"]', "content", description);
    set('link[rel="canonical"]', "href", url);
    set('meta[property="og:title"]', "content", title);
    set('meta[property="og:description"]', "content", description);
    set('meta[property="og:url"]', "content", url);
    set('meta[name="twitter:title"]', "content", title);
    set('meta[name="twitter:description"]', "content", description);
  }, [title, description, path]);
};

export default usePageMeta;
