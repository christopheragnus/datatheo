import React, { Component } from "react";
import axios from "axios";
import { Card, Skeleton } from "antd";

function nameFormatter(text) {
  return text.split(", ");
}

export default class Show extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true,
      selected: props.id
    };
  }

  _callback = e => {
    const { navigate } = this.props;
    const { data, selected } = this.state;

    if (e.key === "ArrowUp") {
      this.setState({ selected: parseInt(selected) - 1 });
      navigate(`/show/${selected}`);
      this._apiCall();
      return;
    }

    if (e.key === "ArrowDown") {
      this.setState({ selected: parseInt(selected) + 1 });
      navigate(`/show/${selected}`);
      this._apiCall();
      return;
    }

    if (e.key === "Enter") {
      return navigate("/");
    }
    console.log(e.key);
  };

  _apiCall = () => {
    const { selected } = this.state;
    this.setState({ loading: true });
    axios
      .get(`https://dt-interviews.appspot.com/${selected}`)
      .then(res => {
        this.setState({ data: res.data, loading: false });
        //console.log(res);
      })
      .catch(err => {
        //console.log(err);
      });
  };

  componentDidMount() {
    this._apiCall();
    document.addEventListener("keydown", this._callback);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this._callback);
  }

  render() {
    const imageUrl = `https://thispersondoesnotexist.com/image?random_number=${new Date().getTime()}`;
    const { data, loading } = this.state;

    return (
      <div
        style={{
          background: "#ECECEC",
          padding: "30px",
          display: "flex"
        }}
      >
        <Card
          title="Employee Information"
          style={{ width: 300, padding: "0px" }}
          cover={<img alt="" src={imageUrl} />}
        >
          <Skeleton loading={loading}>
            <p>ID: {data.id}</p>
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
