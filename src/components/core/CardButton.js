import { Button } from "antd";
import styled from "styled-components";

const CardButton = styled(Button)`
  font-weight: bold;
  &.ant-btn-primary {
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

export default CardButton;
