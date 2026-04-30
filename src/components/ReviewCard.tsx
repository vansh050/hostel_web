import { Star } from "lucide-react";
import { Review } from "@/data/hostels";

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const initials = review.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <article className="bg-white p-7 rounded-sm border border-stone-200 h-full flex flex-col">
      <div className="flex items-center gap-1 mb-5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < review.rating
                ? "text-amber-400 fill-amber-400"
                : "text-stone-200 fill-stone-200"
            }`}
          />
        ))}
      </div>
      <p className="font-display text-[1.15rem] leading-snug text-stone-800 flex-1">
        &ldquo;{review.comment}&rdquo;
      </p>
      <div className="flex items-center gap-3 mt-7 pt-5 border-t border-stone-100">
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "var(--color-cream-deep)" }}
        >
          <span
            className="text-xs font-medium"
            style={{ color: "var(--color-saffron)" }}
          >
            {initials}
          </span>
        </div>
        <div>
          <p className="font-medium text-stone-900 text-sm">{review.name}</p>
          <p className="text-xs text-stone-500 mt-0.5">{review.date}</p>
        </div>
      </div>
    </article>
  );
}
