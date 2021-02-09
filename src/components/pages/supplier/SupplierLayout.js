import { Button, Image, Row, Col, Menu, Dropdown } from "antd";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Layout } from "antd";
import styled from "styled-components";
import logo from "../../../logo.png";
import { UserOutlined, DownOutlined } from "@ant-design/icons";

import SupplierMenu from "./SupplierMenu";

const { Header, Footer, Sider, Content } = Layout;

const StyledSider = styled(Sider)`
  background: #fff;
`;

const StyledLayout = styled(Layout)`
  background: ${(props) => props.bgColor || "#f8f8f8"};
`;

const StyledHeader = styled(Header)`
  padding: 0px 25px;
  background: ${(props) => props.bgColor || "#fff"};
  ${(props) => (props.bgColor ? "" : props.theme.boxShadow)};
`;

const StyledFooter = styled(Footer)`
  color: ${(props) => (props.layoutBg ? "#fff" : "inherit")};
  padding: 0px 0px 25px 25px;
  background: none;
`;

const StyledLogo = styled(Image)`
  padding: 10px;
  width: 80%;
`;

export default function SupplierLayout(props) {
  const { name } = useSelector((state) => state.user);
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

  const userActionsMenuStyle = {};
  if (props.layoutBg && props.headerBg) {
    userActionsMenuStyle.color = "#fff";
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <StyledSider width={250}>
        <StyledLogo preview={false} src={logo} />
        <SupplierMenu />
      </StyledSider>
      <StyledLayout bgColor={props.layoutBg}>
        <StyledHeader bgColor={props.headerBg}>
          <Row>
            <Col span={8} offset={16}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", right: "0" }}>
                  <Dropdown overlay={userMenu} trigger={["click"]} arrow>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <a
                      className="ant-dropdown-link"
                      onClick={(e) => e.preventDefault()}
                      style={userActionsMenuStyle}
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
          <div style={{ padding: "25px" }}>{props.children}</div>
        </Content>
        <StyledFooter>
          Copyright &copy; {new Date().getFullYear()} ERPDataScan. All rights
          reserved
        </StyledFooter>
      </StyledLayout>
    </Layout>
  );
}
