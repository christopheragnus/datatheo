import React, { Component } from "react";
import axios from "axios";
import { Input, Row, Col } from "antd";
import { Link, navigate } from "@reach/router";
import KeyboardEventHandler from "react-keyboard-event-handler";

import "./List.css";

import { DataTable } from "./Table";

const myRef = React.createRef();

export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          department: "WATER MGMNT",
          employee_annual_salary: "106836.00",
          job_titles: "CIVIL ENGINEER IV",
          id: 5,
          name: "ABAD JR,  VICENTE M"
        }
      ],
      tableData: [],
      searchText: "",
      loading: true
    };
  }

  handleFocus = () => {
    //myRef.current.focus();
    console.log(myRef.current, "tada");
  };

  filterList = event => {
    let input = event.target.value;
    this.setState({ searchText: event.target.value });
    //console.log(this.state.data);
    let initialData = this.state.data;
    let filteredList = initialData.filter(function(item) {
      if (item.job_titles.includes(input.toUpperCase())) {
        return item;
      }
      return null;
    });
    this.setState({ tableData: filteredList });
    //console.log(filteredList);
  };

  componentDidMount() {
    axios
      .get("https://dt-interviews.appspot.com/")
      .then(res => {
        this.setState({ data: res.data, tableData: res.data });
        //console.log(res);
      })
      .catch(err => {
        //console.log(err);
      });
  }

  render() {
    const { tableData, searchText } = this.state;

    return (
      <div>
        <p onClick={() => this.handleFocus()}>Submit</p>
        <Input
          allowClear
          type="text"
          className="form-control form-control-lg spaceDivider"
          placeholder="Search Job Titles"
          onChange={this.filterList}
        />

        <DataTable
          dataSource={tableData}
          searchText={searchText}
          handleFocus={this.handleFocus}
        />
      </div>
    );
  }
}
