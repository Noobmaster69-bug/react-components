import * as d3 from "d3";
export default function Line({ dataset }) {
  const lineGenerator = d3
    .line()
    .x((d) => dataset.xScale(d.x))
    .y((d) => dataset.yScale(d.y));
  return (
    <path
      d={lineGenerator(dataset.data)}
      stroke={dataset.color}
      strokeWidth={2}
      fill="none"
    />
  );
}
