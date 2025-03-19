export const getStrokeStyle = (upperGenre: string): React.CSSProperties => {
  const length = upperGenre.length;

  // 기본값
  let fontSize = "clamp(3rem, 12vw, 13rem)";
  let letterSpacing = "0.1em";
  let transform = "translate(-47%, -55%)";

  // 글자 길이가 5 이하일 경우(짧은 단어)
  if (length <= 5) {
    fontSize = "clamp(3rem, 14vw, 20rem)";
  }

  // 글자 길이에 따른 세부 조정
  if (length === 3) {
    letterSpacing = "0.5em";
    transform = "translate(-40%, -55%)";
  } else if (length <= 4) {
    letterSpacing = "0.3em";
    transform = "translate(-46%, -55%)";
  }

  return {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform,
    fontSize,
    letterSpacing,
    WebkitTextStroke: "2px #000",
    color: "transparent",
    zIndex: 0,
  };
};
