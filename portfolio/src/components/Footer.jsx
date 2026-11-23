import { profile } from '../data/content';

export default function Footer() {
  return (
    <footer className="border-t border-line/80 py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="font-mono text-xs tracking-wide">
          Software engineering & AI systems · human-in-the-loop by design
        </p>
      </div>
    </footer>
  );
}
