import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Route, Routes } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import Login from "../Login/Login";
import Users from "../Users/Users";
import "./styles.css";
import { Button, Layout, Menu, theme } from "antd";
import SidemenuConfig from "./SidemenuConfig";
const { Header, Sider, Content } = Layout;
// import { FaHome, FaInfo, FaServicestack, FaEnvelope } from "react-icons/fa"; // Example icons

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);
  const [showLayout, setShowLayout] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const AccessToken = localStorage.getItem("Accesstoken");

    if (AccessToken) {
      navigate(location.pathname);
      setShowLayout(true);
    } else {
      navigate("/login");
      setShowLayout(false);
    }
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("Accesstoken");
  };

  return (
    <>
      {location.pathname === "/login" ? (
        <>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </>
      ) : showLayout === true ? (
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{ padding: "14px 6px", position: "relative" }}
          >
            <div className="demo-logo-vertical" />
            {/* <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <UserOutlined />,
                  label: "nav 1",
                },
                {
                  key: "2",
                  icon: <VideoCameraOutlined />,
                  label: "nav 2",
                },
                {
                  key: "3",
                  icon: <UploadOutlined />,
                  label: "nav 3",
                },
              ]}
            /> */}
            <SidemenuConfig />
            <div className="logout_container" onClick={handleLogout}>
              <p>Logout</p>
            </div>
          </Sider>
          <Layout>
            <Header
              style={{
                padding: 0,
                background: colorBgContainer,
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
                className="header_collapsebutton"
              />
            </Header>
            <Content
              style={{
                padding: 24,
                minHeight: "100vh",
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path="/users" element={<Users />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      ) : (
        ""
      )}
    </>
  );
};

export default Sidebar;
