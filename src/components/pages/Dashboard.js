import { Button, Typography, Image, Menu, Row, Col, Dropdown } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Layout } from "antd";
import styled from "styled-components";

import logo from "../../logo.png";
import {
  DollarOutlined,
  FileOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";

const { Header, Footer, Sider, Content } = Layout;

const StyledSider = styled(Sider)`
  background: #fff;
`;

const StyledLayout = styled(Layout)`
  background: #f8f8f8;
  padding: 25px;
`;

const StyledHeader = styled(Header)`
  padding: 0px 25px;
  background: #fff;
  ${(props) => props.theme.boxStyle}
`;

const StyledFooter = styled(Footer)`
  background: #f8f8f8;
  padding: 0px 25px;
`;

const WelcomeCard = styled.div`
  padding: 25px;
  margin-top: 25px;
  ${(props) => props.theme.boxStyle}
`;

const { Title } = Typography;

const StyledTitle = styled(Title)`
  && {
    color: ${(props) => props.theme.primaryColor};
  }
`;

const StyledLogo = styled(Image)`
  padding: 10px;
  width: 80%;
`;

export default function Dashboard() {
  const { name } = useSelector((state) => state.user);
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("accessToken");
    history.push("/");
  };
  const userMenu = (
    <Menu>
      <Menu.Item>
        <Button type="primary" onClick={logout} danger>
          Logout
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <StyledSider width={250}>
        <StyledLogo preview={false} src={logo} />
        <Menu defaultSelectedKeys={["dashboard"]}>
          <Menu.Item key="dashboard" icon={<HomeOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="suppliers" icon={<UsergroupAddOutlined />}>
            Suppliers
          </Menu.Item>
          <Menu.Item key="purchaseOrders" icon={<UnorderedListOutlined />}>
            Purchase Orders
          </Menu.Item>
          <Menu.Item key="invoices" icon={<FileOutlined />}>
            Invoices
          </Menu.Item>
          <Menu.Item key="payments" icon={<DollarOutlined />}>
            Payments
          </Menu.Item>
        </Menu>
      </StyledSider>
      <StyledLayout>
        <StyledHeader>
          <Row>
            <Col span={2} offset={22}>
              <Dropdown overlay={userMenu} trigger={["click"]} arrow>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
                >
                  <UserOutlined style={{ marginRight: "3px" }} />
                  {name || "Supplier"}
                  <DownOutlined style={{ marginLeft: "3px" }} />
                </a>
              </Dropdown>
            </Col>
          </Row>
        </StyledHeader>
        <Content>
          <WelcomeCard>
            <StyledTitle level={3}>Welcome to Supplier Dashboard!</StyledTitle>
          </WelcomeCard>
        </Content>
        <StyledFooter>Footer</StyledFooter>
      </StyledLayout>
    </Layout>
  );
}
