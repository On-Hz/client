import { useEffect, useRef, useState } from "react";

export const useCountdownTimer = (initialSeconds: number = 300) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const start = () => {
    if (intervalRef.current) return; // 이미 실행 중이면 무시
    setTimeLeft(initialSeconds);
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clear();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const clear = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setIsRunning(false);
  };

  useEffect(() => {
    return clear; // 컴포넌트 unmount 시 정리
  }, []);

  return {
    timeLeft,
    isRunning,
    start,
    reset: clear,
    minutes: Math.floor(timeLeft / 60),
    seconds: String(timeLeft % 60).padStart(2, "0"),
  };
};
