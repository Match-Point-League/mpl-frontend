import React, { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { HealthCheckResponse } from './types/api';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';

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
    healthCheck();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/" element={
            <div className="min-h-screen bg-gray-50">
              <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                  <h1 className="text-3xl font-bold text-gray-900">
                    Match Point League: {healthCheck?.status}
                  </h1>
                </div>
              </header>
              <main>
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                  <div className="px-4 py-6 sm:px-0">
                    <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex flex-col items-center justify-center space-y-4">
                      <p className="text-gray-500">
                        Infrastructure setup complete. Ready for feature development.
                      </p>
                      
                      <div className="flex space-x-4">
                        <Link
                          to="/signin"
                          className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/signup"
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Sign Up
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          } />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;