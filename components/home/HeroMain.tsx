
import Link from "next/link";
import { getImageUrl } from "@/lib/imageUrl";

type HeroMainProps = {
  image?: string | null;
  title: string;
  category: string;
  date?: string;
  slug: string;
};

export default function HeroMain({
  image,
  title,
  category,
  date,
  slug,
}: HeroMainProps) {
  return (
    <Link
      href={`/news/${slug}`}
      className="relative block h-[560px] overflow-hidden rounded-2xl group"
    >
      {/* IMAGE */}
      {image ? (
        <img
          src={getImageUrl(image)}
          alt={title}
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />
      ) : (
        <div className="absolute inset-0 bg-gray-300" />
      )}

      {/* GRADIENT */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/90
          via-black/35
          to-black/5
        "
      />

      {/* CONTENT */}
      <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-10 text-white">

        {/* CATEGORY */}
        <span
          className="
            inline-flex
            items-center
            bg-[#078B8D]
            text-white
            px-3
            py-1.5
            rounded-full
            text-xs
            md:text-sm
            font-bold
            uppercase
            tracking-wide
          "
        >
          {category}
        </span>

        {/* TITLE */}
        <h1
          className="
            mt-4
            max-w-4xl
            text-3xl
            md:text-4xl
            lg:text-5xl
            font-bold
            leading-[1.12]
            group-hover:text-gray-200
            transition-all
            duration-300
            decoration-white
            decoration-2
            underline-offset-8
            group-hover:underline
          "
        >
          {title}
        </h1>

        {/* DATE */}
        {date && (
          <div className="flex items-center gap-3 mt-5 text-sm text-gray-200">
            <span>
              {new Date(date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
