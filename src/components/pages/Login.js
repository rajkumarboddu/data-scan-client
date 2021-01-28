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

import logo from "../../logo.png";

export default function Login() {
  const { Title, Text } = Typography;
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
          backgroundColor: "#fff",
          WebkitBoxShadow: "0px 0px 15px 5px rgba(232,232,232,1)",
          MozBoxShadow: "0px 0px 15px 5px rgba(232,232,232,1)",
          boxShadow: "0px 0px 15px 5px rgba(232,232,232,1)",
          borderRadius: "8px",
        }}
      >
        <Card bordered={false}>
          <Space direction="vertical" size="large">
            <Image preview={false} src={logo} />
            <Title level={4} type="secondary">
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
            style={{ marginTop: "24px" }}
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
            <Form.Item>
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
