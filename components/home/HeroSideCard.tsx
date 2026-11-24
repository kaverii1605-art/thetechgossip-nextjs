
import Link from "next/link";
import { getImageUrl } from "@/lib/imageUrl";

type HeroSideCardProps = {
  image?: string | null;
  title: string;
  category: string;
  slug: string;
  date?: string;
};

export default function HeroSideCard({
  image,
  title,
  category,
  slug,
  date,
}: HeroSideCardProps) {
  return (
    <Link
      href={`/news/${slug}`}
      className="
        relative
        block
        h-[267px]
        overflow-hidden
        rounded-2xl
        group
      "
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

      {/* OVERLAY */}
      <div
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/90
          via-black/40
          to-black/5
        "
      />

      {/* CONTENT */}
      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">

        {/* CATEGORY */}
        <span
          className="
            inline-flex
            bg-[#078B8D]
            px-2.5
            py-1
            rounded-full
            text-[11px]
            font-bold
            uppercase
            tracking-wide
          "
        >
          {category}
        </span>

        {/* TITLE */}
        <h2 className="
          mt-2
          text-white
          text-xl
          font-bold
          transition-all
          duration-200
          group-hover:underline
          group-hover:decoration-white
          decoration-2
          underline-offset-4
        ">
          {title}
        </h2>

        {/* DATE */}
        {date && (
          <p className="mt-3 text-xs md:text-sm text-gray-200">
            {new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        )}

      </div>
    </Link>
  );
}
