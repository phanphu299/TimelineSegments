import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { data, totalTrackLength } from "./sampleData";
import "./styles.css";
import Segment from "./components/Segment";
// assume all data is valid and sorted by start time
const TimelineSegments = ({ data, totalTrackLength }) => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setRows(getRows(data));
  }, []);
  const getRows = (segmentList) => {
    segmentList.sort((a, b) => a.end - b.end);
    let rows = [];
    segmentList.forEach(item => {
      let addNewRow = true;
      for (let row of rows) {
        if(row[row.length - 1].end <= item.start){
          row.push(item);
          addNewRow = false;
          break;
        }
      }
      if(addNewRow){
        rows.push(new Array(item));
      }     
    });
    console.log(rows);
    return rows;
  };
  return (
    <div className="container">
      {rows.map((item) => (
        <div className="row" key={Math.random()}>
          {item.map((item) => (
            <Segment key={item.id} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
};
// boilerplate
ReactDOM.render(
  <TimelineSegments data={data} totalTrackLength={totalTrackLength} />,
  document.getElementById("root")
);
