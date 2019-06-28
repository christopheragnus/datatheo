import React from "react";
import { Router, Link } from "@reach/router";
import "antd/dist/antd.css";
import "./App.css";

import List from "./components/List";
import New from "./components/New";
import Show from "./components/Show";
import { TestTable } from "./components/Table-test";

import { Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <div>
      <Layout>
        <Header style={{ position: "fixed", zIndex: 1, width: "100%" }}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">
              <Link to="/">List</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/new">New Employee</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px", marginTop: 100 }}>
          <div
            style={{
              background: "#fff",
              padding: 24,
              minHeight: 380,
              marginTop: "16px"
            }}
          >
            <Router>
              <List path="/" />
              <New path="/new" />
              <Show path="/show/:id" />
              <TestTable path="/test" />
            </Router>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Employee Dashboard by Christopher Lam
        </Footer>
      </Layout>
    </div>
  );
}

export default App;
