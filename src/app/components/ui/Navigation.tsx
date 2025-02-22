"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header>
      <nav className="py-4 lg:py-8">
        <div className="flex flex-row gap-4 container items-center">
          <Link
            className={`link ${pathname === "/" ? "font-bold" : ""}`}
            href="/"
          >
            AssignMate
          </Link>
          <Link
            className={`link ${
              pathname === "/parents-guide" ? "font-bold" : ""
            }`}
            href="/parents-guide"
          >
            Parent's Guide
          </Link>
          <Suspense>
            <div className="ml-auto">
              <SignedOut>
                <div>
                  <SignInButton>
                    <button className="rounded-md text-white bg-deep-onyx py-1 px-4 hover:bg-ironwood transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                </div>
              </SignedOut>
              <SignedIn>
                <div className="flex flex-row gap-2">
                  <Link
                    className={`link ${
                      pathname === "/dashboard" ? "font-bold" : ""
                    }`}
                    href="/dashboard"
                  >
                    My Dashboard
                  </Link>
                  <div className="size-8 self-center">
                    <UserButton
                      appearance={{
                        elements: {
                          userButtonAvatarBox: {
                            width: "100%",
                            height: "100%",
                          },
                        },
                      }}
                    />
                  </div>
                </div>
              </SignedIn>
            </div>
          </Suspense>
        </div>
      </nav>
    </header>
  );
}
