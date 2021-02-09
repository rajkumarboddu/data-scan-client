import { css } from "styled-components";

const boxStyle = css`
  ${(props) => props.theme.boxShadow}
  border-radius: 8px;
`;

const boxShadow = css`
  -webkit-box-shadow: 0px 0px 15px 5px rgba(232, 232, 232, 1);
  -moz-box-shadow: 0px 0px 15px 5px rgba(232, 232, 232, 1);
  box-shadow: 0px 0px 15px 5px rgba(232, 232, 232, 1);
`;

export const theme = {
  boxShadow,
  boxStyle,
  primaryColor: "#9188f3",
};
