import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { BRAND_NAME } from "@/data/hostels";

export const metadata: Metadata = {
  title: `Journal - Ranchi Travel Guide & Hostel Tips | ${BRAND_NAME}`,
  description:
    "Read our journal for guides on hostels in Ranchi, places to visit, student tips, travel guides, and budget accommodation advice for Ranchi, Jharkhand.",
  alternates: {
    canonical: "https://lalpurhostels.com/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <section className="px-6 md:px-10 lg:px-14 pt-20 md:pt-32 pb-12 md:pb-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] uppercase tracking-[0.32em] text-stone-500 mb-6">
            — The Journal
          </p>
          <h1 className="font-display text-[clamp(2.5rem,7vw,5.25rem)] leading-[0.96] tracking-tight font-medium max-w-4xl">
            Stories,{" "}
            <span
              className="font-display-italic"
              style={{ color: "var(--color-saffron)" }}
            >
              guides & a little Ranchi.
            </span>
          </h1>
          <p className="text-lg text-stone-600 mt-6 max-w-2xl leading-relaxed">
            Tips, guides, and everything you need to know about living in
            Ranchi, finding the best hostels, and exploring the city.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-36 px-6 md:px-10 lg:px-14">
        <div className="max-w-5xl mx-auto">
          <div className="border-t border-stone-200">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="border-b border-stone-200 group"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="block py-10 md:py-12"
                >
                  <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-5">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" />
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-6">
                    <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.1] tracking-tight font-medium group-hover:opacity-70 transition-opacity max-w-3xl">
                      {post.title}
                    </h2>
                    <ArrowUpRight className="w-6 h-6 text-stone-400 group-hover:text-stone-900 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </div>
                  <p className="text-stone-600 mt-4 leading-relaxed max-w-2xl">
                    {post.description}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
