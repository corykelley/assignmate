"use client";

import { Suspense } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navigation() {
  const pathname = usePathname();

  return (
    <header>
      <nav className="py-4 border-b border-slate-500">
        <div className="flex flex-row gap-4 container justify-between items-center">
          <Link
            className={`link ${pathname === "/" ? "font-bold" : ""}`}
            href="/"
          >
            AssignMate
          </Link>
          <Suspense>
            <SignedOut>
              <div>
                <SignInButton>
                  <button className="py-2 px-4 bg-gray-600 text-white rounded">
                    Sign In
                  </button>
                </SignInButton>
              </div>
            </SignedOut>
            <SignedIn>
              <div className="flex flex-row gap-2">
                <Link
                  className={`link ${
                    pathname === "/profile" ? "font-bold" : ""
                  }`}
                  href="/profile"
                >
                  My Profile
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
          </Suspense>
        </div>
      </nav>
    </header>
  );
}
