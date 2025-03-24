export const isReviewQuery = (query: { queryKey: unknown }): boolean => {
  if (!Array.isArray(query.queryKey)) return false;
  const key = query.queryKey[0];
  return (
    typeof key === "string" &&
    (key.startsWith("reviews_") || key.endsWith("_review"))
  );
};
