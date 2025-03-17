export const getLineRatio = (element: HTMLElement): number => {
  const computedStyle = window.getComputedStyle(element);
  let lineHeight = parseFloat(computedStyle.lineHeight);
  if (isNaN(lineHeight)) {
    const fontSize = parseFloat(computedStyle.fontSize);
    lineHeight = fontSize * 1.2;
  }
  const elementRect = element.getBoundingClientRect();
  const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
  const paddingBottom = parseFloat(computedStyle.paddingBottom) || 0;
  const contentHeight = elementRect.height - paddingTop - paddingBottom;
  return contentHeight / lineHeight;
};

/**
 * off-screen에 복제해서, album-title-long 클래스 없이 자연스러운 텍스트의 줄 비율을 측정합니다.
 */
export const measureNaturalLineRatio = (element: HTMLElement): number => {
  const clone = element.cloneNode(true) as HTMLElement;
  clone.classList.remove("album-title-long");
  clone.style.visibility = "hidden";
  clone.style.position = "absolute";
  clone.style.top = "-9999px";
  clone.style.left = "-9999px";
  clone.style.width = getComputedStyle(element).width;
  document.body.appendChild(clone);
  const ratio = getLineRatio(clone);
  document.body.removeChild(clone);
  return ratio;
};
