import { axiosInstance } from "@/shared/api";
import { ReviewType } from "@/shared/constants";
import { Rating } from "@/shared/model";
import { useQuery } from "@tanstack/react-query";

  
export const getAlbumRatings = async (
    reviewType: ReviewType,
    entityId: string,
): Promise<Rating> => {
    const url = `/api/v1/reviews/${reviewType}/${entityId}/ratings`;
    const response = await axiosInstance.get(url);
    //console.log('별점', response.data);
    return response.data;
};

export const useAlbumRatings = (reviewType: ReviewType, entityId: string) => {
    return useQuery({
        queryKey: ["album_detail_ratings", reviewType, entityId],
        queryFn: () => getAlbumRatings(reviewType, entityId),
        enabled: !!entityId,
    });
};