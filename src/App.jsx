import React from "react";
import Layout from "/src/components/Layout";
import { ConfigProvider } from "antd";
import faIR from "antd/locale/fa_IR";

function App() {
  return (
    <ConfigProvider direction="rtl" locale={faIR}>
      <Layout />
    </ConfigProvider>
  );
}

export default App;
