
export function getImageUrl(image?: string | null): string {
  if (!image) return "/images/placeholder.png";

  const value = image.trim();

  if (!value) return "/images/placeholder.png";

  // Keep Base64 image URLs unchanged
  if (/^data:image\//i.test(value)) {
    return value;
  }

  // Correct malformed HTTP URLs, such as https:/example.com
  if (/^https?:\/+[^/]/i.test(value)) {
    return value.replace(/^(https?):\/+/i, "$1://");
  }

  // Keep valid external URLs unchanged
  if (/^https?:\/\//i.test(value)) {
    return value;
  }

  // Remove accidental ./ prefix
  const cleanPath = value.replace(/^\.\//, "");

  // Local image paths
  return cleanPath.startsWith("/")
    ? cleanPath
    : `/${cleanPath}`;
}
