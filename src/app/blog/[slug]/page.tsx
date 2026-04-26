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

  // Article structured data
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

  // Simple markdown-like rendering: ## for h2, ### for h3, **text** for bold, - for lists
  const renderContent = (content: string) => {
    return content.split("\n").map((line, i) => {
      const trimmed = line.trim();

      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={i} className="text-xl font-semibold tracking-tight text-neutral-900 mt-10 mb-3">
            {trimmed.slice(4)}
          </h3>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={i} className="text-2xl font-semibold tracking-tight text-neutral-900 mt-12 mb-4">
            {trimmed.slice(3)}
          </h2>
        );
      }
      if (trimmed.startsWith("- ")) {
        return (
          <li key={i} className="text-neutral-700 ml-4 mb-1.5 list-disc leading-relaxed">
            {renderInline(trimmed.slice(2))}
          </li>
        );
      }
      if (/^\d+\.\s/.test(trimmed)) {
        return (
          <li key={i} className="text-neutral-700 ml-4 mb-1.5 list-decimal leading-relaxed">
            {renderInline(trimmed.replace(/^\d+\.\s/, ""))}
          </li>
        );
      }
      if (trimmed === "") {
        return <div key={i} className="h-3" />;
      }
      return (
        <p key={i} className="text-neutral-700 leading-relaxed mb-3">
          {renderInline(trimmed)}
        </p>
      );
    });
  };

  const renderInline = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? (
        <strong key={i} className="font-semibold text-neutral-900">
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

      <article className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 font-medium text-sm mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to blog
          </Link>

          <header className="mb-10">
            <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4">
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
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-neutral-600 leading-relaxed">{post.description}</p>
          </header>

          <div className="text-[1.0625rem]">
            {renderContent(post.content)}
          </div>

          <div className="mt-16 pt-10 border-t border-neutral-200">
            <div className="bg-neutral-950 rounded-3xl p-10 text-center">
              <h3 className="text-2xl font-semibold tracking-tight text-white mb-2">
                Looking for a hostel in Ranchi?
              </h3>
              <p className="text-neutral-400 mb-6 text-sm">
                Check out our affordable boys and girls hostels in Lalpur,
                Ranchi.
              </p>
              <Link
                href="/#hostels"
                className="inline-flex items-center justify-center bg-white text-neutral-900 hover:bg-neutral-100 px-6 py-3 rounded-full font-medium transition-colors"
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
