import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

a{
    text-decoration: none;
    color: inherit;
}
*{
    box-sizing: border-box;
}
html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
a, dl, dt, dd, ol, ul, li, form, label, table{
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 10px;
    vertical-align: baseline;
}
body{
    color:black;
    background-color:${(props)=>props.theme.bgColor} ;
    line-height: 1;
    font-family: 'Nunito','Pretendard', sans-serif;
    margin-bottom: 100px;
    color: ${(props)=>props.theme.fontColor} ; 
    transition-property: background-color, color;
    transition-duration: .5s;
}
ol, ul{
    list-style: none;
}
`
;

export default GlobalStyle;
