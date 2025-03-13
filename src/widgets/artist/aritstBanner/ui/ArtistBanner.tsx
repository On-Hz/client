import { ArtistRatingButton } from "@/widgets/artist/artistRatingButton";
import { ArtistTabs } from "@/widgets/artist/artistTabs";

export const ArtistBanner = () => {
  const imageUrl = "https://picsum.photos/1600/450?random=10";
  return (
    <div className="grid relative w-full h-[450px]">
      {/* 3열 그리드로 하나의 이미지를 각각 배경으로 */}
      <div
        className="grid grid-cols-3 h-[450px]"
        style={{ gridColumn: "1 / -1", gridRow: "1 / -1" }}
      >
        {/* 왼쪽 (어둡게) */}
        <div
          className="bg-black bg-center bg-cover bg-opacity-60 bg-blend-overlay"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        {/* 중앙 (밝게) */}
        <div
          className="bg-center bg-cover"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
        {/* 오른쪽 (어둡게) */}
        <div
          className="bg-black bg-center bg-cover bg-opacity-60 bg-blend-overlay"
          style={{ backgroundImage: `url(${imageUrl})` }}
        ></div>
      </div>

      {/* 콘텐츠 (하단 정렬) */}
      <div
        className="flex flex-col justify-end h-full px-8 pb-4 text-white"
        style={{ gridColumn: "1 / -1", gridRow: "1 / -1" }}
      >
        <h1 className="mb-6 font-bold text-left text-8xl">Jane Doe</h1>

        {/* 별점 영역 */}
        <div className="flex items-end space-x-8">
          {/* 평균 평점 */}
          <div className="flex flex-col items-center">
            <div className="text-4xl">3.5</div>
            <p className="text-base">평균 평점</p>
          </div>
          {/* 수직 구분선 */}
          <div className="w-px bg-white h-14"></div>
          {/* 내 평점 (별 버튼) */}
          <ArtistRatingButton />
        </div>
        <ArtistTabs />
      </div>
    </div>
  );
};
