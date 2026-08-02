"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import TopNavbar from "./sections/TopNavbar";
import BottomNavbar from "./sections/BottomNavbar";
import SideNavbar from "../mobilemenu/SideNavbar";
import TopSlidingBar, { type TopSlidingBarService } from "./sections/TopSlidingBar";

interface NavbarProps {
  services?: TopSlidingBarService[];
}

export default function Navbar({ services }: NavbarProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;
    const handleScroll = () => setScrolled(window.scrollY > 0); // <--- triggers immediately
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const mobileMenuIcon = mobileOpen ? <X size={24} /> : <Menu size={24} />;

  return (
    <>
      <TopSlidingBar services={services} />

      {/* Shows TopNavbar ONLY on homepage and before any scroll */}
      {isHome && !scrolled && <TopNavbar />}

      <BottomNavbar
        scrolled={isHome ? scrolled : true}
        mobileMenuIcon={mobileMenuIcon}
        onMobileToggle={() => setMobileOpen(!mobileOpen)}
      />

      <SideNavbar isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}