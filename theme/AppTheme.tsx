import React from "react";
import { createTheme, ThemeOptions, ThemeProvider } from "@mui/material/styles";
import { inputsCustomizations } from "./customizations/inputs";
import { navigationCustomizations } from "./customizations/navigation";
import { surfacesCustomizations } from "./customizations/surfaces";
import { colorSchemes, typography, shadows, shape } from "./themePrimitives";
import { dataDisplayCustomizations } from "./customizations/dataDisplay";

interface AppThemeProps {
  children: React.ReactNode;
  themeComponents?: ThemeOptions["components"];
}

const AppTheme: React.FC<AppThemeProps> = ({ children, themeComponents }) => {
  const theme = React.useMemo(() => {
    return createTheme({
      // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
      cssVariables: {
        colorSchemeSelector: "data-mui-color-scheme",
        cssVarPrefix: "template",
      },
      colorSchemes, // Recently added in v6 for building light & dark mode app, see https://mui.com/material-ui/customization/palette/#color-schemes
      typography,
      shadows,
      shape,
      components: {
        ...inputsCustomizations,
        ...dataDisplayCustomizations,
        ...navigationCustomizations,
        ...surfacesCustomizations,
        ...themeComponents,
      },
    });
  }, [themeComponents]);

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
};

export default AppTheme;
