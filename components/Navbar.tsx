"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "#contact" },
  // Add dropdowns as needed
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on nav link click or scroll
  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close);
    return () => window.removeEventListener("scroll", close);
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-white shadow-lg h-16"
          : "bg-transparent h-24"
      }`}
    >
      <nav className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full">
        {/* Logo */}
        <div
          className={`flex items-center transition-all duration-300 ease-in-out origin-left ${
            scrolled ? "scale-90" : "scale-110"
          }`}
        >
          <Link href="/">
            <img
              src="/images/logo.png"
              alt="Logo"
              className={`transition-all duration-300 ${
                scrolled ? "h-10" : "h-16"
              }`}
              style={{ maxWidth: scrolled ? 120 : 180 }}
            />
          </Link>
        </div>
        {/* Desktop Nav */}
        <ul className="hidden md:flex flex-1 justify-center space-x-10 font-medium">
          {NAV_LINKS.map((item) => (
            <li key={item.name} className="group relative">
              <Link
                href={item.href}
                className={`transition-colors duration-200 px-1 ${
                  scrolled
                    ? "text-blue-900 hover:text-blue-600"
                    : "text-white hover:text-blue-200"
                }`}
              >
                {item.name}
                <span
                  className={`
                    absolute left-0 -bottom-1 w-full h-0.5 bg-blue-600 scale-x-0 group-hover:scale-x-100
                    transition-transform duration-300 origin-left
                  `}
                />
              </Link>
            </li>
          ))}
        </ul>
        {/* Schedule Consultation Button */}
        <div className="hidden md:flex ml-6">
          <Link
            href="#quote"
            className={`flex items-center gap-2 font-semibold px-6 py-2 rounded-lg shadow transition-colors duration-200 text-lg ${
              scrolled
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white/80 text-blue-700 hover:bg-white"
            }`}
          >
            <MessageCircle className="w-5 h-5" />
            Get a Free Quote
          </Link>
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden z-50 ml-2">
          <button
            aria-label="Open menu"
            className="relative w-10 h-10 flex flex-col justify-center items-center group"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`block absolute h-0.5 w-7 bg-current rounded transition-all duration-300 ease-in-out ${
                menuOpen
                  ? "rotate-45 top-5 bg-blue-700"
                  : scrolled
                  ? "top-3 bg-blue-900"
                  : "top-3 bg-white"
              }`}
            />
            <span
              className={`block absolute h-0.5 w-7 bg-current rounded transition-all duration-300 ease-in-out ${
                menuOpen ? "opacity-0" : scrolled ? "top-5 bg-blue-900" : "top-5 bg-white"
              }`}
            />
            <span
              className={`block absolute h-0.5 w-7 bg-current rounded transition-all duration-300 ease-in-out ${
                menuOpen
                  ? "-rotate-45 top-5 bg-blue-700"
                  : scrolled
                  ? "top-7 bg-blue-900"
                  : "top-7 bg-white"
              }`}
            />
          </button>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="fixed inset-0 bg-black/70 z-40 flex flex-col items-center pt-24 animate-fade-in">
            <div className="bg-white/95 shadow-xl rounded-xl w-11/12 max-w-sm mx-auto flex flex-col items-center py-6">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="py-3 text-lg font-semibold text-blue-900 w-full text-center hover:bg-blue-100 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="#quote"
                className="mt-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow transition-colors duration-200 text-lg"
                onClick={() => setMenuOpen(false)}
              >
                <MessageCircle className="w-5 h-5" />
                Get a Free Quote
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 