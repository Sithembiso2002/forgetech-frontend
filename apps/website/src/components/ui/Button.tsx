import { cn } from "@/lib/utils";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "gold";
  href?: string;
  className?: string;
  type?: "button" | "submit";
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export default function Button({
  children,
  variant = "primary",
  href,
  className,
  type = "button",
  onClick,
}: ButtonProps) {
  const baseStyles =
    "inline-block font-semibold py-3 px-8 rounded-md transition-all duration-300 text-center";
  const variants = {
    primary:
      "bg-brand-deep text-white hover:bg-brand-deep/90 shadow-lg hover:shadow-xl",
    outline: "border-2 border-white text-white hover:bg-white/10",
    gold: "bg-brand-gold text-brand-navy hover:bg-brand-orange font-bold",
  };

  const classes = cn(baseStyles, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}