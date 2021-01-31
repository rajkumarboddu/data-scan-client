import { useState } from "react";
import { Typography, Form, Input, Button, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";

import CenteredCard from "../core/CenteredCard";

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
    <CenteredCard>
      <Title level={4} type="secondary" style={{ marginBottom: "0.15em" }}>
        Welcome to ERP Data Scan!
      </Title>
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
    </CenteredCard>
  );
}
