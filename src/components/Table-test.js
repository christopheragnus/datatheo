import React, { useState, useRef } from "react";
import { Link, navigate } from "@reach/router";
import Highlighter from "react-highlight-words";
import KeyboardEventHandler from "react-keyboard-event-handler";

import styled from "styled-components";

import "./List.css";

function nameFormatter(text) {
  return text.split(", ");
}

const Row = styled.tr`
  font-size: 1.5em;
  text-align: left;
  color: palevioletred;
`;

export const TestTable = props => {
  const [data, setData] = useState([
    {
      department: "FAMILY & SUPPORT",
      employee_annual_salary: "2756.00",
      job_titles: "FOSTER GRANDPARENT",
      id: 13,
      name: "ABBOTT,  BETTY L"
    },
    {
      department: "POLICE",
      employee_annual_salary: "46896.00",
      job_titles: "CLERK III",
      id: 14,
      name: "ABBOTT,  LYNISE M"
    }
  ]);
  //const [highlight, setHighlight] = useState(false);
  const [selected, setSelected] = useState(null);
  const myRef = useRef(null);

  function arrowUp() {
    // return selected - 1;
  }

  function arrowDown() {
    // var temp = selected + 1;
    // if (temp < data.slice(-1)[0].id) {
    //   console.log(selected + 1, "top");
    //   return temp;
    // }
    // console.log(selected, "bottom");
    // return selected;
    //return selected + 1;
  }

  function focus(e) {
    const rows = document.getElementsByClassName("hidefocusring");
    console.log(rows);
    if (e.keyCode === 39 || e.key === "ArrowUp") {
      const targetId = parseInt(e.target.id) - 1;
      rows[targetId + 1].focus();
      console.log("tada up", targetId);
    } else if (e.keyCode === 37 || e.key === "ArrowDown") {
      const targetId = parseInt(e.target.id) - 1;
      rows[targetId - 1].focus();
      console.log("tada down");
    }
  }

  function _addRow(id) {
    const rows = [];

    return rows;
  }

  //const highlightRow = "";

  return (
    <KeyboardEventHandler
      handleKeys={["up", "down"]}
      onKeyEvent={(key, e) => {
        //console.log(`do something upon keydown event of ${key}`);
        if (key === "up") {
          //console.log("up");
          //console.log(myRef);

          setSelected(arrowUp);
        }
        if (key === "down") {
          //console.log("down");
          //myRef.current.focus();
          //myRef.focus();
          setSelected(arrowDown);
        }
      }}
    >
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {console.log(data.length)}
          {data.map((row, index) => (
            <Row
              tabIndex="0"
              className={`hidefocusring ${
                selected === row.id ? "show" : "hide"
              }`}
              key={row.id}
              //onClick={() => setSelected(row.id)} //row.id
              //onBlur={() => setSelected(null)}
              onKeyDown={focus}
              //ref={myRef}
              id={row.id}
            >
              <td>{nameFormatter(row.name)[1]}</td>
              <td>{nameFormatter(row.name)[0]}</td>
              <td>
                <Highlighter
                  highlightClassName={"textHighlight"}
                  searchWords={[props.searchText]}
                  autoEscape={true}
                  textToHighlight={row.job_titles}
                />
              </td>
            </Row>
          ))}

          {/* <Row
          tabIndex="0"
          key="1"
          className={`${highlightRow}`}
          onFocus={() => setSelected("1")} //row.id
          onBlur={() => setSelected("")}
        >
          <td>name1</td>
          <td>name2</td>
          <td>telegraph</td>
        </Row>

        <Row
          tabIndex="0"
          key="2"
          className={`${highlightRow}`}
          onFocus={() => setSelected("2")}
          onBlur={() => setSelected("")}
        >
          <td>name1</td>
          <td>name2</td>
          <td>engineer</td>
        </Row> */}
        </tbody>
      </table>
    </KeyboardEventHandler>
  );
};

// radio button similar behaviour
