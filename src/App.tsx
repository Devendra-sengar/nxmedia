/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { NXLogo, NXLogoMark } from './components/NXLogo';
import { ContactModal } from './components/ContactModal';

// Curated unique assets with NO REPETITIONS
const UNIQUE_IMAGES = {
  heroStudio:
    'https://lh3.googleusercontent.com/aida/AEtjO1V-rokK-704cndqObU1atGAQn1K1YnKa-h8tpDxhGL0T60AXqHU6K08Yq5P5FKdlQ1zhGGHShWfQPt8bU_dGU_950Ng3xqmi6WYCn3Txcotj4YjtpzuGojkCgNg7xFt6yOOeBDrztY8FsbzUkgW7XJZg_Dxbc0Y-1McNDVabD9EVcn1K6yLCUbIVDkMsKjSese5Jz4ONwYBjEpWsg0BqUdWSIvIzd2LUJXGSY_oSU9gj6Eg8aGVDG0D3MU',
  cineRig:
    'https://lh3.googleusercontent.com/aida/AEtjO1WIySZAks-pbbUqYP8cXI4m8N8hQZMNvRy7NGX9iMNMtQpWU2YGjcP5Ij9R4f3pGw-LTfIOghknbdavZPmNh7J6ht_JK6jvsBSQC-r79UJT3Wqi0LDFyjeXY49QxzH74Zg5tGrrW5MnkeOtH23-u4827A9Q2hL37OxUzVIbVCWYbuHveVc4o7zYSU9vAy0EqrTA0Roz0x4XTP40PEQSyORxcudKUzv8viPA62mYdsKG6_fcuUxjfQjZxA',
  tactileBottle:
    'https://lh3.googleusercontent.com/aida/AEtjO1Xle3CkbRbjIuh3oRL1x5wew4sUSr5xolF9_uzep0AQjd6yOq9by8Iu1IprjDD_P1LZVX3U-jPtccEUuWay9h_6EBJiZGQ34XRUEmwG4aDHOzG8RxHqPbr4DOmCEIH8ntw7u4L7yM1uGzhp4Bm6x__y2n_acpgoEn5vcucU7tL5yGbAJUHZmeHl58xH0bHJuH1idNhBjJ9PTxJHJr8F4LDDCQWQjXj1i6kVQGjmaiHuiS5RYtYUs-sA6do',
  smartwatch:
    'https://lh3.googleusercontent.com/aida/AEtjO1Uw8qPTbJRaF5UuWxCzwFP55HCl8MHAGvxLV6qiLSL3IU2drr9zx_0cWOBE0joA4UxK7FCpJwt3idP3GcTCX5im4et7gtz5WgDFtEwKtSfG55pZuqz3Fn7ItJilEBzSz0TMXNCpWdDaHGG8qdts4D1CF11ASaZX6nBSN1OMtGZOiFti37ePybePKPcPFwp97rX3Gu0mfXi6CYatqLCoztK8dO12uCEmE0zBNGLn7M5nzVb3u6KFrRuxTFg',
  editorialFashion:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuAV6aDjsZALA4kn4tKeWGzHbPMOSgu4aSWD-TQFBqARqxGzmI5Uon02MXIVA4WM74v1na4SEo8hGM0nBDkglyrgxi3q6AuKng9CMkNoWOdqpmWS06MRITJQvHw_1CdKzkZACnQ_x932eEGXB7ttRGiQJXAwWZYApRE7huyTOTibytzoqC81Qrob59maFdsaEIU73LO8oZv9-SI7Tc3o5arU9C1UUkfXNVcEErowlXUVPOTEB6_fSbDd',
  luxuryAtelier:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBVa1HE1EbWuk1no3QvgDK_9NM-WHJ7yE5HatVNkeF6aYBKOl2DeIwK_aid3vzMxUwFWZbhntieZwgyJG4ooK6A0eChpnVTfG3Hl-hXqTl7X9MnOTPJ63Ru4jCGpWev49LYwiHApRShXDF4cgpO7-Zgoc2GE-xBkyWk2EJICoghl5z_6I9N9GcP2EMoc4A5HrI9nFJWu0dGJweggJSDInItQ-O5wJVPRwLd1O1ASmUhCtIWB-ACIl3F',
  socialReel:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDRRSLKhHnUGWu3ccpK8hC4UOZNHciggqg1_Z3zzKcKxQYQnWsby4b6rSgoBLGLj_JSJR_WSb6EwUGM4R2MlK--EwUX9EPW_t8H7c4TbpY4_z0sp7l4hBuqUn2z1F6UWBMkT93RBAIWFhQzkZQGSZh0VnQFeXSxIG2e5Q_rPbZ8uroTyxJtWJG-orF3ctRINfrxfM3GZhE6SkiBBLaZYre8YBzJ57-tFOLqkfVVj6_T6F8V9yh7eAk-',
  broadcastFilm:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCBnaV518cwqbYfPJaMz_1tz2nCqypZC2gp_piJICLmPLmpgthSjkl9qWv-EoNFv0V8kxkpjGs49tVC-lbeybwUryH3l4Z8FTcNcQFSELRAoxFvHswd5f8jEHnt9YArs8TP_H5Cqk0D_HRbbHHszJnvpXGhmTMDND-VgT0m3MzQYxfEO4gvHh70WgmkfeSWkr9UBthG0MQ_ZF2fQ0CqN2Lt-fopZeI68bCAL96u3Jmq_G9pwT4IMfaP',
};

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openContact = () => {
    setIsModalOpen(true);
    setMobileMenuOpen(false);
  };

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-950 font-sans antialiased flex flex-col selection:bg-gray-900 selection:text-white">
      {/* ======================================================== */}
      {/* STANDARD TOP HEADER (Desktop & Mobile)                   */}
      {/* ======================================================== */}
      <header className="sticky top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
        <div className="max-w-7xl mx-auto h-16 sm:h-20 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo with User's Official NX Monogram */}
          <div
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <NXLogoMark className="w-8 h-8 sm:w-9 sm:h-9" />
            <div className="flex flex-col">
              <span className="text-base sm:text-lg font-extrabold uppercase tracking-tight text-gray-950 leading-tight">
                NX Media
              </span>
              <span className="text-[10px] uppercase text-gray-500 tracking-wider font-medium leading-none">
                A NexisparkX Group Division
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            <button
              onClick={() => scrollTo('our-work')}
              className="text-xs uppercase tracking-wider font-semibold text-gray-600 hover:text-gray-950 transition-colors cursor-pointer"
            >
              Our Work
            </button>
            <button
              onClick={() => scrollTo('capabilities')}
              className="text-xs uppercase tracking-wider font-semibold text-gray-600 hover:text-gray-950 transition-colors cursor-pointer"
            >
              Capabilities
            </button>
            <button
              onClick={() => scrollTo('ecosystem')}
              className="text-xs uppercase tracking-wider font-semibold text-gray-600 hover:text-gray-950 transition-colors cursor-pointer"
            >
              Brand Ecosystem
            </button>
            <button
              onClick={() => scrollTo('process')}
              className="text-xs uppercase tracking-wider font-semibold text-gray-600 hover:text-gray-950 transition-colors cursor-pointer"
            >
              Process
            </button>
          </nav>

          {/* Action Button: "Contact Us" */}
          <div className="flex items-center gap-3">
            <button
              onClick={openContact}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-gray-950 text-white font-semibold text-xs uppercase tracking-wider hover:bg-gray-800 transition-all duration-150 shadow-xs cursor-pointer active:scale-95"
            >
              Contact Us
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[20px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100 px-4 py-3 flex flex-col gap-2.5 animate-in slide-in-from-top-2 duration-150">
            <button
              onClick={() => scrollTo('our-work')}
              className="text-left py-2 px-3 text-xs uppercase tracking-wider font-semibold text-gray-700 hover:bg-gray-50 rounded cursor-pointer"
            >
              Our Work
            </button>
            <button
              onClick={() => scrollTo('capabilities')}
              className="text-left py-2 px-3 text-xs uppercase tracking-wider font-semibold text-gray-700 hover:bg-gray-50 rounded cursor-pointer"
            >
              Capabilities
            </button>
            <button
              onClick={() => scrollTo('ecosystem')}
              className="text-left py-2 px-3 text-xs uppercase tracking-wider font-semibold text-gray-700 hover:bg-gray-50 rounded cursor-pointer"
            >
              Brand Ecosystem
            </button>
            <button
              onClick={() => scrollTo('process')}
              className="text-left py-2 px-3 text-xs uppercase tracking-wider font-semibold text-gray-700 hover:bg-gray-50 rounded cursor-pointer"
            >
              Process
            </button>
            <button
              onClick={openContact}
              className="text-left py-2 px-3 text-xs uppercase tracking-wider font-bold text-gray-950 hover:bg-gray-50 rounded cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">
        {/* ======================================================== */}
        {/* HERO SECTION                                             */}
        {/* ======================================================== */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 flex flex-col justify-center space-y-4 sm:space-y-5">
              <span className="text-[11px] uppercase tracking-widest text-gray-500 font-bold">
                NexisparkX Creative Arm
              </span>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-950 leading-[1.12]">
                Powering the NexisparkX Group Brand.
              </h1>

              <p className="text-sm sm:text-base text-gray-600 max-w-lg leading-relaxed">
                Creative Content. Stronger Brands. Greater Digital Visibility.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollTo('our-work')}
                  className="px-5 py-2.5 rounded-lg bg-gray-950 text-white font-semibold text-xs uppercase tracking-wider hover:bg-gray-800 transition-colors cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Explore Our Work</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_downward</span>
                </button>
                <button
                  onClick={openContact}
                  className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-900 font-semibold text-xs uppercase tracking-wider hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  Contact Us
                </button>
              </div>

              {/* Minimal Metrics Strip */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100 max-w-md">
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-gray-950">17+</div>
                  <div className="text-[11px] uppercase text-gray-500 font-medium tracking-wider">
                    Ecosystem Brands
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-gray-950">4K+</div>
                  <div className="text-[11px] uppercase text-gray-500 font-medium tracking-wider">
                    Production Hours
                  </div>
                </div>
                <div>
                  <div className="text-xl sm:text-2xl font-extrabold text-gray-950">99.8%</div>
                  <div className="text-[11px] uppercase text-gray-500 font-medium tracking-wider">
                    Reach Precision
                  </div>
                </div>
              </div>
            </div>

            {/* Right Visual (Studio image) */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl overflow-hidden border border-gray-100 shadow-xl bg-gray-50 aspect-[4/3] sm:aspect-[16/10]">
                <img
                  alt="NX Media Creative Agency Studio"
                  className="w-full h-full object-cover"
                  src={UNIQUE_IMAGES.heroStudio}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white p-3 bg-gray-950/50 backdrop-blur-sm rounded-lg border border-white/10">
                  <div className="flex items-center gap-2.5">
                    <NXLogoMark className="w-6 h-6" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide">NX Creative Hub</p>
                      <p className="text-[10px] text-gray-300">
                        Editorial Design &amp; Brand Archival Ops
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-300 font-medium">
                    Studio Floor 04
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 1: THE MEDIA ENGINE BEHIND NEXISPARKX            */}
        {/* ======================================================== */}
        <section className="w-full bg-gray-50 border-y border-gray-100 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-gray-500 font-bold">
                  Engine Architecture
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight mt-1">
                  The Media Engine Behind NexisparkX
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 max-w-md leading-relaxed">
                A dedicated production apparatus deploying cinematography, motion genetics, and programmatic intelligence to position NexisparkX as a market benchmark.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              <div className="lg:col-span-7 rounded-xl overflow-hidden border border-gray-200 bg-white relative aspect-[16/10]">
                <img
                  alt="Cinematic Camera Rig"
                  className="w-full h-full object-cover"
                  src={UNIQUE_IMAGES.cineRig}
                />
                <div className="absolute top-3 left-3 bg-gray-950/80 text-white px-2.5 py-1 rounded text-[10px] uppercase font-semibold backdrop-blur-xs">
                  Live Set // Ultra Motion
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <div
                  onClick={openContact}
                  className="p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer"
                >
                  <h3 className="text-sm font-bold text-gray-950">Brand Identity</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Architecting cohesive design languages, typography guidelines, and digital brand DNA.
                  </p>
                </div>

                <div
                  onClick={openContact}
                  className="p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer"
                >
                  <h3 className="text-sm font-bold text-gray-950">Content Creation</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Editorial journalism, product imagery, and high-engagement digital copywriting.
                  </p>
                </div>

                <div
                  onClick={openContact}
                  className="p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer"
                >
                  <h3 className="text-sm font-bold text-gray-950">Video Production</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Cine-grade commercial capture, studio robotics, and sound architecture.
                  </p>
                </div>

                <div
                  onClick={openContact}
                  className="p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-400 transition-colors cursor-pointer"
                >
                  <h3 className="text-sm font-bold text-gray-950">Digital Marketing &amp; Ads</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Audience retargeting algorithms, performance scaling, and conversion journeys.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 2: CREATIVE WORK THAT BUILDS PRESENCE            */}
        {/* ======================================================== */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16" id="capabilities">
          <div className="flex flex-col gap-8">
            <div className="max-w-xl">
              <span className="text-[11px] uppercase tracking-widest text-gray-500 font-bold">
                Category Disciplines
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight mt-1">
                Creative Work That Builds Digital Presence
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: Luxury Packaging */}
              <div
                onClick={openContact}
                className="flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <div className="h-56 sm:h-64 overflow-hidden bg-gray-100">
                  <img
                    alt="Tactile Design Formulation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={UNIQUE_IMAGES.tactileBottle}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                      Identity &amp; CMF
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-gray-950 mt-1">
                      Materiality &amp; Tactile Design
                    </h3>
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                      Physical-meets-digital aesthetic frameworks created for bespoke portfolio lines.
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-gray-950 inline-flex items-center gap-1 group-hover:underline">
                    <span>Inquire</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </div>
                </div>
              </div>

              {/* Card 2: Smartwatch Campaign */}
              <div
                onClick={openContact}
                className="flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <div className="h-56 sm:h-64 overflow-hidden bg-gray-100">
                  <img
                    alt="Digital Launch Wearable"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={UNIQUE_IMAGES.smartwatch}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                      Global Campaign
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-gray-950 mt-1">
                      Wearable Tech Digital Launch
                    </h3>
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                      Omnichannel social teaser rollouts and high-converting performance placements.
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-gray-950 inline-flex items-center gap-1 group-hover:underline">
                    <span>Inquire</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </div>
                </div>
              </div>

              {/* Card 3: Broadcast Film Production */}
              <div
                onClick={openContact}
                className="flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <div className="h-56 sm:h-64 overflow-hidden bg-gray-100">
                  <img
                    alt="Broadcast Film Sets"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={UNIQUE_IMAGES.broadcastFilm}
                  />
                </div>
                <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold">
                      Film &amp; Audio
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-gray-950 mt-1">
                      Robotic Anamorphic Sets
                    </h3>
                    <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">
                      Motion control robotics ensuring exact repeatability for hero product vignettes.
                    </p>
                  </div>
                  <div className="text-xs font-semibold text-gray-950 inline-flex items-center gap-1 group-hover:underline">
                    <span>Inquire</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 3: IDEAS MADE VISIBLE (CURATED WORKS)            */}
        {/* ======================================================== */}
        <section className="w-full bg-gray-50 border-y border-gray-100 py-12 sm:py-16" id="our-work">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-gray-500 font-bold">
                  Curated Output
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight mt-1">
                  Ideas Made Visible
                </h2>
              </div>
              <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">
                Archival Reel / 2024-2025
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Left Tall Card (Fashion Runway) */}
              <div
                onClick={openContact}
                className="md:col-span-5 flex flex-col gap-2.5 cursor-pointer group"
              >
                <div className="rounded-xl overflow-hidden border border-gray-200 bg-white aspect-[3/4]">
                  <img
                    alt="High fashion editorial runway"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                    src={UNIQUE_IMAGES.editorialFashion}
                  />
                </div>
                <div className="flex justify-between items-baseline pt-1">
                  <div>
                    <h4 className="text-sm font-bold text-gray-950">High Fashion Runway Campaign</h4>
                    <p className="text-xs text-gray-600">Editorial Direction &amp; Lookbook</p>
                  </div>
                  <span className="text-[11px] text-gray-500 uppercase font-bold">#01 / Editorial</span>
                </div>
              </div>

              {/* Right Stacked Cards */}
              <div className="md:col-span-7 flex flex-col gap-6">
                <div
                  onClick={openContact}
                  className="flex flex-col gap-2.5 cursor-pointer group"
                >
                  <div className="rounded-xl overflow-hidden border border-gray-200 bg-white aspect-[16/9]">
                    <img
                      alt="Luxury Packaging Showcase"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      src={UNIQUE_IMAGES.luxuryAtelier}
                    />
                  </div>
                  <div className="flex justify-between items-baseline pt-1">
                    <div>
                      <h4 className="text-sm font-bold text-gray-950">Atelier Luxury Identity</h4>
                      <p className="text-xs text-gray-600">CMF &amp; Identity Architecture</p>
                    </div>
                    <span className="text-[11px] text-gray-500 uppercase font-bold">#02 / Identity</span>
                  </div>
                </div>

                <div
                  onClick={openContact}
                  className="flex flex-col gap-2.5 cursor-pointer group"
                >
                  <div className="rounded-xl overflow-hidden border border-gray-200 bg-white aspect-[16/9]">
                    <img
                      alt="Social Aesthetic Story Launch"
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      src={UNIQUE_IMAGES.socialReel}
                    />
                  </div>
                  <div className="flex justify-between items-baseline pt-1">
                    <div>
                      <h4 className="text-sm font-bold text-gray-950">Aurora Radiance Social Launch</h4>
                      <p className="text-xs text-gray-600">High-converting multi-slide rollout</p>
                    </div>
                    <span className="text-[11px] text-gray-500 uppercase font-bold">#03 / Social</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 4: BRAND ECOSYSTEM                               */}
        {/* ======================================================== */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16" id="ecosystem">
          <div className="flex flex-col gap-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-[11px] uppercase tracking-widest text-gray-500 font-bold">
                NexisparkX Syndicate
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight mt-1">
                One Group. Multiple Brands. One Connected Creative Vision.
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                NX Media stewards the unified graphic language and brand expression across every operative pillar and market venture.
              </p>
            </div>

            {/* Mosaic of Ecosystem Brands */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col justify-between h-28 hover:bg-gray-100 transition-colors">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Core</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-950">NX Tech</h4>
                  <p className="text-[11px] text-gray-500">Cloud Infrastructure</p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col justify-between h-28 hover:bg-gray-100 transition-colors">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Services</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-950">NX Solutions</h4>
                  <p className="text-[11px] text-gray-500">Enterprise Systems</p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col justify-between h-28 hover:bg-gray-100 transition-colors">
                <span className="text-[10px] text-gray-500 font-bold uppercase">R&amp;D</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-950">NX Research</h4>
                  <p className="text-[11px] text-gray-500">Deep Science Lab</p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col justify-between h-28 hover:bg-gray-100 transition-colors">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Synergy</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-950">NX Collab</h4>
                  <p className="text-[11px] text-gray-500">Hybrid Workspace</p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col justify-between h-28 hover:bg-gray-100 transition-colors">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Consumer</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-950">NX Products</h4>
                  <p className="text-[11px] text-gray-500">Hardware Lines</p>
                </div>
              </div>

              {/* FLAGSHIP NX MEDIA WITH OFFICIAL GREEN LOGO MARK */}
              <div className="bg-gray-950 text-white p-4 rounded-xl flex flex-col justify-between h-28 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-gray-300">Flagship</span>
                  <NXLogoMark className="w-5 h-5 bg-white/10 rounded p-0.5" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">NX Media</h4>
                  <p className="text-[11px] text-gray-400">Creative Hub</p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col justify-between h-28 hover:bg-gray-100 transition-colors">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Scaling</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-950">NX Growth</h4>
                  <p className="text-[11px] text-gray-500">Venture Studio</p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col justify-between h-28 hover:bg-gray-100 transition-colors">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Commerce</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-950">FCC</h4>
                  <p className="text-[11px] text-gray-500">Consumer Capital</p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col justify-between h-28 hover:bg-gray-100 transition-colors">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Stay</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-950">NX Stay</h4>
                  <p className="text-[11px] text-gray-500">Boutique Stays</p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col justify-between h-28 hover:bg-gray-100 transition-colors">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Fleet</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-950">NX Rental</h4>
                  <p className="text-[11px] text-gray-500">Fleet Systems</p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col justify-between h-28 hover:bg-gray-100 transition-colors">
                <span className="text-[10px] text-gray-500 font-bold uppercase">Logistics</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-950">NX Track</h4>
                  <p className="text-[11px] text-gray-500">Telemetry Engine</p>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl flex flex-col justify-between h-28 hover:bg-gray-100 transition-colors">
                <span className="text-[10px] text-gray-500 font-bold uppercase">AI</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-950">Infinity AI</h4>
                  <p className="text-[11px] text-gray-500">Cognitive Neural</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 5: 5-STAGE CREATIVE PROCESS                      */}
        {/* ======================================================== */}
        <section className="w-full bg-gray-50 border-y border-gray-100 py-12 sm:py-16" id="process">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
              <div>
                <span className="text-[11px] uppercase tracking-widest text-gray-500 font-bold">
                  Standard of Execution
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight mt-1">
                  From Brief to Visibility
                </h2>
              </div>
              <p className="text-xs text-gray-500">
                A 5-stage discipline guaranteeing cinematic quality on deadline.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="p-5 bg-white rounded-xl border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-gray-400 mb-2">01</div>
                  <h3 className="text-sm font-bold text-gray-950 uppercase">Understand</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Deconstruct product requirements, user sentiment, and core brief objectives.
                  </p>
                </div>
                <span className="text-[10px] font-bold uppercase text-gray-400 pt-4">Discovery</span>
              </div>

              <div className="p-5 bg-white rounded-xl border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-gray-400 mb-2">02</div>
                  <h3 className="text-sm font-bold text-gray-950 uppercase">Strategise</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Map positioning angles, narrative scripts, and performance benchmarks.
                  </p>
                </div>
                <span className="text-[10px] font-bold uppercase text-gray-400 pt-4">Architecture</span>
              </div>

              <div className="p-5 bg-white rounded-xl border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-gray-400 mb-2">03</div>
                  <h3 className="text-sm font-bold text-gray-950 uppercase">Create</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Studio production, cinematography, lighting stages, and graphic direction.
                  </p>
                </div>
                <span className="text-[10px] font-bold uppercase text-gray-400 pt-4">Crafting</span>
              </div>

              <div className="p-5 bg-white rounded-xl border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-gray-400 mb-2">04</div>
                  <h3 className="text-sm font-bold text-gray-950 uppercase">Publish</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Programmatic delivery, native feed deployment, and media buying.
                  </p>
                </div>
                <span className="text-[10px] font-bold uppercase text-gray-400 pt-4">Amplification</span>
              </div>

              <div className="p-5 bg-white rounded-xl border border-gray-200 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-gray-400 mb-2">05</div>
                  <h3 className="text-sm font-bold text-gray-950 uppercase">Analyse</h3>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Granular retention graphs, brand attribution models, and iteration loops.
                  </p>
                </div>
                <span className="text-[10px] font-bold uppercase text-gray-400 pt-4">Optimization</span>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SECTION 6: CONVERSION BANNER (CONTACT US)                */}
        {/* ======================================================== */}
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="w-full bg-gray-950 text-white rounded-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-xl">
            <div className="relative z-10 max-w-2xl flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <NXLogoMark className="w-7 h-7" />
                <span className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">
                  NexisparkX Collaboration
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Building the Next Chapter of NexisparkX
              </h2>

              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Whether you represent an internal operating division, an ecosystem partner, or an enterprise collaborator seeking category leadership—NX Media brings your vision into focus.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={openContact}
                  className="px-6 py-3 rounded-lg bg-white text-gray-950 font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-colors shadow-sm cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Contact Us</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
                <span className="text-xs text-gray-400">
                  contactnexusbox.com
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ======================================================== */}
      {/* PROFESSIONAL FOOTER                                      */}
      {/* ======================================================== */}
      <footer className="w-full bg-white border-t border-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <NXLogoMark className="w-7 h-7" />
              <div>
                <span className="text-base font-extrabold uppercase tracking-tight text-gray-950">
                  NX Media
                </span>
                <p className="text-xs text-gray-500">
                  A NexisparkX Group Division
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:items-end">
              <button
                onClick={openContact}
                className="text-xs text-gray-600 hover:text-gray-950 transition-colors cursor-pointer"
              >
                contactnexusbox.com
              </button>
              <span className="text-[11px] text-gray-400">
                Global Division Operative
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs text-gray-500">
            <span>© 2025 NX Media. NexisparkX Group Division. All rights reserved.</span>
            <span>Proprietary media &amp; brand strategies under NexisparkX holding trusts.</span>
          </div>
        </div>
      </footer>

      {/* Clean 5-Field Contact Modal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
