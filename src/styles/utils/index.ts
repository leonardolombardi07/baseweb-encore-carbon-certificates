import {
  createThemedStyled,
  createThemedWithStyle,
  createThemedUseStyletron,
} from "baseui";
import { Theme } from "../theme";

const styled = createThemedStyled<Theme>();
const withStyle = createThemedWithStyle<Theme>();
const useStyletron = createThemedUseStyletron<Theme>();

export { styled, withStyle, useStyletron };
