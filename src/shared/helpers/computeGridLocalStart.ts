const computeGridLocalStart = (index: number, columns: number): number =>
  Math.floor(index / columns) * 2 +
  (columns === 3 ? (index % 3 === 1 ? 2 : 1) : index % 2 === 0 ? 1 : 2);

export const getGridStyles = (index: number): React.CSSProperties =>
  [2, 3, 4, 6].reduce((acc, col) => {
    (acc as any)[`--local-${col}-columns-grid-start`] = computeGridLocalStart(
      index,
      col
    );
    return acc;
  }, {} as React.CSSProperties);
