import type { VercelRequest, VercelResponse } from "@vercel/node";

const paths = ["/", "/about", "/projects", "/achievements", "/media", "/media-kit", "/transparency", "/partnerships", "/partner-brief", "/international-brief", "/contact", "/privacy", "/accessibility"];

export default function sitemap(request: VercelRequest, response: VercelResponse) {
  const forwardedHost = request.headers["x-forwarded-host"];
  const host = (typeof forwardedHost === "string" ? forwardedHost.split(",")[0] : request.headers.host) || "localhost";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = paths.map((path) => `<url><loc>${baseUrl}${path}</loc><lastmod>${lastmod}</lastmod></url>`).join("");
  response.setHeader("Content-Type", "application/xml; charset=utf-8");
  response.setHeader("Cache-Control", "public, max-age=3600, s-maxage=3600");
  response.status(200).send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
}
