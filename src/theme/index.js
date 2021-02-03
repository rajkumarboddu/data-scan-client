import { css } from "styled-components";

const boxStyle = css`
  -webkit-box-shadow: 0px 0px 15px 5px rgba(232, 232, 232, 1);
  -moz-box-shadow: 0px 0px 15px 5px rgba(232, 232, 232, 1);
  box-shadow: 0px 0px 15px 5px rgba(232, 232, 232, 1);
  border-radius: 8px;
`;

export const theme = {
  boxShadow: "0px 0px 15px 5px rgba(232, 232, 232, 1)",
  boxStyle,
  primaryColor: "#9188f3",
};
