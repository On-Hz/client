export const getStrokeStyle = (
  upperGenre: string,
): React.CSSProperties => {
  const length = upperGenre.length;
  const hasSpace = upperGenre.includes(" ");
  console.log('ddd',upperGenre)
  let left = "-3%";
  

  if (length === 4) {
    left = "4%"
  }
  if (length === 6) {
    left = "6%"
  }
  if (length > 6 && hasSpace) { //띄워쓰기 포함 7글자 이상
    left = "10%"
  }

  if (length > 6 && !hasSpace) { //띄워쓰기 제외 7글자 이상
    left = "20%"
  }


  return {
    left
  };
};
