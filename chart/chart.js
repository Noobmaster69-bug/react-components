import * as d3 from "d3";
import Line from "./Line";
import { useRef, useEffect, useState } from "react";
import { AxisBottom, AxisLeft, AxisRight, AxisTop } from "./Axis";
class dataset {
  X;
  Y;
  xScale;
  yScale;
  data = [];
  constructor({ type, hline, vline, color }) {
    this.type = type;
    this.hline = hline;
    this.vline = vline;
    this.color = color;
  }
  setX(X, xAccessor = (x) => dataset.parseDate(x)){
    this.X = X.map(xAccessor);
    if (this.data.length === 0) {
      this.data = this.X.map((d) => {
        return { x: d };
      });
    } else {
      this.data.forEach((d, i) => (d.x = this.X[i]));
    }
  }
  setY(Y, xAccessor = (y) => y) {
    this.Y = Y.map(xAccessor);
    if (this.data.length === 0) {
      this.data = this.Y.map((d) => {
        return { y: d };
      });
    } else {
      this.data.forEach((d, i) => (d.y = this.Y[i]));
    }
  }
  static parseDate (date){
    const temp = d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ");
    return temp(date)
  }
}

function Chart({ padding, data, option = {axis: true} }) {
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const SVG = useRef();
  const boundedWidth = width - (padding?.left || 0) - (padding?.right || 0);
  const boundedHeight = height - (padding?.top || 0) - (padding?.bottom || 0);
  const leftScale = data?.some((e) => e.vline === "left")
    ? d3
        .scaleLinear()
        .domain(
          d3.extent(
            data
              ?.filter((e) => e.vline === "left")
              ?.map((e) => e.Y)
              ?.flat()
          )
        )
        .range([boundedHeight, 0])
        .nice()
    : null;
  const rightScale = data?.some((e) => e.vline === "right")
    ? d3
        .scaleLinear()
        .domain(
          d3.extent(
            data
              ?.filter((e) => e.vline === "right")
              ?.map((e) => e.Y)
              ?.flat()
          )
        )
        .range([boundedHeight, 0])
        .nice()
    : null;
  const topScale = data?.some((e) => e.hline === "top")
    ? d3
        .scaleTime()
        .domain(
          d3.extent(
            data
              ?.filter((e) => e.hline === "top")
              ?.map((e) => e.X)
              ?.flat()
          )
        )
        .range([0, boundedWidth])
        .nice()
    : null;
  const bottomScale = data?.some((e) => e.hline === "bottom")
    ? d3
        .scaleTime()
        .domain(
          d3.extent(
            data
              ?.filter((e) => e.hline === "bottom")
              ?.map((e) => e.X)
              ?.flat()
          )
        )
        .range([0, boundedWidth])

    : null;
  data?.forEach((e) => {
    if (e.vline === "left") {
      e.yScale = leftScale;
    } else if (e.vline === "right") {
      e.yScale = rightScale;
    }
    if (e.hline === "top") {
      e.xScale = topScale;
    } else {
      e.xScale = bottomScale;
    }
  });
  useEffect(() => {
    setWidth(() => SVG.current.parentNode.offsetWidth);
    setHeight(() => SVG.current.parentNode.offsetHeight);
  }, []);
  return (

    <svg width={width} height={height} ref={SVG}>
      <g
        style={{
          transform: `translate(${padding?.left || 0}px,${
            padding?.top || 0
          }px)`,
        }}
      >
        {data?.map((dataset) => {
          if (dataset.type === "line") {
            return <Line dataset={dataset} key = {Math.random()}/>;
          }
        })}
      </g>

      {option?.axis&&leftScale && <AxisLeft yScale={leftScale} padding={padding} />}
      {option?.axis&&rightScale && 
        <AxisRight yScale={rightScale} padding={padding} width={boundedWidth} />
      }
      {option?.axis&&topScale && <AxisTop xScale={topScale} padding={padding} />}
      {option?.axis&&bottomScale && (
        <AxisBottom
          xScale={bottomScale}
          padding={padding}
          height={boundedHeight}
        />
      )}
    </svg>
  );
}

export default function CustomChart({data, style}){
  const tempdata = data.map(e =>{
    let {type, xAxis, yAxis, color, X, Y} = e;
    const data = new dataset({
      type: type, 
      hline: xAxis, 
      vline: yAxis, 
      color: color})
    data.setX(X)
    data.setY(Y)
    return data
  })
  const {padding,...props} = style
  return <Chart
        padding = {style?.padding}
        data = {tempdata}
        option = {props}
        />
}
