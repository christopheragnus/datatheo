import React, { Component } from "react";
import {
  Alert,
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from "antd";

import { db } from "../utils/firebase";
import { Router, Link, navigate } from "@reach/router";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

class New extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      error: false
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        const { firstName, lastName, salary, title, department } = values;

        db.collection("users")
          .add({
            first: firstName,
            last: lastName,
            salary,
            title,
            department
          })
          .then(docRef => {
            console.log("Document written with ID: ", docRef.id);
            this.setState({ message: "User successfully created!" });
            //navigate("/");
          })
          .catch(error => {
            console.error("Error adding document: ", error);
            this.setState({ message: "An error occurred!", error: true });
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { message, error } = this.state;

    return (
      <div>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
          <Form.Item label="First Name">
            {getFieldDecorator("firstName")(<Input />)}
          </Form.Item>
          <Form.Item label="Last Name">
            {getFieldDecorator("lastName")(<Input />)}
          </Form.Item>
          <Form.Item label="Title">
            {getFieldDecorator("title")(<Input />)}
          </Form.Item>
          <Form.Item label="Salary">
            {getFieldDecorator("salary")(<Input />)}
          </Form.Item>
          <Form.Item label="Department">
            {getFieldDecorator("department")(<Input />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>

        {message ? (
          <Alert
            message={message}
            type={error ? "error" : "success"}
            showIcon
          />
        ) : null}
      </div>
    );
  }
}

export default Form.create()(New);
