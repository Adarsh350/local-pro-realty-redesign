"use client";

import { FormEvent, type MouseEvent, useEffect, useRef, useState } from "react";
import { blogArticles } from "./blog-data";

const featuredAreas = [
  {
    city: "Dallas",
    image: "/images/areas/area-dallas.png",
    note: "Dallas Real Estate",
    stats: [
      ["Avg", "$786K"],
      ["Median", "$475K"],
      ["Listings", "5.4K"],
      ["Population", "1.30M"],
    ],
  },
  {
    city: "Frisco",
    image: "/images/areas/area-frisco.png",
    note: "Frisco Real Estate",
    stats: [
      ["Avg", "$842K"],
      ["Median", "$699K"],
      ["Listings", "721"],
      ["Population", "236K"],
    ],
  },
  {
    city: "Flower Mound",
    image: "/images/areas/area-flower-mound.png",
    note: "Flower Mound Real Estate",
    stats: [
      ["Avg", "$819K"],
      ["Median", "$665K"],
      ["Listings", "186"],
      ["Population", "81K"],
    ],
  },
  {
    city: "Denton",
    image: "/images/areas/area-denton.png",
    note: "Denton Real Estate",
    stats: [
      ["Avg", "$471K"],
      ["Median", "$405K"],
      ["Listings", "491"],
      ["Population", "160K"],
    ],
  },
  {
    city: "Fort Worth",
    image: "/images/areas/area-fort-worth.png",
    note: "Fort Worth Real Estate",
    stats: [
      ["Avg", "$466K"],
      ["Median", "$350K"],
      ["Listings", "3.9K"],
      ["Population", "978K"],
    ],
  },
  {
    city: "Rockwall",
    image: "/images/areas/area-rockwall.png",
    note: "Rockwall Real Estate",
    stats: [
      ["Avg", "$648K"],
      ["Median", "$515K"],
      ["Listings", "202"],
      ["Population", "51K"],
    ],
  },
  {
    city: "Prosper",
    image: "/images/areas/area-prosper.png",
    note: "Prosper Real Estate",
    stats: [
      ["Avg", "$1.05M"],
      ["Median", "$899K"],
      ["Listings", "263"],
      ["Population", "45K"],
    ],
  },
  {
    city: "Odessa",
    image: "/images/areas/area-odessa.png",
    note: "Odessa Real Estate",
    stats: [
      ["Avg", "$324K"],
      ["Median", "$285K"],
      ["Listings", "557"],
      ["Population", "112K"],
    ],
  },
  {
    city: "Midland",
    image: "/images/areas/area-midland.png",
    note: "Midland Real Estate",
    stats: [
      ["Avg", "$422K"],
      ["Median", "$350K"],
      ["Listings", "603"],
      ["Population", "132K"],
    ],
  },
];

const fanPositions = [
  { rot: -18, scale: 0.74, x: -450, y: 38, zIndex: 1 },
  { rot: -12, scale: 0.82, x: -300, y: 22, zIndex: 2 },
  { rot: -6, scale: 0.92, x: -150, y: 8, zIndex: 3 },
  { rot: 0, scale: 1, x: 0, y: 0, zIndex: 8 },
  { rot: 6, scale: 0.92, x: 150, y: 8, zIndex: 3 },
  { rot: 12, scale: 0.82, x: 300, y: 22, zIndex: 2 },
  { rot: 18, scale: 0.74, x: 450, y: 38, zIndex: 1 },
];

const visibleAreaSlots = 7;
const centerSlot = 3;

const intentSlides = [
  {
    id: "buy",
    label: "Buy",
    image: "/images/market-neighborhood.png",
    eyebrow: "Search homes",
    title: "Find Your Dream Home with LocalPRO Realty.",
    body: "Search by city, county, subdivision, school district, or property address.",
    placeholder: "City, county, subdivision, school district...",
  },
  {
    id: "sell",
    label: "Sell",
    image: "/images/intent-sell.png",
    eyebrow: "Sell my home",
    title: "Award-winning support, industry-leading marketing, and proven systems.",
    body: "LocalPRO gives sellers a focused path from pricing and presentation to a stronger market launch.",
    placeholder: "Property address or neighborhood...",
  },
  {
    id: "valuation",
    label: "Valuation",
    image: "/images/intent-valuation.png",
    eyebrow: "What's my home worth?",
    title: "Get Your Home Valuation Report For Free.",
    body: "Find your home's value in today's market.",
    placeholder: "Enter your home address...",
  },
];

const localProUrl = "https://localprorealty.com";

const footerLinkGroups = [
  {
    title: "Search",
    links: [
      ["All Listings", `${localProUrl}/listing`],
      ["Featured Listings", `${localProUrl}/featured-listings`],
      ["Mortgage Calculator", `${localProUrl}/mortgage-calculator`],
    ],
  },
  {
    title: "Sell",
    links: [
      ["Sell My Home", `${localProUrl}/sell`],
      ["Home Valuation", `${localProUrl}/evaluation`],
    ],
  },
  {
    title: "Company",
    links: [
      ["About Us", `${localProUrl}/about`],
      ["Team", `${localProUrl}/realtors`],
      ["Contact", `${localProUrl}/contact`],
      ["Commercial", "https://localprorealestate.com"],
    ],
  },
];

const footerMarkets = [
  "Arlington",
  "Carrollton",
  "Dallas",
  "Denton",
  "Fort Worth",
  "Frisco",
  "Grapevine",
  "Grand Prairie",
  "Irving",
  "Plano",
  "McKinney",
  "Odessa",
  "Prosper",
  "Richardson",
  "Rockwall",
  "Trophy Club",
  "Midland",
  "Wylie",
];

function cityListingHref(city: string) {
  const condition = encodeURIComponent(JSON.stringify({ location: { city: [`${city}, TX`] } }));
  const zoom = city === "Dallas" ? 10 : 11;
  return `${localProUrl}/listing?condition=${condition}&page=1&uiConfig=%7B%7D&zoom=${zoom}`;
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function easeOut(value: number) {
  return 1 - Math.pow(1 - value, 3);
}

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

type HeroIntent = "buy" | "sell" | "valuation";

type NavItem = {
  label: string;
  href: string;
  intent?: HeroIntent;
  heroProgress?: number;
};

const navItems: NavItem[] = [
  { label: "Home", href: "#top" },
  { label: "Buy", href: "#buy", intent: "buy" },
  { label: "Sell", href: "#sell", intent: "sell", heroProgress: 0.64 },
  { label: "Valuation", href: "#valuation", intent: "valuation", heroProgress: 0.9 },
  { label: "Markets", href: "#markets" },
  { label: "About", href: "#about" },
  { label: "News", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

function scrollToTarget(top: number) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
}

function ShellNav() {
  const [solid, setSolid] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);
  const activeIntentRef = useRef<HeroIntent>("buy");

  function activateHeroIntent(id: HeroIntent) {
    if (activeIntentRef.current !== id) {
      activeIntentRef.current = id;
      window.dispatchEvent(new CustomEvent("localpro:intent", { detail: { id } }));
    }

    setActiveSection(id);
  }

  useEffect(() => {
    const onScroll = () => {
      setSolid(window.scrollY > window.innerHeight * 0.72);

      const hero = document.querySelector<HTMLElement>(".hero-scroll");
      if (hero && window.scrollY < hero.offsetTop + hero.offsetHeight - window.innerHeight * 0.28) {
        const range = Math.max(hero.offsetHeight - window.innerHeight, 1);
        const progress = Math.min(Math.max((window.scrollY - hero.offsetTop) / range, 0), 1);

        if (progress < 0.14) {
          setActiveSection("top");
        } else if (progress < 0.5) {
          activateHeroIntent("buy");
        } else if (progress < 0.8) {
          activateHeroIntent("sell");
        } else {
          activateHeroIntent("valuation");
        }

        return;
      }

      const sections = [
        ["markets", "markets"],
        ["about", "about"],
        ["blog", "blog"],
        ["contact", "contact"],
      ] as const;

      const current = sections
        .map(([id, key]) => {
          const element = document.getElementById(id);
          return element ? { key, top: Math.abs(element.getBoundingClientRect().top - 104) } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a!.top - b!.top)[0];

      if (current) setActiveSection(current.key);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    return () => document.body.classList.remove("nav-open");
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    const onIntentActive = (event: Event) => {
      const id = (event as CustomEvent<{ id?: string }>).detail?.id;
      if (id !== "buy" && id !== "sell" && id !== "valuation") return;

      activeIntentRef.current = id;

      const hero = document.querySelector<HTMLElement>(".hero-scroll");
      const inHero = hero && window.scrollY < hero.offsetTop + hero.offsetHeight - window.innerHeight * 0.28;
      if (inHero) setActiveSection(id);
    };

    window.addEventListener("localpro:intent-active", onIntentActive);
    return () => window.removeEventListener("localpro:intent-active", onIntentActive);
  }, []);

  function navigate(event: MouseEvent<HTMLAnchorElement>, item: NavItem) {
    event.preventDefault();
    setMenuOpen(false);
    setActiveSection(item.intent ?? item.href.replace("#", ""));

    if (item.href === "#top") {
      scrollToTarget(0);
      window.history.replaceState(null, "", item.href);
      return;
    }

    if (item.intent) {
      activeIntentRef.current = item.intent;
      window.dispatchEvent(new CustomEvent("localpro:intent", { detail: { id: item.intent } }));
      const hero = document.querySelector<HTMLElement>(".hero-scroll");
      if (hero) {
        const range = hero.offsetHeight - window.innerHeight;
        scrollToTarget(hero.offsetTop + Math.max(range, 1) * (item.heroProgress ?? 0.34));
      }
      window.history.replaceState(null, "", item.href);
      return;
    }

    const target = document.querySelector<HTMLElement>(item.href);
    if (!target) return;
    const offset = item.href === "#contact" ? 88 : item.href === "#markets" ? 112 : 82;
    scrollToTarget(window.scrollY + target.getBoundingClientRect().top - offset);
    window.history.replaceState(null, "", item.href);
  }

  return (
    <>
      <header className={`topbar ${solid ? "topbar--solid" : ""} ${menuOpen ? "topbar--menu-open" : ""}`}>
        <a href="#top" className="brand" aria-label="LocalPRO Realty home" onClick={(event) => navigate(event, navItems[0])}>
          <img src="/images/localpro-logo-transparent.png" alt="LocalPRO Realty" />
        </a>
        <nav aria-label="Primary navigation">
          {navItems.map((item) => {
            const key = item.intent ?? item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                className={activeSection === key ? "is-active" : ""}
                onClick={(event) => navigate(event, item)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
        <a
          className="topbar__action"
          href="#contact"
          onClick={(event) => navigate(event, { label: "Contact", href: "#contact" })}
        >
          <span className="topbar__action-desktop">Talk to a PRO</span>
          <span className="topbar__action-mobile">Contact Us</span>
        </a>
        <button
          className="topbar__menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`} id="mobile-navigation" aria-hidden={!menuOpen}>
        <div className="mobile-menu__panel">
          <nav aria-label="Mobile navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={(event) => navigate(event, item)}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="mobile-menu__contact" href="#contact" onClick={(event) => navigate(event, { label: "Contact", href: "#contact" })}>
            Contact Us
          </a>
        </div>
      </div>
    </>
  );
}

function IntentSwitcher() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [motionKey, setMotionKey] = useState(0);
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const active = intentSlides[activeIndex];

  function publishIntent(id: string) {
    if (id === "buy" || id === "sell" || id === "valuation") {
      window.dispatchEvent(new CustomEvent("localpro:intent-active", { detail: { id } }));
    }
  }

  useEffect(() => {
    intentSlides.forEach((slide) => {
      const image = new Image();
      image.src = slide.image;
      image.decode?.().catch(() => undefined);
    });
  }, []);

  useEffect(() => {
    if (previousIndex === null) return;
    const timer = window.setTimeout(() => setPreviousIndex(null), 980);
    return () => window.clearTimeout(timer);
  }, [motionKey, previousIndex]);

  useEffect(() => {
    const onIntent = (event: Event) => {
      const id = (event as CustomEvent<{ id?: string }>).detail?.id;
      const index = intentSlides.findIndex((slide) => slide.id === id);
      if (index < 0) return;
      publishIntent(intentSlides[index].id);

      setActiveIndex((current) => {
        if (current === index) return current;
        setPreviousIndex(current);
        setMotionKey((value) => value + 1);
        setStatus("");
        return index;
      });
    };

    window.addEventListener("localpro:intent", onIntent);
    return () => window.removeEventListener("localpro:intent", onIntent);
  }, []);

  function choose(index: number) {
    if (index === activeIndex) return;
    setPreviousIndex(activeIndex);
    setActiveIndex(index);
    setMotionKey((value) => value + 1);
    setStatus("");
    publishIntent(intentSlides[index].id);
  }

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(
      address.trim()
        ? `${active.label} path prepared for ${address.trim()}.`
        : `${active.label} path selected. Add a location to continue.`
    );
  }

  return (
    <div className="intent-switcher" aria-label="LocalPRO lead paths">
      <div className="intent-bleed">
        {intentSlides.map((slide, index) => (
          <img
            key={slide.id}
            className={[
              "intent-bleed__image",
              index === activeIndex ? "is-active" : "",
              index === previousIndex ? "is-exiting" : "",
              slide.id === "sell" ? "intent-bleed__image--crop" : "",
            ].join(" ")}
            src={slide.image}
            alt=""
            loading="eager"
            decoding="async"
            aria-hidden={index !== activeIndex}
          />
        ))}
        <div className="intent-bleed__shade" />
      </div>

      <div className="intent-controls">
        <div className="intent-tabs" role="tablist" aria-label="Choose a lead intent">
          {intentSlides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={index === activeIndex}
              className={index === activeIndex ? "is-selected" : ""}
              onClick={() => choose(index)}
            >
              {slide.label}
            </button>
          ))}
        </div>
        <form className="intent-address" onSubmit={onSearch}>
          <input
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder={active.placeholder}
            aria-label={`${active.label} location or address`}
          />
          <button type="submit">Search</button>
        </form>
        <div className="intent-copy" key={`${active.id}-${motionKey}`}>
          <span>{active.eyebrow}</span>
          <h3>{active.title}</h3>
          <p>{active.body}</p>
          <small aria-live="polite">{status || "Search by city, county, subdivision, or property address."}</small>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const phaseOneRef = useRef<HTMLDivElement>(null);
  const phaseTwoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    let targetProgress = 0;
    let currentProgress = 0;

    const render = (progress: number) => {
      if (imageRef.current) {
        imageRef.current.style.transform = `translate3d(${progress * -2}%, ${progress * 1.5}%, 0) scale(${1 + progress * 0.3})`;
      }

      if (phaseOneRef.current) {
        const out = easeOut(clamp01((progress - 0.16) / 0.14));
        phaseOneRef.current.style.opacity = `${1 - out}`;
        phaseOneRef.current.style.transform = `translate3d(0, ${-44 * out}px, 0)`;
      }

      if (phaseTwoRef.current) {
        const opacity = easeOut(clamp01((progress - 0.22) / 0.12));
        const move = 1 - easeOut(clamp01((progress - 0.22) / 0.12));
        phaseTwoRef.current.style.opacity = `${opacity}`;
        phaseTwoRef.current.style.transform = `translate3d(0, ${42 * move}px, 0)`;
        phaseTwoRef.current.style.pointerEvents = opacity > 0.12 ? "auto" : "none";
      }
    };

    const animate = () => {
      const delta = targetProgress - currentProgress;
      currentProgress += delta * 0.18;
      if (Math.abs(delta) < 0.0008) currentProgress = targetProgress;

      render(currentProgress);

      if (currentProgress !== targetProgress) {
        frame = requestAnimationFrame(animate);
      } else {
        frame = 0;
      }
    };

    const onScroll = () => {
      if (!wrapperRef.current) return;
      const range = wrapperRef.current.offsetHeight - window.innerHeight;
      targetProgress = clamp01(window.scrollY / Math.max(range, 1));
      if (!frame) frame = requestAnimationFrame(animate);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="hero-scroll" id="top" ref={wrapperRef}>
      <div className="hero-stage">
        <div className="hero-image" ref={imageRef}>
          <img src="/images/hero-residence.png" alt="Premium Texas residence at sunset" />
        </div>
        <div className="hero-vignette" />
        <div className="phase phase-one" ref={phaseOneRef}>
          <h1>
            Local Experts
            <br />
            PRO Results
          </h1>
          <p className="hero-descriptor">
            DFW Real Estate Brokerage, award-winning support, industry-leading marketing, and proven systems.
          </p>
        </div>

        <div className="phase phase-two" ref={phaseTwoRef}>
          <p className="kicker">Buy | Sell | Valuation</p>
          <h2>Everything you'll need along the way.</h2>
          <IntentSwitcher />
        </div>
      </div>
    </section>
  );
}

function useFanMultiplier() {
  const [multiplier, setMultiplier] = useState(1);

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 480) setMultiplier(0.35);
      else if (width < 780) setMultiplier(0.5);
      else if (width < 1100) setMultiplier(0.72);
      else setMultiplier(1);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return multiplier;
}

function Markets() {
  const [centerIndex, setCenterIndex] = useState(0);
  const multiplier = useFanMultiplier();
  const activeArea = featuredAreas[centerIndex];

  function visibleSlot(index: number) {
    const total = featuredAreas.length;
    const distance = (index - centerIndex + total) % total;
    if (distance <= centerSlot) return centerSlot + distance;
    if (distance >= total - centerSlot) return centerSlot - (total - distance);
    return null;
  }

  function cycle(direction: -1 | 1) {
    setCenterIndex((value) => (value + direction + featuredAreas.length) % featuredAreas.length);
  }

  return (
    <section className="area-showcase" id="markets">
      <div className="area-showcase__intro" data-reveal>
        <div>
          <p className="kicker">Featured areas</p>
          <h2>Explore Our Featured Areas</h2>
        </div>
      </div>

      <div className="area-fan" data-reveal>
        <div className="area-fan__stage" aria-label="Featured Texas markets">
          {featuredAreas.map((area, index) => {
            const slot = visibleSlot(index);
            const position = slot === null ? null : fanPositions[slot];
            const active = index === centerIndex;
            const sideClass = active || slot === null ? "" : slot < centerSlot ? " is-left" : " is-right";
            const transform = position
              ? `translate3d(calc(-50% + ${position.x * multiplier}px), calc(-50% + ${position.y * multiplier}px), 0) rotate(${position.rot}deg) scale(${position.scale})`
              : "translate3d(-50%, -50%, 0) scale(0.62)";

            return (
              <button
                className={`area-card ${active ? "is-active" : ""}${sideClass}`}
                key={area.city}
                type="button"
                onClick={() => setCenterIndex(index)}
                style={{
                  opacity: slot === null ? 0 : 1,
                  pointerEvents: slot === null ? "none" : "auto",
                  transform,
                  zIndex: position?.zIndex ?? 0,
                }}
                aria-label={`View ${area.city} market snapshot`}
              >
                <img src={area.image} alt={`${area.city}, Texas city view`} loading="lazy" />
                <span className="area-card__shade" />
                <span className="area-card__content">
                  <span className="area-card__eyebrow">Texas</span>
                  <strong>{area.city}</strong>
                  <span className="area-card__note">{area.note}</span>
                  <span className="area-card__stats">
                    {area.stats.map(([label, value]) => (
                      <span key={label}>
                        <small>{label}</small>
                        <b>{value}</b>
                      </span>
                    ))}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="area-fan__controls">
          <button type="button" onClick={() => cycle(-1)} aria-label="Previous featured area">
            ‹
          </button>
          <span>{activeArea.city}</span>
          <button type="button" onClick={() => cycle(1)} aria-label="Next featured area">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}

function LocalProof() {
  return (
    <section className="local-proof" id="about" aria-labelledby="local-proof-title">
      <div className="local-proof__inner">
        <div className="local-proof__glow" aria-hidden="true" />
        <div className="local-proof__intro" data-reveal>
          <p className="kicker">About</p>
          <h2 id="local-proof-title">Local guidance with a brokerage built for better results.</h2>
          <p>
            LocalPRO Realty pairs neighborhood-level expertise with marketing, technology, and agent support designed
            to make real estate decisions clearer from the first conversation to the closing table.
          </p>
        </div>

        <div className="local-proof__grid" data-reveal>
          <figure className="local-proof__showcase">
            <div className="local-proof__image">
              <img
                src="/images/localpro-door-consultation.png"
                alt="Real estate professional opening the door of a premium Texas home"
                loading="lazy"
              />
              <figcaption className="local-proof__float">
                <b>Local first</b>
                <span>Guidance shaped around the people, streets, and markets we serve.</span>
              </figcaption>
            </div>
            <div className="local-proof__signalbar" aria-label="Local Pro Realty service principles">
              <span>
                <small>How we work</small>
                <b>Clear advice, polished presentation, and steady execution.</b>
              </span>
              <div>
                <span>
                  <b>Local context</b>
                  <small>Market insight grounded in DFW and West Texas neighborhoods.</small>
                </span>
                <span>
                  <b>Modern marketing</b>
                  <small>Professional media, listing strategy, and stronger buyer visibility.</small>
                </span>
                <span>
                  <b>Agent support</b>
                  <small>A brokerage platform built to help agents serve clients well.</small>
                </span>
              </div>
            </div>
          </figure>

          <aside className="local-proof__side">
            <div className="local-proof__note" aria-label="What LocalPRO provides">
              <span>What you can expect</span>
              <ul>
                <li>Practical advice before you make a move.</li>
                <li>Listing preparation that respects presentation and timing.</li>
                <li>Local market context without overwhelming jargon.</li>
                <li>Responsive guidance from first question to final signature.</li>
              </ul>
            </div>

            <h3>Built for clients who want clarity, not pressure.</h3>
            <p>
              With experts throughout DFW and West Texas, LocalPRO helps buyers, sellers, and agents make confident
              decisions with a calm process, strong local knowledge, and a higher standard of service.
            </p>
            <a href="#markets" aria-label="Explore featured markets">
              Explore featured markets <span aria-hidden="true">↗</span>
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

function BlogCapsules() {
  const railRef = useRef<HTMLDivElement>(null);

  function move(direction: -1 | 1) {
    const rail = railRef.current;
    if (!rail) return;
    rail.scrollBy({ left: direction * Math.min(rail.clientWidth * 0.86, 760), behavior: "smooth" });
  }

  return (
    <section className="blog-capsules" id="blog" aria-labelledby="blog-capsules-title">
      <div className="blog-capsules__inner">
        <div className="blog-capsules__header" data-reveal>
          <div>
            <p className="kicker">News</p>
            <h2 id="blog-capsules-title">Announcement and Pro Tips</h2>
          </div>
          <div className="blog-capsules__controls" aria-label="Scroll blog articles">
            <button type="button" onClick={() => move(-1)} aria-label="Previous blog articles">
              <span aria-hidden="true">&larr;</span>
            </button>
            <button type="button" onClick={() => move(1)} aria-label="Next blog articles">
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>
        </div>

        <div className="blog-capsules__rail" ref={railRef} data-reveal>
          {blogArticles.map((article) => (
            <article className="blog-capsule" key={article.slug}>
              <a href={`/blog/${article.slug}`} aria-label={`Read ${article.title}`}>
                <span className="blog-capsule__media">
                  <img src={article.image} alt="" loading="lazy" decoding="async" />
                </span>
                <span className="blog-capsule__copy">
                  <span className="blog-capsule__eyebrow">{article.eyebrow}</span>
                  <strong>{article.title}</strong>
                  <span className="blog-capsule__meta">
                    <span>{article.author}</span>
                    <span>{article.published}</span>
                    <span>{article.readTime}</span>
                  </span>
                  <span className="blog-capsule__body">{article.deck}</span>
                  <span className="blog-capsule__link">Read article <span aria-hidden="true">&rarr;</span></span>
                </span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactPro() {
  return (
    <section className="contact-pro" id="contact" aria-labelledby="footer-contact-title">
      <div className="contact-pro__inner">
        <section className="site-footer__contact" aria-labelledby="footer-contact-title">
          <div>
            <span>Talk to a PRO</span>
            <h2 id="footer-contact-title">Tricia Andrews</h2>
            <p>Direct local guidance for buying, selling, valuation, and next-step real estate planning.</p>
          </div>
          <div className="site-footer__contact-side">
            <div className="site-footer__actions">
              <a href="tel:+14694228841">Call Tricia</a>
              <a href="mailto:tricia@localprorealty.com">Email Tricia</a>
            </div>
            <address>
              <strong>LocalPRO Realty, LLC</strong>
              <span>License ID: 0543406</span>
              <span>700 Parker Sq, Flower Mound, TX 75028</span>
            </address>
          </div>
        </section>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div className="site-footer__directory">
          {footerLinkGroups.map((group) => (
            <nav key={group.title} aria-label={`${group.title} links`} className="site-footer__group">
              <h3>{group.title}</h3>
              {group.links.map(([label, href]) => (
                <a key={label} href={href}>
                  {label}
                </a>
              ))}
            </nav>
          ))}

          <nav className="site-footer__markets" aria-label="Texas real estate markets">
            <h3>Texas real estate markets</h3>
            <div>
              {footerMarkets.map((city) => (
                <a key={city} href={cityListingHref(city)}>
                  {city} Real Estate
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="site-footer__bottom">
          <p>
            IDX information is provided exclusively for consumers&apos; personal, non-commercial use. Information is
            deemed reliable but not guaranteed.
          </p>
          <div>
            <a href="https://www.trec.texas.gov/forms/consumer-protection-notice">Consumer Protection Notice</a>
            <a href={`${localProUrl}/privacy-policy`}>Privacy Policy</a>
            <a href={`${localProUrl}/sitemap`}>Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  useReveal();

  return (
    <main>
      <ShellNav />
      <Hero />
      <Markets />
      <LocalProof />
      <BlogCapsules />
      <ContactPro />
      <Contact />
    </main>
  );
}
