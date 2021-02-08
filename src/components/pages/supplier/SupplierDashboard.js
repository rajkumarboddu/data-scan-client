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

const { Title } = Typography;

const StyledTitle = styled(Title)`
  && {
    color: #dcf0fe;
  }
`;

const ActionCard = styled.div`
  height: 100px;
`;

const ActionCardIconContainer = styled.div`
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ActionCardText = styled.div`
  display: flex;
  align-items: center;
  height: 20%;
  justify-content: center;
  font-size: 14px;
  color: #fff;
`;

const SupplierDashboard = () => {
  const iconStyles = {
    borderRadius: "100%",
    padding: "10px",
    fontSize: "32px",
    color: "#fff",
  };

  return (
    <div style={{ padding: "25px" }}>
      <StyledTitle level={3}>Welcome to Supplier Dashboard!</StyledTitle>
      <Divider style={{ borderTop: "2px solid #1b5482" }} />
      <div style={{ background: "#0f426c", height: "62vh" }}>
        <Row
          gutter={[32, 32]}
          style={{ marginTop: "25px", paddingTop: "25px" }}
        >
          <Col span={4}>
            <ActionCard>
              <ActionCardIconContainer>
                <PieChartOutlined
                  style={{
                    ...iconStyles,
                    background: "#e97f4c",
                  }}
                />
              </ActionCardIconContainer>
              <ActionCardText>Trading Activity</ActionCardText>
            </ActionCard>
          </Col>
          <Col span={4}>
            <ActionCard>
              <ActionCardIconContainer>
                <UsergroupAddOutlined
                  style={{
                    ...iconStyles,
                    background: "#63b35d",
                  }}
                />
              </ActionCardIconContainer>
              <ActionCardText>Duplicate Suppliers</ActionCardText>
            </ActionCard>
          </Col>
          <Col span={4}>
            <ActionCard>
              <ActionCardIconContainer>
                <EnvironmentOutlined
                  style={{
                    ...iconStyles,
                    background: "#d66379",
                  }}
                />
              </ActionCardIconContainer>
              <ActionCardText>Address Validation</ActionCardText>
            </ActionCard>
          </Col>
          <Col span={4}>
            <ActionCard>
              <ActionCardIconContainer>
                <PhoneOutlined
                  style={{
                    ...iconStyles,
                    background: "#3ea0d7",
                  }}
                />
              </ActionCardIconContainer>
              <ActionCardText>Contact Validation</ActionCardText>
            </ActionCard>
          </Col>
          <Col span={4}>
            <ActionCard>
              <ActionCardIconContainer>
                <ShopOutlined
                  style={{
                    ...iconStyles,
                    background: "#a2589c",
                  }}
                />
              </ActionCardIconContainer>
              <ActionCardText>Construction Industry</ActionCardText>
            </ActionCard>
          </Col>
          <Col span={4}>
            <ActionCard>
              <ActionCardIconContainer>
                <SyncOutlined
                  style={{
                    ...iconStyles,
                    background: "#beda54",
                  }}
                />
              </ActionCardIconContainer>
              <ActionCardText>Coming Soon</ActionCardText>
            </ActionCard>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SupplierDashboard;
