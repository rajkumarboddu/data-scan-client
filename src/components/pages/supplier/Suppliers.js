import styled from "styled-components";
import { Typography, Row, Col, Divider } from "antd";
import {
  UsergroupAddOutlined,
  EnvironmentOutlined,
  PieChartOutlined,
  PhoneOutlined,
  ShopOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import SupplierLayout from "./SupplierLayout";
import { Switch, useHistory, useRouteMatch, Route } from "react-router-dom";
import TradingActivity from "./TradingActivity";

const { Title } = Typography;

const StyledTitle = styled(Title)`
  && {
    color: #dcf0fe;
  }
`;

const ActionCard = styled.div`
  height: 125px;
  transition: all 0.5s ease-in-out;
  &:hover {
    background: #124b7b;
    cursor: pointer;
  }
`;

const ActionCardIconContainer = styled.div`
  height: 70%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActionCardText = styled.div`
  display: flex;
  align-items: center;
  height: 30%;
  justify-content: center;
  font-size: 14px;
  color: #fff;
`;

const Suppliers = (props) => {
  const history = useHistory();
  const { path } = useRouteMatch();
  let layoutBg, headerBg;
  if (props.location.pathname === "/suppliers") {
    layoutBg = "#124b7b";
    headerBg = "#0f426c";
  }

  const iconStyles = {
    borderRadius: "100%",
    padding: "10px",
    fontSize: "32px",
    color: "#fff",
  };

  const links = [
    {
      text: "Trading Activity",
      icon: (
        <PieChartOutlined
          style={{
            ...iconStyles,
            background: "#e97f4c",
          }}
        />
      ),
      routeKey: "trading-activity",
    },
    {
      text: "Duplicate Suppliers",
      icon: (
        <UsergroupAddOutlined
          style={{
            ...iconStyles,
            background: "#63b35d",
          }}
        />
      ),
      routeKey: "duplicate-suppliers",
    },
    {
      text: "Address Validation",
      icon: (
        <EnvironmentOutlined
          style={{
            ...iconStyles,
            background: "#d66379",
          }}
        />
      ),
      routeKey: "address-validation",
    },
    {
      text: "Contact Validation",
      icon: (
        <PhoneOutlined
          style={{
            ...iconStyles,
            background: "#3ea0d7",
          }}
        />
      ),
      routeKey: "contact-validation",
    },
    {
      text: "Construction Industry",
      icon: (
        <ShopOutlined
          style={{
            ...iconStyles,
            background: "#a2589c",
          }}
        />
      ),
      routeKey: "construction-industry",
    },
    {
      text: "Coming Soon",
      icon: (
        <SyncOutlined
          style={{
            ...iconStyles,
            background: "#beda54",
          }}
        />
      ),
      routeKey: "coming-soon",
    },
  ];

  const openPage = (routeKey) => {
    history.push(`${path}/${routeKey}`);
  };

  const DashboardContent = () => (
    <div>
      <StyledTitle level={3}>Welcome to Supplier Dashboard!</StyledTitle>
      <Divider style={{ borderTop: "2px solid #1b5482" }} />
      <div style={{ background: "#0f426c", height: "62vh" }}>
        <Row
          gutter={[32, 32]}
          style={{ marginTop: "25px", paddingTop: "25px" }}
        >
          {links.map((link) => (
            <Col span={4} key={link.routeKey}>
              <ActionCard onClick={() => openPage(link.routeKey)}>
                <ActionCardIconContainer>{link.icon}</ActionCardIconContainer>
                <ActionCardText>{link.text}</ActionCardText>
              </ActionCard>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );

  return (
    <SupplierLayout layoutBg={layoutBg} headerBg={headerBg}>
      <Switch>
        <Route exact path={path}>
          <DashboardContent />
        </Route>
        <Route path={`${path}/trading-activity`}>
          <TradingActivity />
        </Route>
      </Switch>
    </SupplierLayout>
  );
};

export default Suppliers;
