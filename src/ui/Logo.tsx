import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 32, className = "" }: LogoProps) {
  return (
    <span
      className={`relative inline-flex flex-none overflow-hidden rounded-lg ${className}`}
      style={{ width: size, height: size }}
    >
      <Image src="/logo.png" alt="Tudlo" fill sizes={`${size}px`} className="object-cover" />
    </span>
  );
}
