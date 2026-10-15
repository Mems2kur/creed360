import { cx } from "@/lib/format";

export function Container({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cx("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

/** Eyebrow + heading + optional intro, used at the top of every section. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  dark = false,
  center = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  dark?: boolean;
  center?: boolean;
}) {
  return (
    <div className={cx("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className={cx("mt-3 text-3xl font-semibold sm:text-4xl", dark ? "text-white" : "text-navy")}>{title}</h2>
      {intro && <p className={cx("mt-4 text-lg leading-relaxed", dark ? "text-white/70" : "text-muted")}>{intro}</p>}
    </div>
  );
}

/** Dark banner at the top of inner pages (Properties, Services, Palmora Roots…). */
export function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro?: string; children?: React.ReactNode }) {
  return (
    <section className="bg-contours relative overflow-hidden bg-navy pt-36 pb-20 text-white">
      <Container>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold sm:text-5xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg text-white/70">{intro}</p>}
        {children}
      </Container>
    </section>
  );
}

export function VerifiedBadge({ className }: { className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-1 rounded-full bg-gradient-gold px-2.5 py-1 text-[11px] font-bold tracking-wider text-navy-900", className)}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 12l5 5L20 7" /></svg>
      VERIFIED
    </span>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}
