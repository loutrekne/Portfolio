import { getContent } from "@/content";

export function SiteFooter() {
  const { site } = getContent();
  return (
    <footer className="container-site">
      <div className="flex flex-col gap-4 border-t border-border py-10 text-small text-fg-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          {site.name} · {site.role} · {site.location}
        </p>
        <ul className="flex gap-6">
          <li>
            <a
              href={site.contact.linkedin}
              className="hover:text-fg"
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="mark">LinkedIn</span>
            </a>
          </li>
          <li>
            <a href={site.contact.cvHref} className="hover:text-fg">
              <span className="mark">CV</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
