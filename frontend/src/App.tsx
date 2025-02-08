import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Routes from "./routes";
import './index.css'
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
}

export default App;
