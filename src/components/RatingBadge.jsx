export default function RatingBadge({ rating, reviews }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span className="bg-fk-green text-white text-xs font-medium px-1.5 py-0.5 rounded-sm">{rating} ★</span>
      {reviews != null && <span className="text-fk-grey font-medium">({reviews.toLocaleString('en-IN')})</span>}
    </span>
  );
}
