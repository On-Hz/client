import { Skeleton } from '@mui/material';

export const UserLikeSecSkeleton = () => {

    return( 
        <div className="flex gap-7 pt-10 flex-wrap hz-like-wrap">
            <div className="like-box relative w-[23%] h-[400px]">
                <div className="like-cover rounded-lg h-[200px] w-full overflow-hidden">
                    <Skeleton variant="rectangular" width="100%" height="100%" />
                </div>
                <div className="like-text m-auto absolute bottom-0 left-1/2 translate-x-[-50%] w-[84%] rounded-lg p-5 border border-gray3 bg-white">
                    <Skeleton width="60px" height="15px" />
                    <Skeleton width="100px" height="30px" />
                    <div className='flex pt-4'>
                        <Skeleton variant="circular" width={18} height={18} className='mr-1'/>
                        <Skeleton variant="circular" width={18} height={18} className='mr-1'/>
                        <Skeleton variant="circular" width={18} height={18} className='mr-1'/>
                        <Skeleton variant="circular" width={18} height={18} className='mr-1'/>
                        <Skeleton variant="circular" width={18} height={18} className='mr-1'/>
                    </div>
                    <p className="text-gray line-clamp-2 my-5 min-h-10 w-full py-5">
                        <Skeleton variant="rectangular" width="100%" height="40px" />
                    </p>
                    <Skeleton width="50px" height="25px" />
                </div>
            </div>
        </div>
    )
}

export const UserLikesSecSkeleton: React.FC = () => {
    return (
        <UserLikeSecSkeleton />
    );
  };
