import React, { Component } from "react";

import axios from "axios";

import { Card, Icon, Avatar, Switch, Skeleton } from "antd";
const { Meta } = Card;

function nameFormatter(text) {
  return text.split(", ");
}

export default class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
  }

  componentDidMount() {
    const { id } = this.props;
    axios
      .get(`https://dt-interviews.appspot.com/${id}`)
      .then(res => {
        this.setState({ data: res.data, loading: false });
        //console.log(res);
      })
      .catch(err => {
        //console.log(err);
      });
  }

  render() {
    const { data, loading } = this.state;
    const imageUrl = `https://thispersondoesnotexist.com/image`;

    return (
      <div
        style={{
          background: "#ECECEC",
          padding: "30px"
        }}
      >
        <Card
          title="Employee Information"
          style={{ width: 300, padding: "0px" }}
          cover={<img alt="" src={imageUrl} />}
        >
          <Skeleton loading={loading}>
            <p>First Name: {data.name ? nameFormatter(data.name)[1] : null}</p>
            <p>Last Name: {data.name ? nameFormatter(data.name)[0] : null}</p>
            <p>Title: {data.job_titles}</p>
            <p>Annual Salary: {`$${data.employee_annual_salary}`}</p>
            <p>Department: {data.department}</p>
          </Skeleton>
        </Card>
      </div>
    );
  }
}
