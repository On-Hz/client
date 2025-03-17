import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import { debounce } from "lodash";
import { measureNaturalLineRatio } from "@/shared/helpers";

interface AlbumTitleProps {
  text: string;
}

export const TopRateAlbumTitle: React.FC<AlbumTitleProps> = ({ text }) => {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const [overTwoLines, setOverTwoLines] = useState<boolean>(false);

  // 임계값 (상황에 맞게 조정)
  const thresholdToTwo = 1.6; // 1줄 상태에서 자연측정값이 이 이상이면 2줄로 판단
  const thresholdToOne = 1.4; // 2줄 상태에서 자연측정값이 이 이하이면 1줄로 판단

  const updateLineCount = useCallback(() => {
    if (!titleRef.current) return;
    const ratio = measureNaturalLineRatio(titleRef.current);
    setOverTwoLines((prev) => {
      if (!prev && ratio >= thresholdToTwo) {
        return true;
      } else if (prev && ratio < thresholdToOne) {
        return false;
      }
      return prev;
    });
  }, [thresholdToOne, thresholdToTwo]);

  // debounce 적용 (100ms 딜레이)
  const debouncedUpdate = useCallback(debounce(updateLineCount, 100), [
    updateLineCount,
  ]);

  // 컴포넌트 마운트 시 초기 동기 측정
  useLayoutEffect(() => {
    if (titleRef.current) {
      updateLineCount();
    }
  }, [text, updateLineCount]);

  // ResizeObserver와 창 리사이즈 이벤트에 따라 업데이트
  useLayoutEffect(() => {
    if (!titleRef.current) return;
    const observer = new ResizeObserver(() => {
      debouncedUpdate();
    });
    observer.observe(titleRef.current);
    window.addEventListener("resize", debouncedUpdate);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", debouncedUpdate);
      debouncedUpdate.cancel();
    };
  }, [debouncedUpdate]);

  return (
    <p
      ref={titleRef}
      className={`font-bold ${overTwoLines ? "album-title-long" : ""}`}
    >
      {text}
    </p>
  );
};
