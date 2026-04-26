import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-sm font-medium uppercase tracking-wider text-neutral-500 mb-4">
          404 · Not found
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 mb-4 leading-tight">
          This page doesn&apos;t exist.
        </h1>
        <p className="text-neutral-600 mb-10">
          The page you are looking for may have been moved or deleted. Let us
          help you find what you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-3 rounded-full font-medium transition-colors"
          >
            <Home className="w-4 h-4" />
            Homepage
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 border border-neutral-300 hover:border-neutral-900 text-neutral-900 px-6 py-3 rounded-full font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
