import { QueryClient, QueryClientProvider } from 'react-query';

// Pages
import RentPage from "pages/RentPage";

const App = () => {

  // Declarations
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient} >
      <RentPage />          
    </QueryClientProvider>
  );
}

export default App;
