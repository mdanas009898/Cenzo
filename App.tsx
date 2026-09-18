import { lazy, Suspense, useEffect, useState } from "react";
import { ToastProvider } from "./components/Toast";
import { BookingIntentProvider } from "./context/BookingIntent";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Membership from "./components/Membership";
import BookingForm from "./components/BookingForm";
import HowItWorks from "./components/HowItWorks";
import WhyUs from "./components/WhyUs";
import About from "./components/About";
import Reviews from "./components/Reviews";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import StickyActions from "./components/StickyActions";

/** Owner-only booking desk, loaded on demand at #admin. */
const AdminDesk = lazy(() => import("./components/AdminDesk"));

function useHash() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const onHash = () => setHash(window.location.hash);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return hash;
}

export default function App() {
  const hash = useHash();

  if (hash === "#admin") {
    return (
      <ToastProvider>
        <Suspense fallback={<div className="p-10 text-slate-500">Loading booking desk…</div>}>
          <AdminDesk />
        </Suspense>
      </ToastProvider>
    );
  }

  return (
    <ToastProvider>
      <BookingIntentProvider>
        <Header />
        <main>
          <Hero />
          <Services />
          <BookingForm />
          <Pricing />
          <Membership />
          <HowItWorks />
          <WhyUs />
          <About />
          <Reviews />
          <Faq />
          <Contact />
        </main>
        <Footer />
        <StickyActions />
      </BookingIntentProvider>
    </ToastProvider>
  );
}

