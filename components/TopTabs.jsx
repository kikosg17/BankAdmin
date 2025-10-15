// frontend/components/TopTabs.jsx
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function TopTabs({ tabs }) {
  const router = useRouter();
  const qTab = (router.query.t || tabs[0]?.key || '').toString();

  const buildHref = (key) => {
    const url = { pathname: router.pathname, query: { ...router.query, t: key } };
    return { pathname: url.pathname, query: url.query };
  };

  return (
    <nav className="header-tabs" role="tablist" aria-label="secondary">
      {tabs.map(t => (
        <Link key={t.key}
          href={buildHref(t.key)}
          className={`tab ${qTab === t.key ? 'active' : ''}`}
          role="tab" aria-selected={qTab === t.key}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
