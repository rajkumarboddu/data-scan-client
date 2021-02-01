import { LeftOutlined, LockOutlined } from "@ant-design/icons";
import { Alert, Typography, Form, Input, Button } from "antd";
import { useState } from "react";

import CenteredCard from "../core/CenteredCard";
import CardButton from "../core/CardButton";
import { useHistory } from "react-router-dom";

export default function ForgotCredentials() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState("");
  const [inProgress, setInProgress] = useState(false);
  const history = useHistory();
  const { Title, Text } = Typography;

  const onSubmit = () => {
    setSuccess("");
    setError("");
    setInProgress(true);
    setTimeout(() => {
      if (email === "abc@test.com") {
        setEmail("");
        setSuccess("Reset password link has been sent to your email");
      } else {
        setError("Couldn't find account with the provided email");
      }
      setInProgress(false);
    }, 2000);
  };

  return (
    <CenteredCard>
      <Title level={4} type="secondary" style={{ marginBottom: "0.15em" }}>
        Forgot Password? <LockOutlined />
      </Title>
      <Text type="secondary">
        Enter email and we'll send you instructions to reset your password
      </Text>
      {error && (
        <Alert
          message={error}
          style={{ marginTop: "8px" }}
          type="error"
          showIcon
        />
      )}
      {success && (
        <Alert
          message={success}
          style={{ marginTop: "8px" }}
          type="success"
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
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
          style={{ marginBottom: "16px" }}
        >
          <Input
            type="email"
            disabled={inProgress}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="john@example.com"
            value={email}
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
            {!inProgress && "Send reset link"}
          </CardButton>
        </Form.Item>
      </Form>
      <Button
        type="link"
        block
        style={{ color: "#968ef4" }}
        onClick={() => history.push("/")}
      >
        <LeftOutlined /> Back to login
      </Button>
    </CenteredCard>
  );
}
