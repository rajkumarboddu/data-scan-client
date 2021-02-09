import {
  Card,
  Divider,
  Typography,
  Breadcrumb,
  Row,
  Col,
  Select,
  Button,
  Table,
} from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";
import { PoweroffOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

const StyledCard = styled(Card)`
  margin-top: 13px;
  ${(props) => props.theme.boxStyle};
  min-height: 65vh;
`;

const StyledTitle = styled(Title)`
  && {
    color: #787878;
  }
  display: inline-block;
`;

const StyledVerticalDivider = styled(Divider)`
  border-left: 1px solid #888888;
  height: 25px;
  top: -0.25em;
  margin: 0px 15px;
`;

const TradingActivity = () => {
  const [duration, setDuration] = useState();

  const onDurationSubmit = () => {
    console.log("Selected duration: ", duration);
  };

  const dataSource = [];
  const columns = [
    {
      title: "Select All",
      dataIndex: "selectAll",
    },
    {
      title: "Supplier Number",
      dataIndex: "supplierNumber",
    },
    {
      title: "Supplier Name",
      dataIndex: "supplierName",
    },
    {
      title: "Supplier Site",
      dataIndex: "supplierSite",
    },
    {
      title: "Purchase Orders Raised",
      dataIndex: "purchaseOrdersRaised",
    },
    {
      title: "Receipts Raised",
      dataIndex: "receiptsRaised",
    },
    {
      title: "Invoices Raised",
      dataIndex: "invoicesRaised",
    },
    {
      title: "Payments Made",
      dataIndex: "paymentsMade",
    },
    {
      title: "Last Trading Activity Date",
      dataIndex: "lastTradingActivityDate",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  return (
    <>
      <StyledTitle level={3}>Trading Activity</StyledTitle>
      <StyledVerticalDivider type="vertical" />
      <Breadcrumb separator=">" style={{ display: "inline-block" }}>
        <Breadcrumb.Item>
          <Link to="/suppliers" style={{ color: "#40a9ff" }}>
            Suppliers
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item style={{ color: "#787878" }}>
          Trading Activity
        </Breadcrumb.Item>
      </Breadcrumb>
      <StyledCard>
        <Row>
          <Col span={12}>
            <StyledTitle level={5}>Trading Activity List</StyledTitle>
          </Col>
          <Col
            span={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Select
              placeholder="Select Duration"
              onChange={(value) => setDuration(value)}
              style={{ width: 150, marginRight: "25px" }}
            >
              <Option value="6">6 Months</Option>
              <Option value="12">12 Months</Option>
              <Option value="18">18 Months</Option>
              <Option value="24">24 Months</Option>
            </Select>
            <Button type="primary" onClick={onDurationSubmit}>
              Submit
            </Button>
          </Col>
        </Row>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "25px",
          }}
        >
          <Button type="primary" danger disabled={dataSource.length === 0}>
            <PoweroffOutlined />
            Deactivate All
          </Button>
        </div>
        <Table
          bordered
          rowSelection={{ type: "checkbox" }}
          dataSource={dataSource}
          columns={columns}
          style={{ marginTop: "25px" }}
        ></Table>
      </StyledCard>
    </>
  );
};

export default TradingActivity;
