import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import Buttons from "./components/Buttons";
import Button from "./components/Button";

const btnValues = [
  [  "+", "-","X","/"],
  [6, 7, 8, 9],
  [2, 3,4, 5],
  [0,1, "="],
];

const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const App = () => {
  let [calc, setCalc] = useState({
    sign: "",
    num: 0,
    res: 0,
  });

  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    if (removeSpaces(calc.num).length < 16) {
      setCalc({
        ...calc,
        num:
            calc.num === 0 && value === "0"
                ? "0"
                : removeSpaces(calc.num) % 1 === 0
                ? toLocaleString(Number(removeSpaces(calc.num + value)))
                : toLocaleString(calc.num + value),
        res: !calc.sign ? 0 : calc.res,
      });
    }
  };


  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      fetch('http://localhost:8080/equals',{
        crossDomain:true,
        method: "POST",
        mode:"cors",
        headers:{'content-type' : "application/json","access-control-request-headers":"content-type"},
        body: JSON.stringify({
          num1: removeSpaces(calc.num),
          num2: removeSpaces(calc.res),
          op: calc.sign
        })})
          .then(res => res.json())
          .then((data) => {
            console.log(data)
            setCalc({
              ...calc,
              res:
                  calc.num === "0" && calc.sign === "/"
                      ? "Can't divide with 0"
                      : toLocaleString(data.ans),
              sign: "",
              num: 0,
            });
          })
    }
  };
  return (
      <Wrapper>
        <Screen value={calc.num ? calc.num : calc.res} />
        <Buttons>
          {btnValues.flat().map((btn, i) => {
            return (
                <Button
                    key={i}
                    className={btn === "=" ? "equals" : ""}
                    value={btn}
                    onClick={
                               btn === "="
                                  ? equalsClickHandler
                                  : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                                      ? signClickHandler
                                      :numClickHandler
                    }
                />
            );
          })}
        </Buttons>
      </Wrapper>
  );
};

export default App;