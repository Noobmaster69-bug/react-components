
import CustomChart from "./chart";
import {getTimelineData} from "./dummyData"
function App() {
  const test = getTimelineData()
  const data = [{
    type: "line",
    color: "white",
    Y: test.map(e => e.temperature),
    X: test.map(e => e.date),
    xAxis: "bottom",
    yAxis: "left"
  }]
  const style1 ={
    padding: { top: 100, left: 30, bottom: 20, right: 40 },
    axis: false
  }
  return (
    <div className="App">
      <CustomChart
        style = {style1}
        data={data}
      />
    </div>
  );
}

export default App;
