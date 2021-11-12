import * as d3 from "d3";
import { useEffect, useRef } from "react";
export function AxisLeft({ yScale, padding }) {
  const y = useRef(0);
  const yAxisGenerator = d3.axisLeft().scale(yScale);
  useEffect(() => {
    d3.select(y.current).call(yAxisGenerator);
  }, [y, yAxisGenerator]);
  return (
    <g
      ref={y}
      style={{
        color: "white",
        transform: `translate(${padding?.left || 0}px, ${padding?.top || 0}px`,
      }}
    />
  );
}
export function AxisRight({ yScale, padding, width }) {
  const y = useRef(0);
  const yAxisGenerator = d3.axisRight().scale(yScale);
  useEffect(() => {
    d3.select(y.current).call(yAxisGenerator);
  }, [y, yAxisGenerator]);
  return (
    <g
      ref={y}
      style={{
        color: "white",
        transform: `translate(${(padding?.left || 0) + width}px, ${
          padding?.top || 0
        }px`,
      }}
    />
  );
}

export function AxisTop({ xScale, padding }) {
  const y = useRef(0);
  const yAxisGenerator = d3.axisTop().scale(xScale);
  useEffect(() => {
    d3.select(y.current).call(yAxisGenerator);
  }, [y, yAxisGenerator]);
  return (
    <g
      ref={y}
      style={{
        color: "white",
        transform: `translate(${padding?.left || 0}px, ${padding?.top || 0}px`,
      }}
    />
  );
}
export function AxisBottom({ xScale, padding, height }) {
  const y = useRef(0);
  const yAxisGenerator = d3.axisBottom().scale(xScale);
  useEffect(() => {
    d3.select(y.current).call(yAxisGenerator);
  }, [y, yAxisGenerator]);
  return (
    <g
      ref={y}
      style={{
        color: "white",
        transform: `translate(${padding?.left || 0}px, ${
          (padding?.top || 0) + height
        }px`,
      }}
    />
  );
}
