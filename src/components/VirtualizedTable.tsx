import React, { useEffect, useRef, useState } from "react";

import { FixedSizeGrid as Grid, GridOnScrollProps } from "react-window";

const rowCount = 1000;
const columnCount = 50;
const rowHeight = 44;
const columnWidth = 140;

const generateData = () =>
  Array.from({ length: rowCount }, (_, rowIndex) =>
    Array.from(
      { length: columnCount },
      (_, columnIndex) => `Row ${rowIndex} - Col ${columnIndex}`
    )
  );

const data = generateData();

export const VirtualizedTable: React.FC = () => {
  const [gridWidth, setGridWidth] = useState(window.innerWidth);
  const [gridHeight, setGridHeight] = useState(window.innerHeight - 180); // Adjust for padding/header

  const gridRef = useRef<Grid>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      setGridWidth(window.innerWidth);
      setGridHeight(window.innerHeight - 180);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onScroll = ({ scrollLeft }: GridOnScrollProps) => {
    if (headerRef.current) {
      headerRef.current.scrollLeft = scrollLeft;
    }
  };

  const Cell = ({ columnIndex, rowIndex, style }: any) => {
    const isFrozenStart = columnIndex < 2;
    const isFrozenEnd = columnIndex >= columnCount - 2;
    const isFrozen = isFrozenStart || isFrozenEnd;

    const frozenStyle: React.CSSProperties = isFrozenStart
      ? { position: "sticky", left: columnIndex * columnWidth, zIndex: 2 }
      : isFrozenEnd
      ? {
          position: "sticky",
          right: (columnCount - 1 - columnIndex) * columnWidth,
          zIndex: 2,
        }
      : {};

    return (
      <div
        style={{
          ...style,
          ...frozenStyle,
          backgroundColor: isFrozen
            ? "#f9fafb"
            : rowIndex % 2 === 0
            ? "#ffffff"
            : "#f6f6f6",
          borderBottom: "1px solid #e5e7eb",
          borderRight: "1px solid #f1f1f1",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          fontSize: "13px",
          color: "#111827",
          fontFamily: "system-ui, sans-serif",
          transition: "background 0.2s ease",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {data[rowIndex][columnIndex]}
      </div>
    );
  };

  const renderHeader = () => (
    <div
      ref={headerRef}
      style={{
        display: "flex",
        position: "sticky",
        top: 0,
        zIndex: 10,
        backgroundColor: "#f3f4f6",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.04)",
        borderBottom: "1px solid #d1d5db",
      }}
    >
      {Array.from({ length: columnCount }).map((_, columnIndex) => {
        const isFrozenStart = columnIndex < 2;
        const isFrozenEnd = columnIndex >= columnCount - 2;
        const isFrozen = isFrozenStart || isFrozenEnd;

        const frozenStyle: React.CSSProperties = isFrozenStart
          ? { position: "sticky", left: columnIndex * columnWidth, zIndex: 12 }
          : isFrozenEnd
          ? {
              position: "sticky",
              right: (columnCount - 1 - columnIndex) * columnWidth,
              zIndex: 12,
            }
          : {};

        return (
          <div
            key={columnIndex}
            style={{
              width: columnWidth,
              height: rowHeight,
              lineHeight: `${rowHeight}px`,
              padding: "0 16px",
              fontWeight: 600,
              fontSize: "13px",
              textAlign: "left",
              color: "#1f2937",
              backgroundColor: "#f3f4f6",
              borderRight: "1px solid #e5e7eb",
              fontFamily: "system-ui, sans-serif",
              ...frozenStyle,
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            Header {columnIndex}
          </div>
        );
      })}
    </div>
  );

  return (
    <div
      style={{
        padding: "24px",
        background: "#f9fafb",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h2
        style={{
          marginBottom: "16px",
          color: "#1f2937",
          fontSize: "20px",
          fontWeight: 600,
        }}
      >
        📊 Elegant Virtualized Table
      </h2>
      <div
        style={{
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid #e5e7eb",
          backgroundColor: "white",
          boxShadow: "0 4px 6px rgba(0,0,0,0.03)",
        }}
      >
        {renderHeader()}
        <Grid
          ref={gridRef}
          columnCount={columnCount}
          columnWidth={columnWidth}
          height={gridHeight}
          rowCount={rowCount}
          rowHeight={rowHeight}
          width={gridWidth}
          onScroll={onScroll}
        >
          {Cell}
        </Grid>
      </div>
    </div>
  );
};
