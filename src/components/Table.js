import React, { useState } from "react";
import { Link, navigate } from "@reach/router";
import Highlighter from "react-highlight-words";

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

export const DataTable = React.forwardRef((props, ref) => {
  const [] = useState("");
  return (
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
          <tr
            tabIndex="0"
            //onClick={() => navigate(`/show/${row.id}`)}
            //onKeyPress={e => handleKeyPress(e, row.id)}
            className="row"
            ref={ref}
            onClick={() => props.handleFocus()}
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
          </tr>
        ))}
      </tbody>
    </table>
  );
});
