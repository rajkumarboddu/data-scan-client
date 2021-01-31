import { useState } from "react";
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
  Alert,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import logo from "../../logo.png";

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

const StyledButton = styled(Button)`
  font-weight: bold;
  &.ant-btn-primary {
    width: 100%;
    background: #28c76f;
    border-color: #28c76f;
  }
  &.ant-btn-primary[disabled] {
    color: white;
    &:hover {
      background: #28c76f;
      border-color: #28c76f;
    }
  }
`;

const StyledCol = styled(Col)`
  position: relative;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 15px 5px rgba(232, 232, 232, 1);
  -moz-box-shadow: 0px 0px 15px 5px rgba(232, 232, 232, 1);
  box-shadow: 0px 0px 15px 5px rgba(232, 232, 232, 1);
  border-radius: 8px;
`;

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const { Title, Text } = Typography;

  const onSubmit = () => {
    setError("");
    setInProgress(true);
    setTimeout(() => {
      if (username === "admin" && password === "admin") {
        localStorage.setItem("accessToken", "some-random-access-token");
        history.push("/dashboard");
      } else {
        setError("Invalid credentials");
        setInProgress(false);
      }
    }, 2000);
  };

  return (
    <Row
      gutter={[24, 24]}
      justify="center"
      align="middle"
      style={{ height: "100vh", backgroundColor: "#f8f8f8" }}
    >
      <StyledCol xs={20} sm={16} md={12} lg={7} style={{ padding: "0px" }}>
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
          {error && (
            <Alert
              message={error}
              style={{ marginTop: "8px" }}
              type="error"
              showIcon
            />
          )}
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
              <Input
                disabled={inProgress}
                onChange={(event) => setUsername(event.target.value)}
              />
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
              <Input.Password
                disabled={inProgress}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: "16px" }}>
              <StyledButton
                type="primary"
                htmlType="submit"
                onClick={onSubmit}
                disabled={inProgress}
                loading={inProgress}
              >
                {!inProgress && "SUBMIT"}
              </StyledButton>
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
      </StyledCol>
    </Row>
  );
}
