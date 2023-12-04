import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App.jsx";
import GlobalStyle from "./styles/GlobalStyles.js";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 100,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools />
            <GlobalStyle />
            <App />
        </QueryClientProvider>
    </React.StrictMode>
);
