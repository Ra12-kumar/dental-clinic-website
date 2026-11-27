// Used only at build time to prerender each page to static HTML.
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App.jsx";

export { pages, getMeta, metaTags, structuredData, breadcrumbData, siteUrl } from "./lib/seo.js";

export const render = (url) => renderToString(<StaticRouter location={url}><App /></StaticRouter>);
