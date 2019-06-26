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

  //const highlightRow = "";

  return (
    <KeyboardEventHandler
      handleKeys={["up", "down"]}
      onKeyEvent={(key, e) => {
        //console.log(`do something upon keydown event of ${key}`);
        if (key === "up") {
          console.log("up");
          //console.log(myRef);
          myRef.focus();
          //setSelected(selected - 1);
        }
        if (key === "down") {
          console.log("down");
          //myRef.focus();
          setSelected(selected + 1);
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
          {data.map((row, index) => (
            <Row
              tabIndex="0"
              className={`${selected === row.id ? "show" : "hide"}`}
              key={row.id}
              onClick={() => setSelected(row.id)} //row.id
              onBlur={() => setSelected(null)}
              ref={myRef}
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

        {console.log("Current", selected)}
      </table>
    </KeyboardEventHandler>
  );
};

// radio button similar behaviour
