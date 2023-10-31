import { ThemeProvider } from "styled-components";

export default function GlobalTheme({ children }) {
  const theme = {
    color: {
      brand: "#e4002b",
      white: "#ffffff",
      whiteDark: "#E5E3E8",
      gray: "#959199",
      grayDark: "#3D3B40",
      black: "#242326",
      text: {
        primary: "#3D3B40",
        secondary: "#726E75",

        info: "#00639E",
        success: "#137044",
        warning: "#A8420D",
      },
    },
  };
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
