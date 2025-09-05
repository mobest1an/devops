import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {CssBaseline, ThemeProvider, createTheme} from "@mui/material";

const theme = createTheme({
    palette: {
        mode: "dark", // поменяйте на "light", если хотите светлую тему
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>
    </React.StrictMode>
);
