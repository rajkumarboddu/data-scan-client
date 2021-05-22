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
  Image,
  Spin
} from "antd";
import styled from "styled-components";
import moment from "moment";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { PoweroffOutlined } from "@ant-design/icons";
import zipcelx from "zipcelx";
import axios from "../../../utils/axios";
import excelDownloadIcon from "../../../static-assets/excel-download-icon.svg";
import download from "downloadjs";

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

const StyledTable = styled(Table)`
  & .ant-table-container {
    overflow: auto;
  }

  & table {
    font-size: 0.9em;
  }

  & table thead th {
    position: relative;

    & .table-header-gutter {
      position: absolute;
      width: 5px;
      right: -1px;
      top: 0px;
      height: 100%;
      z-index: 9999;
      user-select: none;
      cursor: ew-resize;
    }
  }
`;

const DownloadExcel = styled.div`
  border: 0px solid #09743b;
  display: flex;
  align-items: center;
  border-radius: 100%;
  width: 32px;
  height: 32px;
  justify-content: space-around;
  margin-right: 15px;
  cursor: pointer;
  transition: 0.05s;

  &:hover {
    border-width: 0.5px;

    .ant-image-img {
      width: 20px;
      height: 20px;
    }
  }

  &[disabled] {
    background: #f5f5f5;
    border-color: #d9d9d9;
    opacity: 0.5;
    border-width: 0.5px;

    .ant-image-img {
      width: 20px;
      height: 20px;
    }
  }
`;

const ExcelDownloadOption = (props) => {

  const { duration } = props;
  const [loading, setLoading] = useState(false);

  const downloadExcel = async () => {
    if(!duration) {
      message.info("Please select the duration!");
      return;
    }
    setLoading(true);
    const durationInDays = duration * 30;
    const resp = await axios.get(`/api/trading/download/${durationInDays}/tradingActivity.xlsm`, { responseType: "blob"});
    const mimeType = resp.headers["content-type"] || "application/vnd.ms-excel.sheet.macroEnabled.12";
    const fileName = resp.headers["content-disposition"]?.split(";")
                      .filter(part => part.trim().startsWith("filename="))[0].trim()
                      .replace("filename=", "") || `trading-activity-${durationInDays}days`;
    download(resp.data, fileName, mimeType);
    setLoading(false);
  };
  
  return (
    <>
      { loading && <Spin style={{paddingTop: "6px", marginRight: "10px"}} /> }
      <DownloadExcel onClick={downloadExcel} disabled={loading}>
        <Image style={{}} preview={false} src={excelDownloadIcon} />
      </DownloadExcel>
    </>
  )
}

/*
// Written for col resizing
const HeaderCell = (props) => {
  const pageXonMouseDownRef = useRef();
  const headerContentRef = useRef();
  const originalWidthRef = useRef();
  const [width, setWidth] = useState();

  const stopClickEvtPropagation = (evt) => {
    evt.stopPropagation();
  };

  const onMouseMoveHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (pageXonMouseDownRef.current) {
      const newWidth = e.pageX - pageXonMouseDownRef.current + width;
      if (newWidth > originalWidthRef.current) {
        setWidth(newWidth);
      }
    }
  };

  const mouseUpHandler = (e) => {
    props.setTableScroll({ x: "100vw", y: 350 });
    e.preventDefault();
    e.stopPropagation();
    pageXonMouseDownRef.current = null;
    document.removeEventListener("mousemove", onMouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
    setTimeout(() => {
      document.removeEventListener("click", stopClickEvtPropagation, {
        capture: true,
      });
    }, 100);
  };

  useEffect(() => {
    originalWidthRef.current = headerContentRef.current.offsetWidth;
    setWidth(originalWidthRef.current);
    return () => {
      document.removeEventListener("mouseup", mouseUpHandler);
      document.removeEventListener("mousemove", onMouseMoveHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onMouseDownHandler = (e) => {
    props.setTableScroll(undefined);
    e.stopPropagation();
    document.addEventListener("click", stopClickEvtPropagation, {
      capture: true,
    });
    pageXonMouseDownRef.current = e.pageX;
    document.addEventListener("mousemove", onMouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  return (
    <div ref={headerContentRef} style={{ width: `${width}px` }}>
      {props.children}
      <div
        className="table-header-gutter"
        onMouseDown={onMouseDownHandler}
      ></div>
    </div>
  );
};
*/

const TradingActivity = () => {
  const [duration, setDuration] = useState();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [deactivateInProgress, setDeactivateInProgress] = useState(false);
  const [deactivationSuccessMsg, setDeactivationSuccessMsg] = useState(null);
  const reportRecords = useRef();
  const durationBtnRef = useRef();

  const sortFn = (dataIndex, type = "string") => {
    switch (type) {
      case "number": {
        return (a, b) => {
          return +a[dataIndex] - +b[dataIndex];
        };
      }
      case "string":
      default: {
        return (a, b) => {
          return `${a[dataIndex]}`.localeCompare(b[dataIndex]);
        };
      }
    }
  };

  const dateFormatterRenderer = (value) => {
    const momentObj = moment(value, "YYYY-MM-DD");
    return {
      children: momentObj.isValid() ? momentObj.format("DD-MM-YYYY") : value,
    };
  };

  const columns = [
    {
      title: "Supplier Number",
      dataIndex: "VENDOR_NUM",
      exportable: true,
      sorter: sortFn("VENDOR_NUM"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Supplier Name",
      dataIndex: "VENDOR_NAME",
      exportable: true,
      sorter: sortFn("VENDOR_NAME"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Last Requisition Date",
      dataIndex: "LAST_REQUISITION_DATE",
      exportable: true,
      sorter: sortFn("LAST_REQUISITION_DATE"),
      sortDirections: ["descend", "ascend"],
      render: dateFormatterRenderer,
    },
    {
      title: "Purchase Orders Raised",
      dataIndex: "OPEN_PO_AMOUNT",
      sorter: sortFn("OPEN_PO_AMOUNT", "number"),
      sortDirections: ["descend", "ascend"],
      exportable: true,
    },
    {
      title: "Last PO Creation Date",
      dataIndex: "LAST_PO_CREATION_DATE",
      exportable: true,
      render: dateFormatterRenderer,
      sorter: sortFn("LAST_PO_CREATION_DATE"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Receipts Raised",
      dataIndex: "RECEIPT_AMOUNT",
      sorter: sortFn("RECEIPT_AMOUNT", "number"),
      sortDirections: ["descend", "ascend"],
      exportable: true,
    },
    {
      title: "Invoices Raised",
      dataIndex: "OPEN_INVOICE_AMOUNT",
      sorter: sortFn("OPEN_INVOICE_AMOUNT", "number"),
      sortDirections: ["descend", "ascend"],
      exportable: true,
    },
    {
      title: "Last Invoice Creation Date",
      dataIndex: "LAST_INVOICE_CREATION_DATE",
      exportable: true,
      render: dateFormatterRenderer,
      sorter: sortFn("LAST_INVOICE_CREATION_DATE"),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Payments Made",
      dataIndex: "PAYMENT_AMOUNT",
      sorter: sortFn("PAYMENT_AMOUNT", "number"),
      sortDirections: ["descend", "ascend"],
      exportable: true,
    },
    {
      title: "Last Payment Date",
      dataIndex: "LAST_PAYMENT_DATE",
      render: dateFormatterRenderer,
      sorter: sortFn("LAST_PAYMENT_DATE"),
      sortDirections: ["descend", "ascend"],
      exportable: true,
    },
    {
      title: "Last Trading Activity Date",
      dataIndex: "LAST_TRANSACTION_DATE",
      render: dateFormatterRenderer,
      sorter: sortFn("LAST_TRANSACTION_DATE"),
      sortDirections: ["descend", "ascend"],
      exportable: true,
    },
    // commeting out for now
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   exportable: false,
    // },
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
    } catch (err) {
      message.error("Unable to fetch records!");
    } finally {
      setLoading(false);
    }
  };

  const deactivate = async () => {
    setDeactivationSuccessMsg(null);
    setDeactivateInProgress(true);
    reportRecords.current = null;
    try {
      const { data } = await axios.post("/api/deactivate", {
        VENDOR_IDs: selectedRowKeys,
      });
      const { success: deactivatedKeys } = data;
      setDeactivationSuccessMsg(
        `Successfully deactivated ${deactivatedKeys.length}/${selectedRowKeys.length}`
      );

      // uncheck deactivated rows
      setSelectedRowKeys((currentSelectedRowKeys) => {
        console.log(selectedRowKeys, deactivatedKeys);
        return currentSelectedRowKeys.filter(
          (rowKey) => !deactivatedKeys.includes(`${rowKey}`)
        );
      });
      // disabled deactivated rows
      setDataSource((currentDataSource) => {
        return currentDataSource.map((row) => {
          return {
            ...row,
            // eslint-disable-next-line eqeqeq
            deactivationStatus: deactivatedKeys.some((dKey) => row.key == dKey),
          };
        });
      });
      // save data to export till alert gets closed
      const selectedRows = dataSource.filter((row) =>
        // eslint-disable-next-line eqeqeq
        selectedRowKeys.some((sKey) => sKey == row.key)
      );
      reportRecords.current = selectedRows.map((sRow) => ({
        ...sRow,
        // eslint-disable-next-line eqeqeq
        status: deactivatedKeys.some((dKey) => dKey == sRow.key)
          ? "Deactivated"
          : "Active",
      }));
    } catch (err) {
      message.error("Something went wrong!");
    } finally {
      setDeactivateInProgress(false);
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
              onChange={(value) => {
                setDuration(+value);
                setDeactivationSuccessMsg("");
              }}
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
            { duration && <ExcelDownloadOption duration={duration} /> }
            <Button
              type="primary"
              danger
              disabled={dataSource.length === 0 || selectedRowKeys.length === 0}
              onClick={deactivate}
              loading={deactivateInProgress}
            >
              <PoweroffOutlined />
              Deactivate All
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ overflow: "auto" }}>
            <StyledTable
              bordered
              rowSelection={{
                type: "checkbox",
                selectedRowKeys: selectedRowKeys,
                onChange: (selectedRowKeys) =>
                  setSelectedRowKeys(selectedRowKeys),
                getCheckboxProps: (record) => ({
                  disabled: record.deactivationStatus,
                }),
              }}
              dataSource={dataSource}
              columns={columns}
              style={{ marginTop: "25px" }}
              loading={loading}
              pagination={false}
              scroll={{ x: "100vw", y: 350 }}
            ></StyledTable>
          </Col>
        </Row>
      </StyledCard>
    </>
  );
};

export default TradingActivity;
