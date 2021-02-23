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
  message,
} from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { PoweroffOutlined } from "@ant-design/icons";
import axios from "../../../utils/axios";

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
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const durationBtnRef = useRef();

  const onDurationSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/api/trading/${duration * 30}`);
      let source = [];
      if (data?.DATA_DS?.G_1) {
        source = data.DATA_DS.G_1.map((record) => ({
          key: record.VENDOR_ID,
          ...record,
        }));
      }
      if (source.length === 0) {
        message.info("Received empty results!");
      }
      setDataSource(source);
      setSelectedRowKeys([]);
      setLoading(false);
    } catch (err) {
      message.error("Unable to fetch records!");
      setLoading(false);
    }
  };

  const deactivate = async () => {
    console.log(selectedRowKeys);
    try {
      await axios.post("/api/deactivate", { VENDOR_IDs: selectedRowKeys });
      message.success("Deactivated successfully");
      setSelectedRowKeys([]);
      durationBtnRef.current.click();
    } catch (err) {
      message.error("Something went wrong!");
    }
  };

  const columns = [
    {
      title: "Supplier Number",
      dataIndex: "VENDOR_NUM",
    },
    {
      title: "Supplier Name",
      dataIndex: "VENDOR_NAME",
    },
    {
      title: "Supplier Site",
      dataIndex: "supplierSite",
    },
    {
      title: "Purchase Orders Raised",
      dataIndex: "OPEN_PO_AMOUNT",
    },
    {
      title: "Receipts Raised",
      dataIndex: "receiptsRaised",
    },
    {
      title: "Invoices Raised",
      dataIndex: "OPEN_INVOICE_AMOUNT",
    },
    {
      title: "Payments Made",
      dataIndex: "paymentsMade",
    },
    {
      title: "Last Trading Activity Date",
      dataIndex: "LAST_TRANSACTION_DATE",
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
              onChange={(value) => setDuration(+value)}
              style={{ width: 150, marginRight: "25px" }}
            >
              <Option value="6">6 Months</Option>
              <Option value="12">12 Months</Option>
              <Option value="18">18 Months</Option>
              <Option value="24">24 Months</Option>
            </Select>
            <Button
              ref={durationBtnRef}
              loading={loading}
              type="primary"
              onClick={onDurationSubmit}
            >
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
          <Button
            type="primary"
            danger
            disabled={dataSource.length === 0 || selectedRowKeys.length === 0}
            onClick={deactivate}
          >
            <PoweroffOutlined />
            Deactivate All
          </Button>
        </div>
        <Table
          bordered
          rowSelection={{
            type: "checkbox",
            selectedRowKeys: selectedRowKeys,
            onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys),
          }}
          dataSource={dataSource}
          columns={columns}
          style={{ marginTop: "25px" }}
          loading={loading}
        ></Table>
      </StyledCard>
    </>
  );
};

export default TradingActivity;
