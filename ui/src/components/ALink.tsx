import Link from "next/link";
export default function ALink({
  href,
  children,
  style,
  className,
}: {
  href: string;
  style?: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} style={style} className={className}>
      {children}
    </Link>
  );
}
