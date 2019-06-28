import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import Highlighter from "react-highlight-words";
import { Button } from "antd";

import styled from "styled-components";

import "./List.css";

function nameFormatter(text) {
  return text.split(", ");
}

function focus(e) {
  const rows = document.getElementsByClassName("hidefocusring");
  console.log(rows);
  if (e.keyCode === 39 || e.key === "ArrowUp") {
    const targetId = parseInt(e.target.id) - 1;
    return targetId < 1 ? console.log("start") : rows[targetId - 1].focus();
  }

  if (e.keyCode === 37 || e.key === "ArrowDown") {
    const targetId = parseInt(e.target.id) - 1;

    //console.log("tada down", targetId);
    //console.log(rows.length);
    return targetId < rows.length - 1
      ? rows[targetId + 1].focus()
      : console.log("end");
  }

  if (e.key === "Enter") {
    console.log("Enter", e.target.id);
    navigate(`/show/${e.target.id}`);
  }
}

export const DataTable = props => {
  //const [selected, setSelected] = useState(null);

  return (
    <table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Title</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {props.dataSource.map(row => (
          <Row
            tabIndex="0"
            className={`hidefocusring`}
            //onFocus={() => setSelected(row.id)}
            //onBlur={() => setSelected(null)}
            key={row.id}
            id={row.id}
            onKeyDown={focus}
          >
            <td>{row.firstName}</td>
            <td>{row.lastName}</td>
            <td>
              <Highlighter
                highlightClassName={"textHighlight"}
                searchWords={[props.searchText]}
                autoEscape={true}
                textToHighlight={row.job_titles}
              />
            </td>
            <td>
              <Link to={`/show/${row.id}`}>
                <Button>Show</Button>
              </Link>
            </td>
          </Row>
        ))}
      </tbody>
    </table>
  );
};

const Row = styled.tr`
  font-size: 1em;
  text-align: left;

  &:hover {
    background-color: #1890ff;
    color: white;
  }
`;
