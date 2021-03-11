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
  Alert,
} from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { PoweroffOutlined } from "@ant-design/icons";
import zipcelx from "zipcelx";
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
  const [deactivationSuccessMsg, setDeactivationSuccessMsg] = useState(null);
  const reportRecords = useRef();
  const durationBtnRef = useRef();

  const columns = [
    {
      title: "Supplier Number",
      dataIndex: "VENDOR_NUM",
      exportable: true,
    },
    {
      title: "Supplier Name",
      dataIndex: "VENDOR_NAME",
      exportable: true,
    },
    {
      title: "Supplier Site",
      dataIndex: "supplierSite",
      exportable: true,
    },
    {
      title: "Purchase Orders Raised",
      dataIndex: "OPEN_PO_AMOUNT",
      exportable: true,
    },
    {
      title: "Receipts Raised",
      dataIndex: "receiptsRaised",
      exportable: true,
    },
    {
      title: "Invoices Raised",
      dataIndex: "OPEN_INVOICE_AMOUNT",
      exportable: true,
    },
    {
      title: "Payments Made",
      dataIndex: "paymentsMade",
      exportable: true,
    },
    {
      title: "Last Trading Activity Date",
      dataIndex: "LAST_TRANSACTION_DATE",
      exportable: true,
    },
    {
      title: "Action",
      dataIndex: "action",
      exportable: false,
    },
  ];

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
    setDeactivationSuccessMsg(null);
    reportRecords.current = null;
    try {
      const { data } = await axios.post("/api/deactivate", {
        VENDOR_IDs: selectedRowKeys,
      });
      const { success: deactivatedKeys } = data;
      setDeactivationSuccessMsg(
        `Successfully deactivated ${deactivatedKeys.length}/${selectedRowKeys.length}`
      );

      // save data to export till alert gets closed
      const selectedRows = dataSource.filter((row) =>
        selectedRowKeys.includes(row.key)
      );
      reportRecords.current = selectedRows.map((sRow) => ({
        ...sRow,
        status: deactivatedKeys.includes(sRow.key) ? "Deactivated" : "Active",
      }));
    } catch (err) {
      message.error("Something went wrong!");
    }
  };

  const exportToExcel = () => {
    if (reportRecords.current) {
      // transform
      const exportableCols = columns.filter((col) => col.exportable);
      const data = reportRecords.current.map((row) => {
        const dataItem = exportableCols.map((col) => ({
          value: `${row[col.dataIndex]}`,
          type: "string",
        }));
        dataItem.push({ value: `${row.status}`, type: "string" });
        return dataItem;
      });
      const headerRow = exportableCols.map((col) => ({
        value: `${col.dataIndex}`,
        type: "string",
      }));
      headerRow.push({ value: "Status", type: "string" });
      data.unshift(headerRow);

      const config = {
        filename: `Deactivation-Report-${new Date().toLocaleString()}`,
        sheet: {
          data,
        },
      };
      zipcelx(config);
    } else {
      message.error("Data is not available to export");
    }
  };

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
        <Row style={{ marginTop: "25px" }}>
          <Col span={10}>
            {deactivationSuccessMsg && (
              <Alert
                message={deactivationSuccessMsg}
                type="success"
                showIcon
                action={
                  <Button size="small" type="link" onClick={exportToExcel}>
                    Download Report
                  </Button>
                }
                closable
                onClose={() => setDeactivationSuccessMsg(null)}
              />
            )}
          </Col>
          <Col
            span={14}
            style={{ display: "flex", justifyContent: "flex-end" }}
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
          </Col>
        </Row>
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
