import React, { useState } from "react";

function MainPage() {

  const [sliderValue, setSliderValue] = useState(50);

  const handleSliderChange = (event) => {
    setSliderValue(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1 className="text">Welcome to Project Launch!</h1>
      <br></br>
      <br></br>
      <h3 className="text">Days Worked for us: {sliderValue}</h3>
      <h3 className="text">Moneys earned: ${Math.round(Math.pow(sliderValue,2.2)+25*sliderValue)}</h3>
      <div style={{ margin: "auto", width: "50%", border: "3px solid green", padding: "10px" }}>
      <input
        style={{ margin: "auto", width: "100%", backgroundColor: "red"}}
        type="range"
        min={0}
        max={260}
        value={sliderValue}
        onChange={handleSliderChange}
      />
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default MainPage;
