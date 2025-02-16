import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./routes";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
        }}
      />

      <Routes />

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
