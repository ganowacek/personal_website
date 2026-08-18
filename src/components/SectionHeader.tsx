import type { ReactNode } from "react";

type SectionHeaderProps = {
  title: string;
  children?: ReactNode;
};

export function SectionHeader({ title, children }: SectionHeaderProps) {
  return (
    <div className="section-header">
      <h2>{title}</h2>
      {children ? <p className="section-lede">{children}</p> : null}
    </div>
  );
}
