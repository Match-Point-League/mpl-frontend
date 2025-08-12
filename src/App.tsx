import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { HealthCheckResponse } from './types/apiTypes';
import { ForgotPasswordPage, Dashboard,  SignUpPage, SignInPage } from './pages';
import { useState, useEffect } from 'react';

// Initialize React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const [healthCheck, setHealthCheck] = useState<HealthCheckResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const healthCheck = async () => {
      setIsLoading(true);
      const response = await fetch(import.meta.env.VITE_API_URL + '/health');
      const data = await response.json();
      setHealthCheck(data.data);
      setIsLoading(false);
    };
    try {
      healthCheck();
    } catch (error) {
      console.error('Error checking health:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-900">
                  Match Point League: {healthCheck?.status}
                </h1>
                <nav className="flex space-x-4">
                  <Link to="/" className="text-blue-600 hover:text-blue-800">
                    Home
                  </Link>
                  <Link to="/dashboard" className="text-blue-600 hover:text-blue-800">
                    Dashboard
                  </Link>
                  <Link to="/signup" className="text-blue-600 hover:text-blue-800">
                    Sign Up
                  </Link>
                  <Link to="/signin" className="text-blue-600 hover:text-blue-800">
                    Sign In
                  </Link>
                </nav>
              </div>
            </div>
          </header>
          <main>
            <Routes>
              <Route path="/" element={
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                  <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
                      <p className="text-gray-500">
                        Infrastructure setup complete. Ready for feature development.
                      </p>

                    </div>
                  </div>
                </div>
              } />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/signin" element={<SignInPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;