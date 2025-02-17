export function getNavLinkClass(isActive: boolean) {
  if (isActive) {
    // 활성화: 파랑 글자 + 파랑 밑줄, 호버 시 변화 없음
    return "inline-block px-4 py-2 border-b-4 border-point text-point cursor-default hover:text-point";
  } else {
    // 비활성화: 흰색 글자, 호버 시 흰색 반투명 배경
    return (
      "inline-block px-4 py-2 border-b-2 border-transparent text-white " +
      "hover:bg-white/10 hover:text-white hover:rounded-md transition-colors"
    );
  }
}
