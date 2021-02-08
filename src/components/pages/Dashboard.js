import { Button, Image, Row, Col, Menu, Dropdown } from "antd";
import { useSelector } from "react-redux";
import { Route, Switch, useHistory, useRouteMatch } from "react-router-dom";
import { Layout } from "antd";
import styled from "styled-components";
import logo from "../../logo.png";
import { UserOutlined, DownOutlined } from "@ant-design/icons";

import SupplierMenu from "./supplier/SupplierMenu";
import SupplierDashboard from "./supplier/SupplierDashboard";
import Suppliers from "./supplier/Suppliers";

const { Header, Footer, Sider, Content } = Layout;

const StyledSider = styled(Sider)`
  background: #fff;
`;

const StyledLayout = styled(Layout)`
  background: #124b7b;
`;

const StyledHeader = styled(Header)`
  padding: 0px 25px;
  background: #0f426c;
`;

const StyledFooter = styled(Footer)`
  color: #fff;
  padding-left: 25px;
  background: none;
`;

const StyledLogo = styled(Image)`
  padding: 10px;
  width: 80%;
`;

export default function Dashboard(props) {
  const { name } = useSelector((state) => state.user);
  const history = useHistory();
  const { path } = useRouteMatch();
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
        <SupplierMenu />
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
                      style={{ color: "#fff" }}
                    >
                      <UserOutlined style={{ marginRight: "3px" }} />
                      {name}
                      <DownOutlined style={{ marginLeft: "8px" }} />
                    </a>
                  </Dropdown>
                </div>
              </div>
            </Col>
          </Row>
        </StyledHeader>
        <Content>
          <Switch>
            <Route path={path} exact>
              <SupplierDashboard />
            </Route>
            <Route path={`${path}/suppliers`}>
              <Suppliers />
            </Route>
          </Switch>
        </Content>
        <StyledFooter>
          Copyright &copy; {new Date().getFullYear()} ERPDataScan. All rights
          reserved
        </StyledFooter>
      </StyledLayout>
    </Layout>
  );
}
