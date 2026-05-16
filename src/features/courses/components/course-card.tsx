"use client";

import { useState } from "react";
import { formatMoney } from "@/lib/formatters/";
import StarRating  from "@/components/ui/star-rating";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils/utils";


interface CourseCardProps {
  posterSrc: string;
  title: string;
  price: string;
  duration: string;
  rating: number;
  _id: string;
  hideCta?: boolean;
  variant?: "default" | "compact";
}

const CourseCard: React.FC<CourseCardProps> = ({
  posterSrc,
  title,
  price,
  duration,
  rating,
  hideCta = false,
  _id = "3",
  variant = "default",
}) => {
  const [ratingVal, setRatingVal] = useState<number>(rating);

  const isCompact = variant === "compact";

  return (

        <Link
          href={`/home/explore/overview/${_id}`}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2"
        >
          <article
            className={cn(
              "group grow overflow-hidden border border-border/70 bg-card shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl",
              isCompact ? "rounded-xl p-2.5" : "rounded-2xl p-3"
            )}
          >
            <div
              className={cn(
                "relative overflow-hidden",
                isCompact ? "aspect-[4/3] rounded-lg" : "aspect-[16/9] rounded-xl"
              )}
            >
              <Image
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                src={posterSrc}
                alt="Video Poster Image"
                fill
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <span
                className={cn(
                  "absolute right-2 top-2 rounded-full bg-black/65 text-xs font-medium text-white backdrop-blur-sm",
                  isCompact ? "px-2 py-0.5" : "px-2.5 py-1"
                )}
              >
                {duration}
              </span>
            </div>

            <div
              className={cn(
                isCompact ? "mt-2.5 flex flex-col gap-2" : "mt-3 flex flex-col gap-2.5",
                !hideCta && "mb-3"
              )}
            >
              <span
                className={cn(
                  "line-clamp-2 font-semibold leading-snug text-foreground",
                  isCompact ? "text-sm" : "text-[15px]"
                )}
              >
                {title}
              </span>

              <div className="flex items-center gap-2">
                <span className={cn("font-bold text-foreground", isCompact ? "text-base" : "text-lg")}>
                  &#8358;{formatMoney(price)}
                </span>
              </div>

              <div
                className={cn(
                  "mt-0.5 flex w-fit items-center gap-1.5 rounded-full bg-muted/70",
                  isCompact ? "px-2 py-0.5" : "px-2.5 py-1"
                )}
              >
                <span className={cn("font-medium", isCompact ? "text-xs" : "text-sm")}>
                  {ratingVal.toFixed(1)}
                </span>
                <span className="-mt-0.5">
                  <StarRating onChange={setRatingVal} value={ratingVal} />
                </span>
              </div>
            </div>
          </article>
        </Link>
  );
};

export default CourseCard;
