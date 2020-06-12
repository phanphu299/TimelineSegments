import React from "react";
import "../styles.css";

const Segment = ({ item }) => {
  const customStyles = {
    width: (item.end - item.start) * 2,
    marginLeft: (item.start - item.lastValue) * 2,
  };

  return (
    <div className="segment" style={customStyles}>
      <p className="align-left">
        {item.start}
        <span className="align-right">{item.end}</span>
      </p>
    </div>
  );
};

export default Segment;
