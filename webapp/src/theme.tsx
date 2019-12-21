import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  typography: {
    h1: {
      fontSize: "3rem"
    },
    h2: {
      fontSize: "2rem"
    }
  },
  overrides: {
    MuiCardHeader: {
      title: {
        fontSize: "1rem"
      }
    },
    MuiCardContent: {
      root: {
        fontSize: "1.2rem"
      }
    }
  }
});

export default theme;
