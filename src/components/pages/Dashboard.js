import { Button, Typography, Image, Menu, Row, Col, Dropdown } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Layout } from "antd";
import styled, { ThemeContext } from "styled-components";

import logo from "../../logo.png";
import {
  DollarOutlined,
  FileOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  UserOutlined,
  DownOutlined,
  EnvironmentOutlined,
  PieChartOutlined,
  PhoneOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { useContext } from "react";

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
  padding: 25px 25px 0px 25px;
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

const ActionCard = styled.div`
  height: 150px;
  ${(props) => props.theme.boxStyle};
`;

const ActionCardIconContainer = styled.div`
  height: 40%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const ActionCardText = styled.div`
  display: flex;
  align-items: center;
  height: 60%;
  justify-content: center;
  font-size: 18px;
`;

export default function Dashboard(props) {
  const { name } = useSelector((state) => state.user);
  const themeContext = useContext(ThemeContext);
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push("/");
  };
  const userMenu = (
    <Menu>
      <Menu.Item>
        <Button type="primary" block onClick={logout} danger>
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
            <Col span={8} offset={16}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", right: "0" }}>
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
                </div>
              </div>
            </Col>
          </Row>
        </StyledHeader>
        <Content>
          <WelcomeCard>
            <StyledTitle level={3}>Welcome to Supplier Dashboard!</StyledTitle>
            <div>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </WelcomeCard>
          <Row gutter={[32, 32]} style={{ marginTop: "25px" }}>
            <Col span={6}>
              <ActionCard>
                <ActionCardIconContainer>
                  <UsergroupAddOutlined
                    style={{
                      fontSize: "32px",
                      color: themeContext.primaryColor,
                    }}
                  />
                </ActionCardIconContainer>
                <ActionCardText>Duplicate Suppliers</ActionCardText>
              </ActionCard>
            </Col>
            <Col span={6}>
              <ActionCard>
                <ActionCardIconContainer>
                  <EnvironmentOutlined
                    style={{
                      fontSize: "32px",
                      color: "#ff9f44",
                    }}
                  />
                </ActionCardIconContainer>
                <ActionCardText>Address Validation</ActionCardText>
              </ActionCard>
            </Col>
            <Col span={6}>
              <ActionCard>
                <ActionCardIconContainer>
                  <PieChartOutlined
                    style={{
                      fontSize: "32px",
                      color: "#28c76f",
                    }}
                  />
                </ActionCardIconContainer>
                <ActionCardText>Trading Activity</ActionCardText>
              </ActionCard>
            </Col>
            <Col span={6}>
              <ActionCard>
                <ActionCardIconContainer>
                  <PhoneOutlined
                    style={{
                      fontSize: "32px",
                      color: "#00d0e8",
                    }}
                  />
                </ActionCardIconContainer>
                <ActionCardText>Contact Validation</ActionCardText>
              </ActionCard>
            </Col>
            <Col span={6}>
              <ActionCard>
                <ActionCardIconContainer>
                  <ShopOutlined
                    style={{
                      fontSize: "32px",
                      color: "#e95555",
                    }}
                  />
                </ActionCardIconContainer>
                <ActionCardText>Construction Industry</ActionCardText>
              </ActionCard>
            </Col>
          </Row>
        </Content>
        <StyledFooter>
          Copyright &copy; {new Date().getFullYear()} ERPDataScan. All rights
          reserved
        </StyledFooter>
      </StyledLayout>
    </Layout>
  );
}
