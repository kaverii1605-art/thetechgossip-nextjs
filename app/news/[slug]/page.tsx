import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

import { marked } from "marked";
import DOMPurify from "isomorphic-dompurify";

type NewsDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// Convert plain text to paragraphs while preserving existing HTML.




function formatArticleContent(content: string | null | undefined) {
  if (!content?.trim()) return "";

  // Preserve HTML content from the database.
  if (/<\/?[a-z][\s\S]*?>/i.test(content)) {
    return content;
  }

  // Convert plain text into paragraphs.
  const escaped = content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

  return escaped
    .split(/\r?\n\s*\r?\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => {
      const heading = paragraph.match(/^#{1,3}\s+(.+)$/);

      if (heading) {
        const level = paragraph.match(/^#+/)![0].length;
        return `<h${level}>${heading[1]}</h${level}>`;
      }

      return `<p>${paragraph.replace(/\r?\n/g, "<br />")}</p>`;
    })
    .join("\n");
}



export default async function NewsDetailPage({
  params,
}: NewsDetailPageProps) {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  const articleContent = formatArticleContent(post.content);

  const formattedContent = DOMPurify.sanitize(
  await marked.parse(articleContent || "")
);

  return (
    <main className="min-h-screen bg-white text-[#182033]">

      {/* ARTICLE HEADER */}
      <section className="border-t-4 border-[#078B8D] bg-[#f8f8fc]">
        <div className="mx-auto max-w-[1200px] px-5 py-8 md:px-10 md:py-9">

          {post.category && (
            <div className="mb-3">
              <span className="inline-block rounded-full bg-[#078B8D] px-3 py-1 text-[11px] font-semibold text-white">
                {post.category}
              </span>
            </div>
          )}

          <h1 className="max-w-5xl text-xl font-bold leading-snug text-black md:text-2xl">
            {post.heading}
          </h1>

       

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-black-300">
            <time dateTime={new Date(post.createdAt).toISOString()}>
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </time>

            {post.author && (
              <>
                <span aria-hidden="true">|</span>
                <span>By {post.author}</span>
              </>
            )}
          </div>

        </div>
      </section>

      {/* ARTICLE BODY AND SIDEBAR */}
    <section className="mx-auto max-w-[1200px] bg-[#F8F8FC] px-5 py-6 md:px-10 md:py-8">
  <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-8">
          {/* MAIN ARTICLE */}
         <article className="min-w-0">

  {/* FEATURED IMAGE */}
  {post.image && (
    <figure className="mb-5 overflow-hidden rounded-lg bg-gray-100">
      <img
        src={post.image}
        alt={post.heading}
        className="block h-auto max-h-[420px] w-full object-cover object-center"
      />
    </figure>
  )}

  {/* SUBHEADING BELOW IMAGE */}
  {post.subHeading && (
    <p className="mb-6 text-base font-medium leading-7 text-[#0B1235] md:text-lg">
      {post.subHeading}
    </p>
  )}

  {/* ARTICLE CONTENT */}
  

<div
  className="
    article-content
    w-full min-w-0
    whitespace-normal break-words
     leading-[1.75] text-[#52617F]

    [&_p]:mb-4
    [&_p]:leading-[1.75]

    [&_h1]:mt-6 [&_h1]:mb-3
    [&_h1]:text-[23px] [&_h1]:font-bold
    [&_h1]:leading-tight [&_h1]:text-[#0B1235]

    [&_h2]:mt-6 [&_h2]:mb-3
    [&_h2]:text-[21px] [&_h2]:font-bold
    [&_h2]:leading-tight [&_h2]:text-[#0B1235]

    [&_h3]:mt-5 [&_h3]:mb-2
    [&_h3]:text-base [&_h3]:font-bold
    [&_h3]:text-[#0B1235]

    [&_strong]:font-semibold
    [&_strong]:text-[#263755]

    [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-5
    [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-5
    [&_li]:mb-1

    [&_a]:text-[#078B8D]
    [&_a]:underline

    [&_blockquote]:my-5
    [&_blockquote]:border-l-2
    [&_blockquote]:border-[#078B8D]
    [&_blockquote]:pl-4
  "
dangerouslySetInnerHTML={{ __html: formattedContent }}
/>




</article>

          {/* RIGHT SIDEBAR */}
          <aside className="lg:sticky lg:top-8">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">

              <h2 className="text-base font-bold text-[#0B1235]">
                TheTechGossip
              </h2>

              <p className="mt-2 text-xs leading-5 text-gray-600">
                Stay updated with the latest technology, marketing,
                customer experience and digital commerce news.
              </p>

              <div className="my-4 h-px bg-gray-200" />

              <Link
                href="/news"
                className="inline-flex text-xs font-semibold text-[#078B8D] hover:underline"
              >
                ← Back to News
              </Link>

            </div>
          </aside>

        </div>
      </section>

    </main>
  );
}
