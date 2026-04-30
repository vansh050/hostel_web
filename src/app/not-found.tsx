import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-6 md:px-10">
      <div className="text-center max-w-xl">
        <p
          className="font-display text-[clamp(7rem,18vw,14rem)] font-medium leading-none mb-6 tracking-tight"
          style={{ color: "var(--color-saffron)" }}
        >
          404
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-medium tracking-tight mb-5">
          This page wandered off.
        </h1>
        <p className="text-stone-600 mb-10 leading-relaxed">
          The page you are looking for may have moved or been deleted. Let us
          help you find your way back.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 text-white px-7 py-3.5 rounded-full font-medium transition-colors"
            style={{ backgroundColor: "var(--color-ink)" }}
          >
            <Home className="w-4 h-4" />
            Homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-stone-300 hover:border-stone-900 text-stone-900 px-7 py-3.5 rounded-full font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
