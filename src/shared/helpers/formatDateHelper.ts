export const formatDate = (dateStr: string): string => {
    const date = new Date(dateStr);
    const formatted = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return formatted.replace(/\.$/, ""); 
  };