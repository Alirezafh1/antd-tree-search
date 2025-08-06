//#region Imports
import React, { useState, useEffect } from "react";
import { Layout, Spin } from "antd";
import Sidebar from "./Sidebar";
import axios from "axios";

// Extract Content from AntD Layout
const { Content } = Layout;
//#endregion

export default function AppLayout() {
  //#region States
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);
  //#endregion

  // Fetch menu data on mount
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/treeData");
        setMenuData(response.data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, []);

  // Show spinner while loading
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  //#region JSX
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar menuData={menuData} />
      <Layout>
        <Content style={{ padding: "24px", background: "#fff" }}>
          <div style={{ background: "#fff", padding: 24, minHeight: 360 }}>
            محتوای اصلی برنامه
          </div>
        </Content>
      </Layout>
    </Layout>
  );
  //#endregion
}
