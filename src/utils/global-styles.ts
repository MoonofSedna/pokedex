import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    :root {
        --bold: 800;
        --letter-spacing: 0.08rem;
        --dark-blue: #1E213A;
        --gray:#454555;
        --red: #F53838;
        --white: #f9f9f9;
        --fira-sans: 'Fira Sans', sans-serif;
        --search-btn-border-radius: 0 30px 30px 0;
        --card-border-radius: 10px;
        --badge-border-radius: 5px;
        --transparent-white: rgba(187, 187, 187, 0.22);
        --transparent-font-color: rgba(255, 255, 255, 0.38);
        --btn-box-shadow: 0px 5px 12px 0px rgba(0, 0, 0, 0.5);
        --footer-box-shadow: 0px 5px 12px 0px rgb(19, 19, 36);
    }
`;

export default GlobalStyles;
