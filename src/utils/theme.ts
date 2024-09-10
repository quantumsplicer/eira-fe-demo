// Augment the palette to include new color
declare module "@mui/material/styles" {

  interface CustomThemeOptions {
    tab?: {
      height?: number | string;
      minWidth?: number | string;
    }
  }
  interface Theme extends CustomThemeOptions {}

  interface ThemeOptions extends CustomThemeOptions {}

  interface Palette {
    adminPrimary: Palette["primary"];
    button: Palette["primary"];
    iconGrey: Palette["primary"];
    iconWhite: Palette["primary"];
  }

  interface PaletteOptions {
    adminPrimary?: PaletteOptions["primary"];
    button?: PaletteOptions["primary"];
    iconGrey?: PaletteOptions["primary"];
    iconWhite?: PaletteOptions["primary"];
  }

  interface PaletteColor {
    hover?: string;
  }

  interface SimplePaletteColorOptions {
    hover?: string;
  }

  interface TypeText {
    light: string;
  }
}

// Update the Icon's color options to include an button color option
declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    iconGrey?: true;
    iconWhite?: true;
  }
}

// Update the Button's color options to include an button color option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    button: true;
  }
}

export const theme = {
  typography: {
    fontFamily: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif'].join(','),
  },
  // palette: {
  //   primary: {
  //     main: "#507FFD",
  //     light: "#507FFD",
  //   },
    // button: {
    //   dark: "#EFDDE7",
    //   main: "#507FFD",
    //   hover: "#F9FAFB",
    // },
    // warning: {
    //   main: "#F79009",
    //   light: "#FFF5DB",
    // },
    // success: {
    //   main: "#048750",
    //   light: "#84EAB3",
    // },
    // text: {
    //   primary: "#0A0A0A",
    //   secondary: "#6F727B",
    //   light: "#E2E4EB",
    // },

  // },
};
