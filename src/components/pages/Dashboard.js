import { Button, Typography } from "antd";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
  const { Title } = Typography;
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("accessToken");
    history.push("/");
  };
  return (
    <>
      <Title level={4} type="primary">
        Welcome to ERP Data Scan!
      </Title>
      <Button type="primary" danger onClick={logout}>
        Logout
      </Button>
    </>
  );
}
