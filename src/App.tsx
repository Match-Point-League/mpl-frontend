import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { HealthCheckResponse } from './types/apiTypes';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

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
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/" element={
            <div className="min-h-screen bg-gray-50">
              <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                  <h1 className="text-3xl font-bold text-gray-900">
                    Match Point League
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
                          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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