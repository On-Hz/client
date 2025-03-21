import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./style.css";

export interface CarouselSectionProps<T> {
  title: string;
  items: T[];
  renderPage: (pageItems: T[]) => JSX.Element;
  isLoading: boolean;
  skeletonArrLength: number;
  skeletonComp: (idx?: number) => JSX.Element;
}

export const CarouselSection = <T,>({
  title,
  items,
  renderPage,
  isLoading,
  skeletonArrLength,
  skeletonComp,
}: CarouselSectionProps<T>) => {
  return (
    <section className="px-4 py-8">
      <h2 className="mb-4 text-2xl font-bold hz-landing-title">{title}</h2>
      <Swiper
        modules={[Pagination]}
        navigation={false}
        pagination={{ clickable: true }}
        slidesPerView="auto" // 자동으로 보이는 슬라이드 수 조정
        loop={true} // 무한 루프
      >
        {isLoading &&
          Array.from({ length: skeletonArrLength }, (_, idx) => (
            <SwiperSlide
              key={idx}
              className="transition-transform transform cursor-pointer hover:scale-105"
            >
              {skeletonComp(idx)}
            </SwiperSlide>
          ))}
        {items &&
          items.map((item, idx) => (
            <SwiperSlide
              key={idx}
              className="transition-transform transform cursor-pointer hover:scale-105"
            >
              {items && renderPage([item])}
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
