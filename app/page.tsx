"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

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

const proofStats = [
  ["Average Sales Price", "$826K"],
  ["Median Sales Price", "$449K"],
  ["Total Listings", "5,441"],
  ["Population", "1.29M"],
];

const proofHighlights = [
  {
    title: "Local market reports",
    body: "Average price, median price, active inventory, and population stay visible without making buyers dig.",
  },
  {
    title: "Search with intent",
    body: "Buy, sell, and valuation paths keep each visitor pointed toward a clear next action.",
  },
  {
    title: "PRO follow-up",
    body: "The first conversation starts with market context, not a cold form submission.",
  },
];

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

function ShellNav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.72);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`topbar ${solid ? "topbar--solid" : ""}`}>
      <a href="#top" className="brand" aria-label="LocalPRO Realty home">
        <strong>LocalPRO</strong>
        <span>Realty</span>
      </a>
      <nav aria-label="Primary navigation">
        <a href="#markets">Markets</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="topbar__action" href="#contact">
        Talk to a PRO
      </a>
    </header>
  );
}

function IntentSwitcher() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);
  const [motionKey, setMotionKey] = useState(0);
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState("");
  const active = intentSlides[activeIndex];

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

  function choose(index: number) {
    if (index === activeIndex) return;
    setPreviousIndex(activeIndex);
    setActiveIndex(index);
    setMotionKey((value) => value + 1);
    setStatus("");
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
        <div className="hero-sidecopy">
          <span>Buy</span>
          <span>Sell</span>
          <span>Valuation</span>
        </div>

        <div className="phase phase-one" ref={phaseOneRef}>
          <h1>Local Experts | PRO Results</h1>
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
    <section className="local-proof" aria-labelledby="local-proof-title">
      <div className="local-proof__inner">
        <div className="local-proof__intro" data-reveal>
          <p className="kicker">LocalPRO advantage</p>
          <h2 id="local-proof-title">A local market experience that feels prepared before the call.</h2>
        </div>

        <div className="local-proof__grid" data-reveal>
          <figure className="local-proof__media">
            <img
              src="/images/localpro-door-consultation.png"
              alt="Real estate professional opening the door of a premium Texas home"
              loading="lazy"
            />
          </figure>

          <div className="local-proof__panel">
            <p>
              LocalPRO already gives visitors the signals that matter inside each neighborhood page. This section
              keeps those same decision points close to the brand story instead of hiding them behind another click.
            </p>

            <div className="local-proof__stats" aria-label="LocalPRO market snapshot fields">
              {proofStats.map(([label, value]) => (
                <span key={label}>
                  <small>{label}</small>
                  <b>{value}</b>
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="local-proof__cards" data-reveal>
          {proofHighlights.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (!isClicked) return;
    const timer = window.setTimeout(() => setShowDetails(true), 420);
    return () => window.clearTimeout(timer);
  }, [isClicked]);

  return (
    <footer className={`work-together ${isClicked ? "is-clicked" : ""} ${showDetails ? "is-ready" : ""}`} id="contact">
      <div className="work-together__content" data-reveal>
        <div className="work-together__status">
          <span aria-hidden="true" />
          <p>LocalPRO Realty</p>
        </div>

        <button
          className="work-together__trigger"
          type="button"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsClicked(true)}
          aria-label="Show LocalPRO Realty contact details"
        >
          <span className={isHovered && !isClicked ? "is-hovered" : ""}>Talk to a PRO</span>
          <span className={`work-together__muted ${isHovered && !isClicked ? "is-hovered" : ""}`}>agent today</span>
          <i aria-hidden="true">↗</i>
        </button>

        <div className="work-together__intro">
          <p>
            Dedicated to enhancing the success of our agents so they can deliver
            superior guidance, service, and outcomes for our clients.
          </p>
          <a href="mailto:tricia@localprorealty.com">tricia@localprorealty.com</a>
        </div>

        <div className="work-together__details" aria-hidden={!showDetails}>
          <span>Contact</span>
          <h2>Tricia Andrews</h2>
          <div className="work-together__actions">
            <a href="tel:+14694228841">Call Tricia</a>
            <a href="mailto:tricia@localprorealty.com">Email Tricia</a>
          </div>
          <address>
            <strong>Tricia Andrews</strong>
            <span>LocalPRO Realty, LLC</span>
            <span>License ID: 0543406</span>
            <span>700 Parker Sq, Flower Mound, TX 75028</span>
          </address>
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
      <Contact />
    </main>
  );
}
