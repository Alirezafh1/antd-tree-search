//#region Imports
import React, { useState, useMemo } from "react";
import { Menu, Input, Switch, Space, Layout } from "antd";

//Icons
import {
  FolderOutlined,
  FileOutlined,
  SearchOutlined,
} from "@ant-design/icons";

// Extract Sider from AntD Layout
const { Sider } = Layout;
//#endregion

export default function Sidebar({ menuData }) {
  //#region States
  const [searchText, setSearchText] = useState("");
  const [exactMatch, setExactMatch] = useState(false);
  const [searchOnlyLeaves, setSearchOnlyLeaves] = useState(false);
  //#endregion

  //#region Functions
  // Add loose matching for fuzzy search
  const isLooseMatch = (text, target) => {
    const letters = text.split("").filter((c) => c.trim() !== " ");
    let currentIndex = 0;

    for (let i = 0; i < letters.length; i++) {
      const foundIndex = target.indexOf(letters[i], currentIndex);
      if (foundIndex === -1) return false;
      currentIndex = foundIndex + 1;
    }

    return true;
  };

  // Implement recursive search filtering logic
  const filteredData = useMemo(() => {
    if (!searchText) return menuData;

    const filterItems = (items) => {
      return items
        .filter((item) => {
          const matchesSearch = exactMatch
            ? item.name === searchText
            : isLooseMatch(searchText, item.name);

          const childrenMatch =
            item.children && filterItems(item.children).length > 0;

          if (searchOnlyLeaves) {
            return item.isFinal ? matchesSearch : childrenMatch;
          }

          return matchesSearch || childrenMatch;
        })
        .map((item) => ({
          ...item,
          children: item.children ? filterItems(item.children) : null,
        }));
    };

    return {
      ...menuData,
      children: filterItems(menuData.children),
    };
  }, [menuData, searchText, exactMatch, searchOnlyLeaves]);

  // Render nested menu items recursively
  const renderMenuItems = (data) => {
    if (data.isFinal) {
      return (
        <Menu.Item key={data.id} icon={<FileOutlined />}>
          {data.name}
        </Menu.Item>
      );
    }

    return (
      <Menu.SubMenu key={data.id} icon={<FolderOutlined />} title={data.name}>
        {data.children && data.children.map((child) => renderMenuItems(child))}
      </Menu.SubMenu>
    );
  };
  //#endregion

  //#region JSX
  return (
    <Sider width={300} style={{ background: "#fff" }}>
      <div style={{ padding: "16px" }}>
        <Input
          placeholder="جستجو..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBottom: "16px" }}
        />

        <Space
          direction="vertical"
          style={{ width: "100%", marginBottom: "16px" }}
        >
          <div>
            <Switch checked={exactMatch} onChange={setExactMatch} />
            <span style={{ marginRight: "8px" }}>جستجو عین عبارت</span>
          </div>
          <div>
            <Switch checked={searchOnlyLeaves} onChange={setSearchOnlyLeaves} />
            <span style={{ marginRight: "8px" }}>جستجو در عنوان فرم‌ها</span>
          </div>
        </Space>
      </div>

      <Menu
        mode="inline"
        defaultSelectedKeys={["4"]}
        defaultOpenKeys={["1", "2", "3", "8"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        {filteredData && renderMenuItems(filteredData)}
      </Menu>
    </Sider>
  );
  //#endregion
}
