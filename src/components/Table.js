import React, { useRef, useEffect, useState } from "react";
import { Link, navigate } from "@reach/router";
import Highlighter from "react-highlight-words";
import { Button } from "antd";

import styled from "styled-components";

import "./List.css";

export const DataTable = props => {
  const [index, setIndex] = useState(null);
  //const targetEl = useRef(null);

  function focus(e) {
    const rows = document.getElementsByClassName("hidefocusring");
    //let rows = state;
    //console.log(rows);
    if (e.keyCode === 39 || e.key === "ArrowUp") {
      const targetId = parseInt(e.target.dataset.index);
      //console.log(targetId);
      return targetId < 1 ? console.log("start") : rows[targetId - 1].focus();
    }

    if (e.keyCode === 37 || e.key === "ArrowDown") {
      const targetId = parseInt(e.target.dataset.index);
      console.log(targetId);
      //console.log("tada down", targetId);

      return targetId < rows.length - 1
        ? rows[targetId + 1].focus()
        : console.log("end");
      //console.log(rows[targetId + 1]);
    }

    if (e.key === "Enter") {
      //console.log("Enter", e.target.dataset.id);
      navigate(`/show/${e.target.dataset.id}`);
    }
  }
  console.log(index, "this is the index");
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Job Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody
        //ref={targetEl}
        //onFocus={() => console.log(targetEl.current.children)}
        >
          {props.dataSource.map(row => (
            <Row
              tabIndex="0"
              className={`hidefocusring`}
              //onFocus={() => setSelected(row.id)}
              //onBlur={() => setSelected(null)}
              key={row.id}
              data-id={row.id}
              data-index={props.dataSource.indexOf(row)}
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
                <Link to={`/show/${row.id}`} onClick={() => setIndex(row.id)}>
                  <Button>Show</Button>
                </Link>
              </td>
            </Row>
          ))}
        </tbody>
      </Table>
    </div>
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

const Table = styled.table`
  margin-top: 10px;
`;
