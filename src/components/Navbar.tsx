"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "@/components/toggle-switch";
import { Button } from "./ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Post", href: "/post" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="w-[1600px] mx-auto py-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-4xl">
          <Link href={"/"}>Logo</Link>
        </h1>
        <ul className="flex gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  pathname === link.href
                    ? "text-2xl"
                    : "text-2xl text-slate-400"
                }
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex gap-4 ">
          <ModeToggle />
          <Button variant={'default'}>
            <Link href={"/register"}>Register</Link>
          </Button>
        </div>
      </nav>
    </header>
  );
}
