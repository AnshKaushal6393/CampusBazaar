import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import { ChatProvider } from "./context/ChatContext";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/useAuth";
import ErrorBoundary from "./utils/ErrorBoundary"; 
import { Toaster } from "react-hot-toast";

// Pages
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductPage";
import ProductDetailPage from './pages/ProductDetailPage';
import DashboardPage from './pages/DashboardPage';
import SellProductPage from './pages/SellProductPage';
import MessagesPage from "./pages/MessagePage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ProfileSetupPage from './pages/ProfileSetupPage';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div className="flex items-center justify-center h-screen text-xl">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <ChatProvider>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:id" element={<ProductDetailPage />} />

                {/* Auth Routes */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Routes */}
                <Route path="/profile-setup" element={
                  <ProtectedRoute>
                    <ProfileSetupPage />
                  </ProtectedRoute>
                } />
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/sell" element={
                  <ProtectedRoute>
                    <SellProductPage />
                  </ProtectedRoute>
                } />
                <Route path="/messages" element={
                  <ProtectedRoute>
                    <MessagesPage />
                  </ProtectedRoute>
                } />
              </Routes>
            </ErrorBoundary>
            <Toaster position="top-right" reverseOrder={false} />
          </ChatProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
