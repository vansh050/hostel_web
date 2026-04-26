import type { Metadata } from "next";
import Link from "next/link";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { BRAND_NAME } from "@/data/hostels";

export const metadata: Metadata = {
  title: `Blog - Ranchi Travel Guide, Hostel Tips & More | ${BRAND_NAME}`,
  description:
    "Read our blog for guides on hostels in Ranchi, places to visit, student tips, travel guides, and budget accommodation advice for Ranchi, Jharkhand.",
  alternates: {
    canonical: "https://lalpurhostels.com/blog",
  },
};

export default function BlogPage() {
  return (
    <>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 md:pt-24 md:pb-16">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-500 mb-4">
          Blog
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 leading-tight">
          Ranchi travel & hostel guide.
        </h1>
        <p className="text-lg text-neutral-600 mt-5 max-w-2xl">
          Tips, guides, and everything you need to know about living in Ranchi,
          finding the best hostels, and exploring the city.
        </p>
      </section>

      <section className="pb-20 px-4 sm:px-6 lg:px-8 border-t border-neutral-200 pt-14 md:pt-16">
        <div className="max-w-4xl mx-auto">
          <div className="divide-y divide-neutral-200">
            {blogPosts.map((post) => (
              <article key={post.slug} className="py-8 first:pt-0 last:pb-0">
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="flex items-center gap-4 text-xs text-neutral-500 mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(post.date).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900 group-hover:text-neutral-600 transition-colors">
                      {post.title}
                    </h2>
                    <ArrowUpRight className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1" />
                  </div>
                  <p className="text-neutral-600 mt-2 leading-relaxed">
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
