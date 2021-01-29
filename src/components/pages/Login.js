import {
  Row,
  Col,
  Card,
  Image,
  Typography,
  Space,
  Form,
  Input,
  Button,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styled from "styled-components";

import logo from "../../logo.png";

export default function Login() {
  const { Title, Text } = Typography;

  const BgShape = styled.div`
    position: absolute;
    top: ${(props) => props.top};
    left: ${(props) => props.left};
    bottom: ${(props) => props.bottom};
    right: ${(props) => props.right};
    border-radius: 25px;
  `;

  const PurpleShape = styled(BgShape)`
    width: 200px;
    height: 200px;
    background-color: #f2f2f8;
  `;

  const TranspShape = styled(BgShape)`
    width: ${(props) => props.width || "150px"};
    height: ${(props) => props.height || "150px"};
    border: ${(props) => "2px " + (props.borderStyle || "solid") + " #ebeaf7"};
  `;

  return (
    <Row
      gutter={[24, 24]}
      justify="center"
      align="middle"
      style={{ height: "100vh", backgroundColor: "#f8f8f8" }}
    >
      <Col
        xs={20}
        sm={16}
        md={12}
        lg={7}
        style={{
          padding: "0px",
          position: "relative",
          backgroundColor: "#fff",
          WebkitBoxShadow: "0px 0px 15px 5px rgba(232,232,232,1)",
          MozBoxShadow: "0px 0px 15px 5px rgba(232,232,232,1)",
          boxShadow: "0px 0px 15px 5px rgba(232,232,232,1)",
          borderRadius: "8px",
        }}
      >
        <PurpleShape top="-50px" left="-50px" />
        <PurpleShape bottom="-50px" right="-50px" />
        <TranspShape top="-75px" left="25px" />
        <TranspShape
          bottom="-75px"
          width="250px"
          height="250px"
          right="-75px"
          borderStyle="dashed"
        />
        <Card bordered={false} style={{ borderRadius: "8px" }}>
          <Space direction="vertical" size="large">
            <Image preview={false} src={logo} />
            <Title
              level={4}
              type="secondary"
              style={{ marginBottom: "0.15em" }}
            >
              Welcome to ERP Data Scan!
            </Title>
          </Space>
          <Text type="secondary">
            Please sign-in to your account and start the services
          </Text>
          <Form
            name="login-form"
            layout="vertical"
            requiredMark={false}
            style={{ marginTop: "16px" }}
          >
            <Form.Item
              label={
                <>
                  <UserOutlined style={{ marginRight: "5px" }} /> Username
                </>
              }
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
              style={{ marginBottom: "16px" }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={
                <>
                  <LockOutlined style={{ marginRight: "5px" }} /> Password
                </>
              }
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item style={{ marginBottom: "16px" }}>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  backgroundColor: "#28c76f",
                  borderColor: "#28c76f",
                }}
              >
                SUBMIT
              </Button>
            </Form.Item>
          </Form>
          <Link
            style={{ display: "block", textAlign: "center" }}
            to="/forgot-password"
            component={Typography.Link}
          >
            Forgot username/password
          </Link>
        </Card>
      </Col>
    </Row>
  );
}
