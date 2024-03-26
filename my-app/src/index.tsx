import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { HashRouter as Router } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/components/theme-provider";
import QueryClientProviderWrapper from "./App/providers/query-client-provider";
const root = ReactDOM.createRoot(
   document.getElementById("root") as HTMLElement
);
root.render(
   <Router>
      <QueryClientProviderWrapper>
         <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_CLIENT_ID}>
            <ThemeProvider>
               <App />
            </ThemeProvider>
            <ToastContainer limit={5} />
         </GoogleOAuthProvider>
      </QueryClientProviderWrapper>
   </Router>
);
