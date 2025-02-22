"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignedOut, SignInButton } from "@clerk/nextjs";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header>
      <nav className="container flex flex-row gap-4">
        <Link
          className={`link ${pathname === "/" ? "font-bold underline" : ""}`}
          href="/"
        >
          Home
        </Link>
        <Suspense>
          <SignedOut>
            <SignInButton>
              <button className="py-2 px-4 bg-gray-600 text-white rounded">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </Suspense>
      </nav>
    </header>
  );
}
