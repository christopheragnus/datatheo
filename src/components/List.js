import React, { Component } from "react";
import axios from "axios";
import { Input } from "antd";

import "./List.css";

import { DataTable } from "./Table";
import { db } from "../utils/firebase";
import ListContext from "../utils/Context";

const myRef = React.createRef();

export default class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [{}],
      tableData: [],
      searchText: "",
      loading: true,
      selectedUser: {}
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
        let data = res.data.map(item => ({
          ...item,
          lastName: item.name.split(",  ")[0],
          firstName: item.name.split(",  ")[1]
        }));

        this.setState({ data: data, tableData: data });
        //console.log(res);
      })
      .catch(err => {
        //console.log(err);
      });

    this._readDB();
  }

  _readDB = async () => {
    let users = await db
      .collection("users")
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot);
        return querySnapshot.docs.map(doc => doc.data());
      });

    //console.log(users);

    this.setState(state => {
      state.tableData = [...state.tableData, ...users];
      state.data = [...state.data, ...users];
    });
  };

  render() {
    const { tableData, searchText } = this.state;

    return (
      <div>
        <ListContext.Provider value={tableData}>
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
        </ListContext.Provider>
      </div>
    );
  }
}
