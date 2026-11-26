
export function getImageUrl(image?: string | null): string {
  if (!image) return "";

  const src = image.trim();

  // Base64 images
  if (src.startsWith("data:image/")) {
    return src;
  }

  // Fix malformed URLs such as https:/example.com/image.jpg
  if (/^https?:\/(?!\/)/i.test(src)) {
    return src.replace(/^(https?):\//i, "$1://");
  }

  // External image URLs
  if (/^https?:\/\//i.test(src)) {
    return src;
  }

  // Remove "public/" and leading slashes
  const cleanPath = src
    .replace(/^public\//i, "")
    .replace(/^\/+/, "");

  // Local images must be inside the public folder
  return `/${cleanPath}`;
}
