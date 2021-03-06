import {
  DollarOutlined,
  FileOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const menuItems = [
  {
    key: "dashboard",
    displayName: "Dashboard",
    icon: <HomeOutlined />,
    routePath: "dashboard",
  },
  {
    key: "suppliers",
    displayName: "Suppliers",
    icon: <UsergroupAddOutlined />,
    routePath: "suppliers",
  },
  {
    key: "purchaseOrders",
    displayName: "Purchase Orders",
    icon: <UnorderedListOutlined />,
    routePath: "purchase-orders",
  },
  {
    key: "invoices",
    displayName: "Invoices",
    icon: <FileOutlined />,
    routePath: "invoices",
  },
  {
    key: "payments",
    displayName: "Payments",
    icon: <DollarOutlined />,
    routePath: "payments",
  },
];

const SupplierMenu = (props) => {
  const [activeMenuKey, setActiveMenuKey] = useState([menuItems[1].key]);
  const history = useHistory();
  const openPage = ({ key }) => {
    const { routePath } = menuItems.find((menuItem) => menuItem.key === key);
    setActiveMenuKey([key]);
    history.push(`/${routePath}`);
  };

  return (
    <Menu onClick={openPage} selectedKeys={activeMenuKey}>
      {menuItems.map((menuItem) => {
        return (
          <Menu.Item key={menuItem.key} icon={menuItem.icon}>
            {menuItem.displayName}
          </Menu.Item>
        );
      })}
    </Menu>
  );
};

export default SupplierMenu;
