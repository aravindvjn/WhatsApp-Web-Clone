import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./routes";
import "./index.css";
import { Toaster } from "react-hot-toast";
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
      </QueryClientProvider>
  );
}

export default App;
