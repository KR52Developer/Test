// Import necessary modules
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Create a theme instance
const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Rubik",
    },
  },
});

// Create a custom ThemeProvider component
export default function CustomThemeProvider({ children }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
