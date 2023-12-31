import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import GlobalStyle from "./styles/GlobalStyles.js";
import ErrorFallback from "./ui/ErrorFallback.jsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60 * 1000,
        },
    },
});

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => window.location.replace("/")}
        >
            <DarkModeProvider>
                <QueryClientProvider client={queryClient}>
                    <ReactQueryDevtools />
                    <GlobalStyle />
                    <Toaster
                        position="top-center"
                        gutter={12}
                        containerStyle={{ margin: "8px" }}
                        toastOptions={{
                            success: { duration: 3000 },
                            error: { duration: 5000 },
                            style: {
                                fontSize: "16px",
                                maxWidth: "500px",
                                padding: "16px 24px",
                                backgroundColor: "var(--color-grey-0)",
                                color: "var(--color-grey-700",
                            },
                        }}
                    />
                    <App />
                </QueryClientProvider>
            </DarkModeProvider>
        </ErrorBoundary>
    </React.StrictMode>
);
