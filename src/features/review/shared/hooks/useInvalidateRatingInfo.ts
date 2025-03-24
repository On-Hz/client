import { useQueryClient } from "@tanstack/react-query";

export interface InvalidateRatingInfoProps {
  pageType?: string;
  entityId?: string;
}

export const useInvalidateRatingInfo = (props: InvalidateRatingInfoProps) => {
  const queryClient = useQueryClient();
  const { pageType, entityId } = props;

  return () => {
    if (!pageType || !entityId) return;
    const allowedTypes = ["artist", "album", "track"];
    if (allowedTypes.includes(pageType.toLowerCase())) {
      queryClient.invalidateQueries({
        queryKey: [`ratingInfo_${pageType.toLowerCase()}`, entityId],
      });
    }
  };
};
