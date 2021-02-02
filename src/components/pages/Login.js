import { useState } from "react";
import { Typography, Form, Input, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";

import CenteredCard from "../core/CenteredCard";
import CardButton from "../core/CardButton";
import ACCESS_TOKEN from "../../utils/constants";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  const { Title, Text } = Typography;

  const onSubmit = async () => {
    if (username !== "" && password !== "") {
      setError("");
      setInProgress(true);
      try {
        const { data } = await axios.post("/api/auth/signin", {
          username,
          password,
        });
        if (data.accessToken) {
          localStorage.setItem(ACCESS_TOKEN, data.accessToken);
          // TODO :: save user info to store
          history.push("/dashboard");
        } else {
          setError("Something went wrong!");
          setInProgress(false);
        }
      } catch (err) {
        setInProgress(false);
        if (err.code) {
          setError("Invalid credentials");
        } else {
          setError("Something went wrong!");
        }
      }
    }
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
          <CardButton
            type="primary"
            htmlType="submit"
            onClick={onSubmit}
            loading={inProgress}
            block
          >
            {!inProgress && "SUBMIT"}
          </CardButton>
        </Form.Item>
      </Form>
      <Link
        style={{ display: "block", textAlign: "center", color: "#968ef4" }}
        to="/forgot-password"
      >
        Forgot username/password
      </Link>
    </CenteredCard>
  );
}
