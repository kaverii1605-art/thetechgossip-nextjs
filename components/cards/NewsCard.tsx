type NewsCardProps = {
  title: string;
  category: string;
  image: string;
};

export default function NewsCard({ title, category, image }: NewsCardProps) {
  return (
    <div className="rounded-lg overflow-hidden border shadow-sm hover:shadow-lg transition">
      <img src={image} alt={title} className="w-full h-52 object-cover " />

      <div className="p-4">
        <span className="text-blue-600 text-sm font-semibold">{category}</span>

        <h2 className="mt-2 font-bold text-lg hover:underline">{title}</h2>
      </div>
    </div>
  );
}
