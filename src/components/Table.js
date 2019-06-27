import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import Highlighter from "react-highlight-words";

import KeyboardEventHandler from "react-keyboard-event-handler";

import styled from "styled-components";

import "./List.css";

function nameFormatter(text) {
  return text.split(", ");
}

function handleKeyPress(event, rowId) {
  console.log(event);
  if (event.key === "Enter") {
    navigate(`/show/${rowId}`);
    console.log("enter press here! ");
  }

  if (event.key === "up") {
    console.log("up");
  }

  if (event.key === "down") {
    console.log("down");
  }
}

export const DataTable = props => {
  const [selected, setSelected] = useState(null);

  return (
    <KeyboardEventHandler
      handleKeys={["up", "down"]}
      onKeyEvent={(key, e) => {
        //console.log(`do something upon keydown event of ${key}`);
        if (key === "up") {
          console.log("up");
          //console.log(myRef);
          //myRef.focus();
          setSelected(selected - 1);
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
          {props.dataSource.map(row => (
            <Row
              tabIndex="0"
              className={`hidefocusring ${
                selected === row.id ? "show" : "hide"
              }`}
              onClick={() => setSelected(row.id)}
              onBlur={() => setSelected(null)}
              key={row.id}
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
        </tbody>
      </table>
    </KeyboardEventHandler>
  );
};

const Row = styled.tr`
  font-size: 1em;
  text-align: left;
`;
