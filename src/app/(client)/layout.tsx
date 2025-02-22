import { ReactNode } from "react";
import Navigation from "../components/ui/Navigation";

export default function FrontendLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Navigation />
      {children}
    </>
  );
}
