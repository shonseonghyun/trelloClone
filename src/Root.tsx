import { RecoilRoot, useRecoilValue } from "recoil";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./style/globalStyle";
import App from "./App";
import { darkTheme, lightTheme } from "./style/theme/theme";
import { ThemeFlg, themeState } from "./atoms/themeAtom";

const Root = () => {
const themeFlg = useRecoilValue(themeState);


    return (
      <ThemeProvider theme={themeFlg==ThemeFlg.dark ? darkTheme : lightTheme}>
      <GlobalStyle />
        <App />
      </ThemeProvider>
    );
};

export default Root;