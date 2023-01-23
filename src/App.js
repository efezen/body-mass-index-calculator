import React, { useState } from "react";
import ReactSlider from "react-slider";
import "./App.css"

function App() {
  let [height, setHeight] = useState("");
  let [weight, setWeight] = useState("");
  let [heightErr, setHeightErr] = useState("");
  let [weightErr, setWeightErr] = useState("");
  let [bmiValue, setBmiValue] = useState("");
  let [bmiText, setBmiText] = useState("");
  let [text, setText] = useState("");

  const minHeight = 95;
  const maxHeight = 220;
  const minWeight = 10;
  const maxWeight = 300;
  const slimThre = 18.5;
  const normalThre = 24.9;
  const fatThre = 29.9;
  const handleChangeHeight = (e) => {
    setHeight(e.target.value);
  };
  const handleChangeWeight = (e) => {
    setWeight(e.target.value);
  };
  const handleChangeHeightSlider = (value) => {
    setHeight(value);
  };
  const handleChangeWeightSlider = (value) => {
    setWeight(value);
  };
  const handleKeyPress = (source, event) => {
    let allowedChars = ".0123456789";
    let currentChar = event.key;
    let found = false;
    for (let i = 0; i < allowedChars.length; i++) {
      if (currentChar === allowedChars[i]) {
        found = true;
      }
    }
    if (found === false) {
      event.preventDefault();
      return;
    }
    let currentValue = "";
    if (source === "height") {
      currentValue = parseInt(height + currentChar);
      if (currentValue > maxHeight) {
        event.preventDefault();
      }
    } else {
      currentValue = parseInt(weight + currentChar);
      if (currentValue > maxWeight) {
        event.preventDefault();
      }
    }
    if (currentValue === 0) {
      event.preventDefault();
    }
  };

  const classifyResult = (result) => {
    if (result < slimThre) {
      return "slim";
    }
    if (result <= normalThre) {
      return "normal";
    }
    if (result < fatThre) {
      return "fat";
    }
    return "too fat";
  };

  const validate = () => {
    setHeightErr("");
    setWeightErr("");

    let heightErrStr = "";
    let weightErrStr = "";

    if (!height) {
      heightErrStr = "Please enter some height";
    } else if (height <= minHeight) {
      heightErrStr = "Greater than 95, Please";
    } else if (height > maxHeight) {
      heightErrStr = "Less than 220, Please";
    }

    if (!weight) {
      weightErrStr = "Please enter some weight";
    } else if (weight <= minWeight) {
      weightErrStr = "Greater than 95, Please";
    } else if (weight > maxWeight) {
      weightErrStr = "Less than 220, Please";
    }
    if (heightErrStr || weightErrStr) {
      setHeightErr(heightErrStr);
      setWeightErr(weightErrStr);
      return false;
    }
    return true;
  };

  const calculateBmi = (e) => {
    if (!validate) {
      return;
    }
    let bmi = (weight / (((height / 100) * height) / 100)).toFixed(1);
    let resultString = "";
    switch (classifyResult(bmi)) {
      case "slim": {
        resultString = "You are preety slonky, have a Kitkat!";
        break;
      }
      case "normal": {
        resultString = "You are okey for now";
        break;
      }
      case "fat": {
        resultString = "You are getting kind of fat";
        break;
      }
      case "tooFat": {
        resultString = "You are too fat";
        break;
      }
      default: {
      }

    }
    setBmiText(resultString);
    setBmiValue(bmi);
    setText("invisibleChonk")
  };

  const clear = () => {
    setHeight("")
    setWeight("")
    setBmiText("")
    setHeightErr("")
    setWeightErr("")
    setText("visibleChonk")
  }
  return (
    <div id="container">
      <div id="title">
        <h1>Calculate Your Body Mass Index</h1>
      </div>
      <form action="">
        <div className="unit">
          <p>Height (95cm - 220cm)</p>
        </div>
        <input
          type="number"
          name="height"
          step="1"
          placeholder="cm"
          min={minHeight}
          max={maxHeight}
          value={height}
          onChange={handleChangeHeight}
          onKeyPress={handleKeyPress.bind(this,"height")}
        />
        <div className="error">
          {heightErr}
        </div>
        <div className="slider">
          <ReactSlider
          min={minHeight}
          max={maxHeight}
          step={1}
          value={height}
          onChange={handleChangeHeightSlider}
          />
        </div>
        <br />
        <div className="unit">
          <p>Weight 10kg - 300kg</p>
        </div>
        <input
          type="number"
          name="height"
          step="0.5"
          placeholder="kg"
          min={minWeight}
          max={maxWeight}
          value={weight}
          onChange={handleChangeWeight}
          onKeyPress={handleKeyPress.bind(this, "weight")}
        />
        <div className="error">
          {weightErr}
        </div>
        <div className="slider">
          <ReactSlider
          min={minWeight}
          max={maxWeight}
          step={0.5}
          value={weight}
          onChange={handleChangeWeightSlider}
          />
        </div>
        <br />
        <div id="buttons-container">
          <button className="button"
          onClick={(event)=>{
            event.preventDefault();
            calculateBmi()
          }}
          >Calculate</button>
          <br />
          <button className="button"
          onClick={clear}
          
          >Clear</button>
        </div>
      </form>
      <div>
        <div id="result-top-text">
          <p>Your Current BMI : {bmiValue} </p>
        </div>
        <div id="bmi-text">{bmiText}</div>
      </div>
      <div className={text}>
        <div id="text">
          Body mass index, abbreviated BMI, is a key index for relating weight
          to height.
          <br />
          <br />
          BMI is a person's weight in kilograms (kg) divided by his or her
          height in meters squared. The National Institutes of Health (NIH) now
          defines normal weight, overweight, and obesity according to BMI rather
          than the traditional height/weight charts.
          <ul>
            <li>Overweight is a BMI of 25–29.9</li>
            <li>Obesity is a BMI of 30 or more</li>
          </ul>
          A very muscular person might have a high BMI without health risks.
        </div>
      </div>
    </div>
  );
}

export default App;
