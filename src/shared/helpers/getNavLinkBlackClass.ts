export function getNavLinkBlackClass(isActive: boolean) {
  if (isActive) {
    // 활성화: 파랑 글자 + 파랑 밑줄, 호버 시 변화 없음
    return "block px-8 py-3 border-b-2 border-point text-point cursor-default hover:text-point";
  } else {
    // 비활성화: 검정 글자, 호버 시 파랑
    return (
      "block px-8 py-3 border-b-2 border-transparent text-black " +
      "hover:text-point hover:border-point transition-colors"
    );
  }
}
