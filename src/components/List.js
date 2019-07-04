import React, { Component } from "react";
import axios from "axios";
import { Input, Spin, Button } from "antd";
import styled from "styled-components";

import "./List.css";

import { DataTable } from "./Table";
import { db } from "../utils/firebase";
import { ListContext } from "../utils/Context";

import Pagination from "./Pagination";

class List extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [{}],
      tableData: [],
      searchText: "",
      loading: false,
      currentPage: 1,
      dbLoaded: false
    };
  }

  filterList = event => {
    let input = event.target.value;
    this.setState({ searchText: event.target.value });
    let initialData = this.state.data;
    let filteredList = initialData.filter(function(item) {
      if (item.job_titles.includes(input.toUpperCase())) {
        return item;
      }
      return null;
    });
    this.setState({ tableData: filteredList });
  };

  componentDidMount() {
    // load DB data to the front
    //this._readDB();
  }

  _readDB = async () => {
    let users = await db
      .collection("users")
      .get()
      .then(querySnapshot => {
        return querySnapshot.docs.map(doc => doc.data());
      });

    let tableData = await [...users, ...this.state.tableData];
    let data = await [...users, ...this.state.data];

    this.setState({
      tableData,
      data,
      dbLoaded: true
    });
  };

  makeRequestWithPage = page => {
    this.setState({ loading: true });
    axios
      .get("https://dt-interviews.appspot.com/", {
        params: {
          page
        }
      })
      .then(res => {
        let data = res.data.map(item => ({
          ...item,
          lastName: item.name.split(",  ")[0],
          firstName: item.name.split(",  ")[1]
        }));

        this.setState({
          data: data,
          tableData: data,
          loading: false,
          currentPage: page
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false, currentPage: page });
      });
  };

  onPageChanged = data => {
    // invoked by Pagination component
    const [{ selectedPage }, dispatch] = this.context;
    this.makeRequestWithPage(selectedPage);
  };

  render() {
    const { loading, tableData, searchText, dbLoaded } = this.state;

    return (
      <Container>
        <Input
          allowClear
          type="text"
          className="form-control form-control-lg spaceDivider"
          placeholder="Search Job Titles"
          onChange={this.filterList}
        />
        <Button onClick={() => this._readDB()} disabled={dbLoaded}>
          Load DB Data
        </Button>

        {loading ? (
          <Spin />
        ) : (
          <DataTable
            dataSource={tableData}
            searchText={searchText}
            makeRequestWithPage={this.makeRequestWithPage}
          />
        )}
        <Pagination totalRecords={351} onPageChanged={this.onPageChanged} />
      </Container>
    );
  }
}

List.contextType = ListContext;
export default List;

const Container = styled.div`
  padding: 20px;
`;
