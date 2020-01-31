import Typography from "typography";
import altonTheme from 'typography-theme-alton';

altonTheme.headerFontFamily = ["Muli", "sans-serif"];
altonTheme.bodyFontFamily = ["Droid Sans Mono", "monospace"];
altonTheme.googleFonts = [
  {
    name: "Muli",
    styles: ["700"],
  },
];

const typography = new Typography(altonTheme);
export default typography