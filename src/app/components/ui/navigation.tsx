"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header>
      <nav>
        <Link
          className={`link ${pathname === "/" ? "font-bold underline" : ""}`}
          href="/"
        >
          Home
        </Link>

        <Link
          className={`link ${
            pathname === "/profile" ? "font-bold underline" : ""
          }`}
          href="/profile"
        >
          Profile
        </Link>
      </nav>
    </header>
  );
}
