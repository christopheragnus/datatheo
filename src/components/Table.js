import React, { useEffect } from "react";
import { Link, navigate } from "@reach/router";
import Highlighter from "react-highlight-words";
import { Button } from "antd";

import styled from "styled-components";

import { useStateValue } from "../utils/Context";

import "./List.css";

export const DataTable = props => {
  const [{ selectedPage, selectedRow }, dispatch] = useStateValue();
  useEffect(() => {
    const elm = document.querySelector(".superfocus");
    if (elm) {
      return elm.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
  //console.log(selectedPage, selectedRow, "after selection");

  function focus(e) {
    const rows = document.getElementsByClassName("hidefocusring");
    const targetId = parseInt(e.target.dataset.index);

    if (e.keyCode === 39 || e.key === "ArrowUp") {
      return targetId < 1 ? null : rows[targetId - 1].focus();
    }

    if (e.keyCode === 37 || e.key === "ArrowDown") {
      //console.log(targetId);
      //console.log("tada down", targetId);

      return targetId < rows.length - 1 ? rows[targetId + 1].focus() : null;
      //console.log(rows[targetId + 1]);
    }

    if (e.key === "Enter") {
      //console.log("Enter", e.target.dataset.id);
      updateRow(e);
      navigate(`/show/${e.target.dataset.id}`);
    }
  }

  function updateRow(e) {
    dispatch({
      type: "updateRow",
      payload: +e.target.dataset.id
    });
  }

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
        <tbody>
          {props.dataSource.map(row => (
            <Row
              tabIndex="0"
              className={`hidefocusring ${
                selectedRow === row.id ? "superfocus" : null
              }`}
              key={row.id}
              data-id={row.id}
              data-index={props.dataSource.indexOf(row)}
              onKeyDown={e => focus(e)}
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
                <Link to={`/show/${row.id}`} onClick={updateRow}>
                  <Button data-id={row.id}>Show</Button>
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
