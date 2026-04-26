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
    <div className="bg-white rounded-2xl p-6 border border-neutral-200">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < review.rating
                ? "text-amber-400 fill-amber-400"
                : "text-neutral-200 fill-neutral-200"
            }`}
          />
        ))}
      </div>
      <p className="text-neutral-800 leading-relaxed mb-6 text-[0.95rem]">
        &ldquo;{review.comment}&rdquo;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-semibold text-neutral-700">{initials}</span>
        </div>
        <div>
          <p className="font-medium text-neutral-900 text-sm">{review.name}</p>
          <p className="text-xs text-neutral-500">{review.date}</p>
        </div>
      </div>
    </div>
  );
}
