"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { APP_NAME, APP_DESCRIPTION } from "@/lib/constants";
import { useRestaurant } from "@/lib/context/RestaurantContext";

const features = [
  {
    title: "Scan & Order",
    description: "Scan the QR code on your table to browse the menu and place orders instantly.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    title: "Real-Time Updates",
    description: "Track your order status in real-time from kitchen to table.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12M12 6l4 4m-4-4l-4 4m8-7a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
      </svg>
    ),
  },
  {
    title: "Secure Payments",
    description: "Multiple payment options with secure, encrypted transactions.",
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Regular Customer",
    text: "QRder makes dining out so seamless. No waiting for menus or bills!",
    rating: 5,
  },
  {
    name: "Rajesh Kumar",
    role: "Restaurant Owner",
    text: "Our table turnover increased 30% since implementing QRder. Staff love it too.",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "Food Blogger",
    text: "The best QR ordering experience I've had. Beautiful UI, zero friction.",
    rating: 5,
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Scan QR Code",
    description: "Open your camera and scan the QR code on your table. No app to download.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.583-.94 1.128-.94h2.524c.545 0 1.038.398 1.127.94l.213 1.281c.063.374.313.686.645.87.095.052.184.113.28.18.299.199.641.34 1.01.34h2.514c.37 0 .71.14 1.008.338.355.23.634.524.845.855.2.31.308.65.308 1.021l.21 1.285c.031.194.147.361.33.458.454.232.957.31 1.439.159a5.025 5.025 0 002.153-2.153c-.159-.482-.08-1.005.16-1.459.184-.184.35-.3.457-.33l1.28-.21c.195-.03.534-.128 1.02-.31.31-.2.65-.308.97-.308h2.524c.545 0 1.038.398 1.127.94l.213 1.281c.031.194.147.36.33.457.481.232 1.004.153 1.46-.158.232-.184.3-.523.3-.855 0-.369-.14-.709-.338-1.008l-.21-1.281c-.09-.542-.583-.94-1.127-.94h-2.524c-.545 0-1.038.398-1.127.94l-.213 1.281c-.03.194-.148.36-.33.457-.482.232-1.005.153-1.46.158-.232.184-.3.522-.3.855 0 .369.14.71.338 1.008l.21 1.281c.09.542.583.94 1.127.94h2.524c.546 0 1.038-.398 1.127-.94l.213-1.281c.063-.374.313-.686.645-.87.095-.052.184-.113.28-.18.299-.199.641-.34 1.01-.34h2.514c.37 0 .71-.14 1.008-.338.355-.23.634-.524.845-.855.2-.31.308-.65.308-1.021l.21-1.285c.031-.194-.147-.36-.33-.458-.454-.232-.957-.31-1.439-.159a5.025 5.025 0 00-2.153 2.153c.159.482.08 1.005-.16 1.459-.184.184-.35.3-.457.33l-1.28.21c-.195.03-.534.129-1.02.31-.31.2-.65.308-.97.308h-2.524c-.545 0-1.038-.398-1.127-.94l-.213-1.281c-.063-.374-.313-.686-.645-.87-.095-.052-.184-.113-.28-.18a7.51 7.51 0 00-1.01-.34h-2.514c-.37 0-.71.14-1.008.338-.355.23-.634.524-.845.855-.2.31-.308.65-.308 1.021l-.21 1.285c-.03.194-.147.361-.33.457-.455.232-1.005.31-1.439.159a5.025 5.025 0 01-2.153-2.153c.159-.482.08-1.005-.16-1.459-.184-.184-.35-.3-.458-.33l-1.28-.21c-.195-.03-.534-.128-1.02-.31a8.013 8.013 0 01-.97-.308H7.204c-.545 0-1.038-.398-1.127-.94L5.864 5.22z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    step: "02",
    title: "Browse & Order",
    description: "Explore the menu with photos, filter by category, customize your order, and add special instructions.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
  },
  {
    step: "03",
    title: "Enjoy Your Meal",
    description: "Track your order in real-time. Pay securely from your phone when you're done.",
    icon: (
      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  },
];

export default function LandingPage() {
  const router = useRouter();
  const { restaurantCode } = useRestaurant();
  const [scrolled, setScrolled] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [particles, setParticles] = useState<Array<{id: number; x: number; y: number; delay: number; duration: number; color: string; size: number}>>([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Mouse move parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 10,
      color: Math.random() > 0.5 ? "#b49772" : "#9a7f5c",
      size: Math.random() * 3 + 2,
    }));
    setParticles(newParticles);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  // If coming from QR code scan, redirect to menu
  useEffect(() => {
    if (restaurantCode) {
      router.push("/menu");
    }
  }, [restaurantCode, router]);

  const handleLoginClick = () => {
    router.push("/login");
  };

  const magneticRef = useRef<HTMLAnchorElement>(null);
  const magneticButtonRef = useRef<HTMLAnchorElement>(null);

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden relative">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 particle-container" aria-hidden="true" style={{ transform: `translate(${(mousePos.x - 50) * 0.02}%, ${(mousePos.y - 50) * 0.02}%)` }}>
        {particles.map((p) => (
          <div
            key={p.id}
            className="particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              backgroundColor: p.color,
              opacity: 0.3 + Math.random() * 0.3,
            }}
          />
        ))}
      </div>

      {/* Floating gradient orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand/10 rounded-full blur-3xl animate-blob animate-gradient-shift" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl animate-blob animate-gradient-shift animation-delay-2000" style={{ animationDirection: "reverse" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/5 rounded-full blur-3xl animate-rotate-slow" />
        <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-gold/5 rounded-full blur-3xl animate-blob animation-delay-4000" />
      </div>

      {/* Navigation */}
      <nav className={`relative z-10 transition-all duration-300 ${scrolled ? "bg-card/90 backdrop-blur-md shadow-sm" : "bg-transparent"}`}>
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2" aria-label="QRder Home">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand animate-scale-pulse hover:animate-wiggle transition-all duration-300">
                <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
              </div>
              <span className="font-serif text-xl font-bold text-dark hidden sm:block">{APP_NAME}</span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="#features" className="text-sm font-medium text-muted transition-colors hover:text-brand relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full">Features</Link>
              <Link href="#how-it-works" className="text-sm font-medium text-muted transition-colors hover:text-brand relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full">How It Works</Link>
              <Link href="#testimonials" className="text-sm font-medium text-muted transition-colors hover:text-brand relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full">Reviews</Link>
              <Link href="#faq" className="text-sm font-medium text-muted transition-colors hover:text-brand relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full">FAQ</Link>
            </div>

            {/* Login Button */}
            <div className="flex items-center gap-4">
              <Link
                ref={magneticRef}
                href="/login"
                className="hidden sm:block text-sm font-semibold text-brand hover:underline transition-colors magnetic-btn"
                onClick={handleLoginClick}
              >
                Login
              </Link>
              <Link
                ref={magneticButtonRef}
                href="/login"
                onClick={handleLoginClick}
                className="relative overflow-hidden rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-brand-dark hover:shadow-md active:scale-[0.98] magnetic-btn card-shine"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] transition-transform duration-600 hover:translate-x-[100%]" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <div className="text-center lg:text-left stagger-children">
              <div className={`inline-flex items-center gap-2 rounded-full bg-brand/10 px-4 py-1.5 text-sm font-medium text-brand mb-6 ${animated ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "100ms" }}>
                <span className="relative flex h-2 w-2">
                  <span className="absolute inset-0 h-full w-full rounded-full bg-brand animate-ping" />
                  <span className="relative h-full w-full rounded-full bg-brand animate-pulse-ring" />
                </span>
                New: AI-powered menu recommendations
              </div>

              <h1 className={`font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-dark leading-tight mb-6 ${animated ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "200ms" }}>
                Order. <span className="text-brand">Dine.</span> Delight.
              </h1>

              <p className={`text-lg sm:text-xl text-muted max-w-lg mx-auto lg:mx-0 mb-8 ${animated ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "300ms" }}>
                {APP_DESCRIPTION} <span className="font-medium text-dark animate-float" style={{ animationDelay: "2s", animationDuration: "3s" }}>Scan the QR code on your table,</span> browse the menu, and pay from your phone. No app download required.
              </p>

              <div className={`flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 ${animated ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "400ms" }}>
                <Link
                  href="/login"
                  onClick={handleLoginClick}
                  className="relative overflow-hidden w-full sm:w-auto rounded-full bg-brand px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:bg-brand-dark hover:shadow-xl active:scale-[0.98] magnetic-btn card-shine"
                >
                  <span className="relative z-10">Start Ordering</span>
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] transition-transform duration-600 hover:translate-x-[100%]" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="relative overflow-hidden w-full sm:w-auto rounded-full border-2 border-cream-dark bg-card px-8 py-4 text-base font-semibold text-dark transition-all hover:border-brand hover:bg-cream hover:text-brand magnetic-btn card-shine"
                >
                  <span className="relative z-10">See How It Works</span>
                  <div className="absolute inset-0 bg-brand/10 translate-x-[-100%] transition-transform duration-600 hover:translate-x-[100%]" />
                </Link>
              </div>

              {/* Trust indicators */}
              <div className={`mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-8 text-sm text-muted ${animated ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "500ms" }}>
                <div className="flex items-center gap-2 hover:scale-105 transition-transform">
                  <svg className="h-5 w-5 text-green-500 animate-scale-pulse" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  No app download
                </div>
                <div className="flex items-center gap-2 hover:scale-105 transition-transform">
                  <svg className="h-5 w-5 text-green-500 animate-scale-pulse" style={{ animationDelay: "200ms" }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Works on any phone
                </div>
                <div className="flex items-center gap-2 hover:scale-105 transition-transform">
                  <svg className="h-5 w-5 text-green-500 animate-scale-pulse" style={{ animationDelay: "400ms" }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  Secure payments
                </div>
              </div>
            </div>

            {/* Right: Phone Mockup */}
            <div className={`relative ${animated ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "300ms" }}>
              <div className="relative mx-auto max-w-xs">
                {/* Floating stat cards */}
                <div className="absolute -top-4 -right-4 w-48 h-48 bg-card/80 backdrop-blur-md rounded-2xl shadow-xl border border-cream-dark p-4 animate-float hover-lift card-shine" style={{ animationDelay: "1000ms" }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-brand/10 flex items-center justify-center animate-scale-pulse">
                      <svg className="h-5 w-5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-dark text-sm">Truffle Risotto</p>
                      <p className="text-brand font-bold">₹420</p>
                    </div>
                  </div>
                  <div className="h-8 bg-cream rounded-xl animate-shimmer" />
                </div>

                <div className="absolute -bottom-6 -left-6 w-44 h-44 bg-card/80 backdrop-blur-md rounded-2xl shadow-xl border border-cream-dark p-4 animate-float hover-lift card-shine" style={{ animationDelay: "1500ms" }}>
                  <div className="flex items-center gap-2 text-center h-full">
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="font-semibold text-dark text-sm animate-text-reveal">4.9</p>
                      <p className="text-muted text-xs">Avg Rating</p>
                    </div>
                    <div className="w-px h-10 bg-cream-dark mx-2" />
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="font-semibold text-dark text-sm animate-text-reveal" style={{ animationDelay: "200ms" }}>50K+</p>
                      <p className="text-muted text-xs">Orders</p>
                    </div>
                    <div className="w-px h-10 bg-cream-dark mx-2" />
                    <div className="flex-1 flex flex-col justify-center">
                      <p className="font-semibold text-dark text-sm animate-text-reveal" style={{ animationDelay: "400ms" }}>200+</p>
                      <p className="text-muted text-xs">Restaurants</p>
                    </div>
                  </div>
                </div>

                {/* Phone frame */}
                <div className="relative aspect-[9/19.5] max-w-xs mx-auto">
                  <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-slate-800 via-slate-900 to-slate-800 shadow-2xl ring-4 ring-slate-700 ring-offset-2 ring-offset-cream animate-rotate-slow" style={{ animationDuration: "30s" }}>
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-1.5 bg-slate-700 rounded-full" />
                    {/* Screen content */}
                    <div className="absolute inset-4 rounded-[32px] bg-gradient-to-br from-cream via-cream to-cream-dark overflow-hidden p-6 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted">
                          <div className="h-6 w-6 rounded-full bg-brand/20 flex items-center justify-center animate-pulse-ring">
                            <svg className="h-3.5 w-3.5 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9 3.75h.008v.008H12v-.008z" />
                            </svg>
                          </div>
                          <span>Table 12</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                          <span className="text-yellow-400">★</span>
                          <span className="font-semibold text-dark">4.8</span>
                        </div>
                      </div>

                      <div className="flex-1 space-y-3 pr-2">
                        {[
                          { name: "Truffle Risotto", price: "₹420", veg: true },
                          { name: "Herb Crusted Salmon", price: "₹380", veg: false },
                          { name: "Chocolate Lava Cake", price: "₹280", veg: true },
                          { name: "Butter Garlic Prawns", price: "₹240", veg: false },
                        ].map((item, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-3 p-3 bg-white/50 rounded-2xl backdrop-blur-sm animate-slide-in-right hover-lift card-shine"
                            style={{ animationDelay: `${400 + i * 100}ms` }}
                          >
                            <div className="h-14 w-14 rounded-xl bg-cream flex items-center justify-center flex-shrink-0 img-zoom">
                              <svg className="h-7 w-7 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0012 7.5a8.967 8.967 0 000-1.458z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.338 12.033a12.094 12.094 0 01-.377 2.9a.75.75 0 01-1.102-.258c-.434-.912-.98-1.754-1.664-2.51a.75.75 0 11.688-1.39c.762.856 1.431 1.824 2.078 2.868a.75.75 0 01-.259 1.103z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4.662 12.033a12.094 12.094 0 00.377 2.9.75.75 0 001.102-.258c.434-.912.98-1.754 1.664-2.51.35-.788.577-1.616.577-2.478 0-.863-.227-1.689-.577-2.477a.75.75 0 10-1.376.516c.26.738.481 1.467.481 2.224 0 .756-.221 1.485-.481 2.224a.75.75 0 00.258 1.283z" />
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-dark truncate">{item.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="font-semibold text-brand text-sm">{item.price}</span>
                                {item.veg && (
                                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-green-100 animate-scale-pulse" style={{ animationDelay: `${i * 200}ms` }}>
                                    <svg className="h-2.5 w-2.5 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                  </span>
                                )}
                              </div>
                              <button className="flex h-8 w-8 items-center justify-center rounded-full bg-brand/10 text-brand hover:bg-brand/20 transition-colors hover:scale-110">
                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Cart bar */}
                      <div className="mt-4 p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-cream-dark animate-slide-in-up hover-lift" style={{ animationDelay: "1000ms" }}>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted">Your Cart</p>
                            <p className="font-bold text-dark">3 items • ₹1,320</p>
                          </div>
                          <button className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark hover:scale-105">
                            Checkout
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Camera notch - inside rotating frame */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 mt-2 w-20 h-3 bg-slate-900 rounded-b-xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-4 sm:py-28 scroll-reveal">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16 stagger-children">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-4">
              Everything you need for <span className="text-brand bg-gradient-to-r from-brand via-gold to-brand bg-clip-text text-transparent animate-gradient-shift">seamless dining</span>
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Built for modern restaurants and hungry customers alike.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <article
                key={feature.title}
                className="group p-8 bg-card rounded-3xl border border-cream-dark shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-brand/30 hover:-translate-y-1 hover-lift scroll-reveal card-shine"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-all duration-300 group-hover:rotate-6 group-hover:scale-110">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-xl font-bold text-dark mb-3">{feature.title}</h3>
                <p className="text-muted leading-relaxed">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-20 px-4 sm:py-28 bg-cream-dark/30 scroll-reveal">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16 stagger-children">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-4">
              How it works in <span className="text-brand">3 simple steps</span>
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              From scanning to savoring in seconds.
            </p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-8">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-16 left-1/2 -translate-x-1/2 w-full h-16 pointer-events-none overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 800 64" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#b49772" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#b49772" stopOpacity="1" />
                    <stop offset="100%" stopColor="#b49772" stopOpacity="0.3" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,32 C200,32 200,32 400,32 C600,32 600,32 800,32"
                  stroke="url(#lineGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="10,10"
                  strokeDashoffset="0"
                >
                  <animate attributeName="strokeDashoffset" from="100" to="0" dur="3s" repeatCount="indefinite" />
                </path>
              </svg>
            </div>

            {howItWorks.map((item, i) => (
              <div
                key={item.step}
                className="group relative flex flex-col items-center text-center p-8 bg-card rounded-3xl border border-cream-dark scroll-reveal shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-brand/30 hover:-translate-y-1 hover-lift card-shine"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand group-hover:bg-brand group-hover:text-white transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">
                  {item.icon}
                </div>
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-serif text-3xl font-bold text-brand/20">{item.step}</span>
                  <h3 className="font-serif text-xl font-bold text-dark">{item.title}</h3>
                </div>
                <p className="text-muted max-w-xs">{item.description}</p>
                {i < 2 && (
                  <div className="absolute top-16 right-[-40px] w-8 h-8 border-2 border-brand/20 rounded-full flex items-center justify-center hidden md:block animate-pulse-ring">
                    <svg className="h-5 w-5 text-brand/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-20 px-4 sm:py-28 scroll-reveal">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16 stagger-children">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-dark mb-4">
              Loved by <span className="text-brand">diners & restaurants</span>
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Don't just take our word for it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <article
                key={testimonial.name}
                className="p-8 bg-card rounded-3xl border border-cream-dark shadow-sm transition-all duration-500 hover:shadow-2xl hover:border-brand/30 hover:-translate-y-1 hover-lift scroll-reveal card-shine"
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <svg
                      key={j}
                      className="h-5 w-5 text-yellow-400 fill-current animate-scale-pulse"
                      style={{ animationDelay: `${j * 100}ms` }}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-dark mb-6 leading-relaxed relative">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-brand/20 flex items-center justify-center text-brand font-semibold animate-float">
                    {testimonial.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <p className="font-semibold text-dark">{testimonial.name}</p>
                    <p className="text-sm text-muted">{testimonial.role}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-4 sm:py-28 scroll-reveal">
        <div className="mx-auto max-w-4xl text-center">
          <div className="relative rounded-4xl bg-gradient-to-br from-brand via-brand-dark to-gold p-12 sm:p-16 overflow-hidden card-shine">
            <div className="absolute inset-0 bg-[url(/BPbg.webp)] bg-center bg-cover opacity-10 animate-rotate-slow" style={{ animationDuration: "60s" }} />
            <div className="absolute inset-0 bg-gradient-to-br from-brand/20 via-transparent to-transparent" />
            <div className="relative z-10 stagger-children">
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to transform your <span className="text-yellow-200">dining experience</span>?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of restaurants and diners who've already made the switch to QRder.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/login"
                  onClick={handleLoginClick}
                  className="relative overflow-hidden w-full sm:w-auto rounded-full bg-white px-8 py-4 text-base font-semibold text-brand shadow-lg transition-all hover:bg-white/90 hover:shadow-xl active:scale-[0.98] magnetic-btn card-shine"
                >
                  <span className="relative z-10">Get Started Free</span>
                  <div className="absolute inset-0 bg-brand/20 translate-x-[-100%] transition-transform duration-600 hover:translate-x-[100%]" />
                </Link>
                <Link
                  href="#contact"
                  className="relative overflow-hidden w-full sm:w-auto rounded-full border-2 border-white/30 bg-transparent px-8 py-4 text-base font-semibold text-white transition-all hover:bg-white/10 magnetic-btn card-shine"
                >
                  <span className="relative z-10">Contact Sales</span>
                  <div className="absolute inset-0 bg-white/10 translate-x-[-100%] transition-transform duration-600 hover:translate-x-[100%]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="relative z-10 bg-cream py-16 px-4 sm:py-24 scroll-reveal">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-6" aria-label="QRder Home">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand animate-scale-pulse hover:animate-wiggle transition-all duration-300">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9 3.75h.008v.008H12v-.008z" />
                  </svg>
                </div>
                <span className="font-serif text-2xl font-bold text-dark">{APP_NAME}</span>
              </Link>
              <p className="text-muted max-w-sm mb-6">
                {APP_DESCRIPTION} Scan, order, and enjoy — all from your phone.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-muted hover:text-brand transition-colors hover:scale-110" aria-label="Twitter">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </a>
                <a href="#" className="text-muted hover:text-brand transition-colors hover:scale-110" aria-label="LinkedIn">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="#" className="text-muted hover:text-brand transition-colors hover:scale-110" aria-label="Instagram">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-dark mb-4">Product</h4>
              <ul className="space-y-2 text-muted">
                <li><a href="#features" className="hover:text-brand transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-brand transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full">How It Works</a></li>
                <li><a href="#" className="hover:text-brand transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full">Pricing</a></li>
                <li><a href="#" className="hover:text-brand transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full">Integrations</a></li>
                <li><a href="#" className="hover:text-brand transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full">API Docs</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-dark mb-4">Company</h4>
              <ul className="space-y-2 text-muted">
                <li><a href="#" className="hover:text-brand transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full">About</a></li>
                <li><a href="#" className="hover:text-brand transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full">Blog</a></li>
                <li><a href="#" className="hover:text-brand transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full">Careers</a></li>
                <li><a href="#" className="hover:text-brand transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full">Press</a></li>
                <li><a href="#" className="hover:text-brand transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full">Contact</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-dark mb-4">Legal</h4>
              <ul className="space-y-2 text-muted">
                <li><a href="#" className="hover:text-brand transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-brand transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full">Terms of Service</a></li>
                <li><a href="#" className="hover:text-brand transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-brand transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-brand after:transition-all hover:after:w-full">Security</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-cream-dark flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted text-sm">
              © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted">
              <span className="animate-float">Made with ❤️ for restaurants everywhere</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}