import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './style.css';

// import Carousel from "react-material-ui-carousel";
// import useMediaQuery from "@mui/material/useMediaQuery";

export interface CarouselSectionProps<T> {
  title: string;
  items: T[];
  renderPage: (pageItems: T[]) => JSX.Element;
  isReview?: boolean;
}

// function chunkArray<T>(arr: T[], size: number): T[][] {
//   const chunks: T[][] = [];
//   for (let i = 0; i < arr.length; i += size) {
//     chunks.push(arr.slice(i, i + size));
//   }
//   return chunks;
// }

function CarouselSection<T>({
  title,
  items,
  renderPage,
}: CarouselSectionProps<T>) {

  return (
    <section className="px-4 py-8">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <Swiper
        modules={[Pagination]} 
        navigation={false}
        pagination={{ clickable: true }}
        slidesPerView="auto" // 자동으로 보이는 슬라이드 수 조정
        loop={true} // 무한 루프

      >
        {items.map((item, idx) => (
          <SwiperSlide key={idx} className="cursor-pointer transform hover:scale-105 transition-transform">
            {renderPage([item])}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* <Carousel
        autoPlay={false}
        navButtonsAlwaysVisible
        indicators={false}
        infiniteLoop={true}
        cycleNavigation={false}
      >
        {pages.map((page, idx) => (
          <div key={idx} className="px-2">
            {renderPage(page)}
          </div>
        ))}
      </Carousel> */}
    </section>
  );
}

export default CarouselSection;
