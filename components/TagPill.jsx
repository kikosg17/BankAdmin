// frontend/components/TagPill.jsx
export default function TagPill({ emoji, label }) {
  return <span className="pill">{emoji ? <span>{emoji}</span> : null}{label}</span>;
}
