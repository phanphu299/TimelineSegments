import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { data, totalTrackLength } from "./sampleData";
import "./styles.css";
import Segment from "./components/Segment";

// assume all data is valid and sorted by start time
const TimelineSegments = ({ data, totalTrackLength }) => {
  const [segments, setSegments] = useState(data);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    let listSegment = getNormalSegments(segments);
    if (listSegment.length > 0) setRows([...rows, { row: listSegment }]);
  }, [segments.length]);

  const getNormalSegments = (segmentList) => {
    let listNormal = [];
    let selectedItems = [];

    for (let i = 0; i < segmentList.length; i++) {
      let canInsert = true;
      listNormal.map((item) => {
        if (
          segmentList[i].start < item.end ||
          (segmentList[i].start === item.start && segmentList[i].end > item.end)
        )
          canInsert = false;
        return item;
      });

      if (canInsert) {
        listNormal.push(segmentList[i]);
        selectedItems.push(segmentList[i].id);
      }
    }

    const newList = segments.filter(
      (item) => selectedItems.indexOf(item.id) < 0
    );
    setSegments(newList);

    for (let i = 0; i < listNormal.length; i++) {
      if (i > 0) listNormal[i].lastValue = listNormal[i - 1].end;
      else listNormal[i].lastValue = 0;
    }

    return listNormal;
  };

  return (
    <div className="container">
      {rows.map((item) => (
        <div className="row" key={Math.random()}>
          {item.row.map((item, i) => (
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
