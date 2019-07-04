import React from "react";
import { Router, Link } from "@reach/router";
import dotenv from "dotenv";

import "antd/dist/antd.css";
import "./App.css";

import List from "./components/List";
import New from "./components/New";
import Show from "./components/Show";

import { ListContextProvider } from "./utils/Context";

import { Layout, Menu } from "antd";
const { Header, Content, Footer } = Layout;

dotenv.config();

const initialState = {
  selectedPage: 1,
  selectedRow: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updatePage":
      return {
        ...state,
        selectedPage: action.payload
      };
    case "updateRow":
      return {
        ...state,
        selectedRow: action.payload
      };

    default:
      return state;
  }
};

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
            <ListContextProvider initialState={initialState} reducer={reducer}>
              <Router>
                <List path="/" />
                <New path="/new" />
                <Show path="/show/:id" />
              </Router>
            </ListContextProvider>
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
