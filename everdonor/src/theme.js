import { createMuiTheme } from "@material-ui/core/styles";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    common: { black: "#000", white: "#fff" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      light: "rgba(217, 4, 41, 0.6)",
      main: "rgba(217, 4, 41, 1)",
      dark: "rgba(148, 0, 26, 1)",
      contrastText: "#fff",
    },
    secondary: {
      light: "rgba(141, 153, 174, 1)",
      main: "rgba(43, 45, 66, 1)",
      dark: "rgba(20, 24, 31, 1)",
      contrastText: "#fff",
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fff",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
});

export default theme;
