import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { BRAND_NAME } from "@/data/hostels";

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
    alternates: {
      canonical: `https://lalpurhostels.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: BRAND_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: BRAND_NAME,
    },
  };

  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={i}
            className="font-display text-2xl font-medium tracking-tight text-stone-900 mt-12 mb-4"
          >
            {trimmed.slice(4)}
          </h3>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={i}
            className="font-display text-3xl md:text-4xl font-medium tracking-tight text-stone-900 mt-16 mb-5"
          >
            {trimmed.slice(3)}
          </h2>
        );
      }
      if (trimmed.startsWith("- ")) {
        return (
          <li
            key={i}
            className="text-stone-700 ml-5 mb-2 list-disc leading-relaxed"
          >
            {renderInline(trimmed.slice(2))}
          </li>
        );
      }
      if (/^\d+\.\s/.test(trimmed)) {
        return (
          <li
            key={i}
            className="text-stone-700 ml-5 mb-2 list-decimal leading-relaxed"
          >
            {renderInline(trimmed.replace(/^\d+\.\s/, ""))}
          </li>
        );
      }
      if (trimmed === "") {
        return <div key={i} className="h-3" />;
      }
      return (
        <p key={i} className="text-stone-700 leading-relaxed mb-4 text-[1.0625rem]">
          {renderInline(trimmed)}
        </p>
      );
    });
  };

  const renderInline = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="font-semibold text-stone-900">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className="px-6 md:px-10 lg:px-14 pt-12 md:pt-20 pb-24 md:pb-36">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-700 hover:text-stone-900 mb-12 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to journal
          </Link>

          <header className="mb-12">
            <div className="flex items-center gap-4 text-[11px] uppercase tracking-[0.22em] text-stone-500 mb-6">
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
            <h1 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[1.06] tracking-tight font-medium mb-6">
              {post.title}
            </h1>
            <p className="font-display-italic text-stone-600 text-xl leading-relaxed">
              {post.description}
            </p>
          </header>

          <div className="prose-style">{renderContent(post.content)}</div>

          <div className="mt-20 pt-12 border-t border-stone-200">
            <div
              className="rounded-sm p-10 md:p-14 text-center"
              style={{ backgroundColor: "var(--color-forest-deep)" }}
            >
              <p className="text-[11px] uppercase tracking-[0.32em] text-amber-200/80 mb-4">
                — Looking to stay?
              </p>
              <h3 className="font-display text-white text-3xl md:text-4xl font-medium tracking-tight mb-4">
                Find your room in Ranchi.
              </h3>
              <Link
                href="/#hostels"
                className="inline-flex items-center justify-center bg-amber-100 hover:bg-amber-200 text-stone-900 px-7 py-3.5 rounded-full font-medium transition-colors mt-6"
              >
                View our hostels
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
