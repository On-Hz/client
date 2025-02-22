import React from "react";
import Carousel from "react-material-ui-carousel";
import useMediaQuery from "@mui/material/useMediaQuery";

export interface CarouselSectionProps<T> {
  title: string;
  items: T[];
  renderPage: (pageItems: T[]) => JSX.Element;
  isReview?: boolean;
}

function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

function CarouselSection<T>({
  title,
  items,
  renderPage,
  isReview = false,
}: CarouselSectionProps<T>) {
  // TailwindCSS 기준: 2xl: 1536px, xl: 1280px, md: 768px, 그 외: sm, xs
  const is2xl = useMediaQuery("(min-width: 1200px)");
  const isXl = useMediaQuery("(min-width: 1000px)");
  const isMd = useMediaQuery("(min-width: 800px)");

  const chunkSize = isReview
    ? is2xl || isXl
      ? 3
      : isMd
      ? 2
      : 1
    : is2xl
    ? 6
    : isXl
    ? 4
    : isMd
    ? 3
    : 2;

  const pages = chunkArray(items, chunkSize);

  return (
    <section className="px-4 py-8">
      <h2 className="mb-4 text-2xl font-bold">{title}</h2>
      <Carousel
        autoPlay={false}
        navButtonsAlwaysVisible
        indicators={false}
        cycleNavigation={false}
      >
        {pages.map((page, idx) => (
          <div key={idx} className="px-2">
            {renderPage(page)}
          </div>
        ))}
      </Carousel>
    </section>
  );
}

export default CarouselSection;
