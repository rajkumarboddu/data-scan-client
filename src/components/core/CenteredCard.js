import { Row, Col, Card, Image } from "antd";
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

const StyledCol = styled(Col)`
  position: relative;
  background-color: #fff;
  -webkit-box-shadow: 0px 0px 15px 5px rgba(232, 232, 232, 1);
  -moz-box-shadow: 0px 0px 15px 5px rgba(232, 232, 232, 1);
  box-shadow: 0px 0px 15px 5px rgba(232, 232, 232, 1);
  border-radius: 8px;
`;

export default function CenteredCard(props) {
  return (
    <Row
      gutter={[24, 24]}
      justify="center"
      align="middle"
      style={{ margin: "0px", height: "100vh", backgroundColor: "#f8f8f8" }}
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
          <Image preview={false} src={logo} style={{ marginBottom: "16px" }} />
          {props.children}
        </Card>
      </StyledCol>
    </Row>
  );
}
