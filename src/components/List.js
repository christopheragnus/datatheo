import React, { Component } from "react";
import axios from "axios";
import { Table, Divider, Tag, Input, Button, Icon } from "antd";
import { Link, navigate } from "@reach/router";

import Highlighter from "react-highlight-words";

function nameFormatter(text) {
  return text.split(", ");
}

const DataTable = props => {
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
          <tr onClick={() => navigate(`/show/${row.id}`)}>
            <td>{nameFormatter(row.name)[1]}</td>
            <td>{nameFormatter(row.name)[0]}</td>
            <td>{row.job_titles}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default class List extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

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

  focus() {
    this.myRef.current.focus();
  }

  filterList = event => {
    let input = event.target.value;
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

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => (
      <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: text => (
      <Highlighter
        highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text.toString()}
      />
    )
  });

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: "" });
  };

  componentDidMount() {
    axios
      .get("https://dt-interviews.appspot.com/")
      .then(res => {
        this.setState({ data: res.data, tableData: res.data });
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { tableData } = this.state;
    const columns = [
      {
        title: "First Name",
        dataIndex: "name",
        key: "name",
        render: text => nameFormatter(text)[1]
        //...this.getColumnSearchProps("name")
      },
      {
        title: "Last Name",
        dataIndex: "name",
        key: "id",
        render: text => nameFormatter(text)[0]
        //...this.getColumnSearchProps("name")
      },
      {
        title: "Title",
        dataIndex: "job_titles",
        key: "job_titles",
        ...this.getColumnSearchProps("job_titles")
      },
      {
        title: "Action",
        key: "action",
        render: (text, record) => (
          <span>
            <Link to="/show">Show</Link>
          </span>
        )
      }
    ];

    return (
      <div>
        <form>
          <fieldset className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Search"
              onChange={this.filterList}
            />
          </fieldset>
        </form>
        {/* {console.log(this.state.data)} */}

        {/* <Table dataSource={data} columns={columns} ref={this.myRef} /> */}
        <DataTable dataSource={tableData} />
      </div>
    );
  }
}
