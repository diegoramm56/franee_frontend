import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Layout from "./Components/Layout/Layout";

//DANNY
import UsersMain from "./Components/Administration/Users/UsersMain";
import RolMain from "./Components/Administration/Roles/RolMain";
import RolAccessView from "./Components/Administration/Roles/RolAccessView";
import BranchMain from "./Components/Administration/Branches/BranchMain";
import LoginMain from "./Components/Login/LoginMain";
import UserConfiguration from "./Components/Administration/Users/UserConfiguration";
import SelectBranch from "./Components/Administration/Branches/SelectBranch";
import ProductBranch from "./Components/Products/ProductBranch";

//PABLO
import ClientsMainView from "./Components/Administration/Clients/ClientsMainView";
import { CartProvider } from "./context/CartContext";
import { ClientProvider } from "./context/ClientContext";
import CartMainView from "./Components/Cart/CartMainView";
import AddToCartView from "./Components/Cart/AddToCartView";
import RemoveFromCartView from "./Components/Cart/RemoveFromCartView";
import CheckoutView from "./Components/Cart/CheckoutView";
import ApplyDiscountView from "./Components/Cart/ApplyDiscountView";
import ToastProvider from "./Components/Layout/ToastProvider";

//PATZAN
import ProductsMainView from "./Components/Products/ProductsMainView";
import ProvidersMainView from "./Components/Providers/ProvidersMainView";
import BrandsMainView from "./Components/Brands/BrandsMainView";
import CategoriesMainView from "./Components/Categories/CategoriesMainView";
import MeasuresMainView from "./Components/Measures/MeasuresMainView";

import React, { useState, useEffect } from 'react';
import SweetAlert from "./SweetAlert2";

const DEFAULT_SESSION_TIMEOUT_MINUTES = 10;
const MILLISECONDS_IN_MINUTE = 60000;

const getSessionStorage = () => (typeof window !== 'undefined' ? window.sessionStorage : null);

const resolveTimeoutMinutes = () => {
  const storage = getSessionStorage();
  if (!storage) {
    return DEFAULT_SESSION_TIMEOUT_MINUTES;
  }
  const stored = Number(storage.getItem("sessionTimeoutMinutes"));
  return Number.isFinite(stored) && stored > 0 ? stored : DEFAULT_SESSION_TIMEOUT_MINUTES;
};

const resolveSessionValidity = () => {
  const storage = getSessionStorage();
  if (!storage) {
    return false;
  }
  const userName = storage.getItem("userName");
  if (!userName) {
    return false;
  }
  const lastActivity = Number(storage.getItem("lastActivity"));
  if (!lastActivity) {
    return false;
  }
  const timeoutMs = resolveTimeoutMinutes() * MILLISECONDS_IN_MINUTE;
  if (Date.now() - lastActivity >= timeoutMs) {
    storage.clear();
    return false;
  }
  return true;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => resolveSessionValidity());
  const [branchSelected, setBranchSelected] = useState(() => Boolean(sessionStorage.getItem("branchId")));
  const [currentUserId, setCurrentUserId] = useState(() => sessionStorage.getItem("userId"));

  const onLoginHandle = () => {
    setIsAuthenticated(true);
    setBranchSelected(Boolean(sessionStorage.getItem("branchId")));
    setCurrentUserId(sessionStorage.getItem("userId"));
  };

  const onBranchSelect = () => {
    setBranchSelected(true);
    sessionStorage.setItem('lastActivity', Date.now().toString());
  };

  const onLogOutHandle = () => {
    sessionStorage.clear();
    localStorage.clear();
    setIsAuthenticated(false);
    setBranchSelected(false);
    setCurrentUserId(null);
    clearBrowserHistory();
  };

  const clearBrowserHistory = () => {
    try {
      const historyLength = window.history.length;
      window.history.go(-historyLength);

      setTimeout(() => {
        window.history.replaceState(null, null, '/login');
        window.location.replace('/login');
      }, 100);

    } catch (error) {
      console.error('Error limpiando historial:', error);
      window.location.replace('/login');
    }
  };

  useEffect(() => {
    if (!isAuthenticated && !sessionStorage.getItem("userName")) {
      const preventBack = () => {
        window.history.pushState(null, null, window.location.pathname);
      };

      window.history.pushState(null, null, window.location.pathname);
      window.addEventListener('popstate', preventBack);

      return () => {
        window.removeEventListener('popstate', preventBack);
      };
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const timeoutMs = resolveTimeoutMinutes() * MILLISECONDS_IN_MINUTE;
    const markActivity = () => {
      sessionStorage.setItem('lastActivity', Date.now().toString());
    };

    const checkInactivity = () => {
      const lastActivity = Number(sessionStorage.getItem('lastActivity') ?? 0);
      if (!lastActivity) {
        markActivity();
        return;
      }
      if (Date.now() - lastActivity >= timeoutMs) {
        SweetAlert.ShowMessage('Sesion finalizada por inactividad', 'Sesion expirada', 'warning');
        onLogOutHandle();
      }
    };

    markActivity();
    const events = ['click', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    events.forEach((eventName) => window.addEventListener(eventName, markActivity));
    const intervalId = window.setInterval(checkInactivity, 30000);

    return () => {
      events.forEach((eventName) => window.removeEventListener(eventName, markActivity));
      window.clearInterval(intervalId);
    };
    // onLogOutHandle es estable en tiempo de ejecución; agregarlo al array causaría re-registro infinito del intervalo
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const renderProtectedLayout = () => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    if (!branchSelected && currentUserId) {
      return <Navigate to={`/SelectBranch/${currentUserId}`} replace />;
    }
    return <Layout logOut={onLogOutHandle} />;
  };

  return (
    <div className="w-100 vh-100">
      <Router>
        <CartProvider>
          <ClientProvider>
            <ToastProvider />
            <Routes>
              <Route path="/login" element={<LoginMain onSuccess={onLoginHandle} />} />
              <Route
                path="/SelectBranch/:userId"
                element={
                  isAuthenticated ? (
                    <SelectBranch onSelect={onBranchSelect} notBranchesHandle={onLogOutHandle} />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route path="/" element={renderProtectedLayout()}>
                <Route index element={<Navigate to="/Products" replace />} />

                {/* Rutas de DANNY */}
                <Route path="Users" element={<UsersMain />} />
                <Route path="Roles" element={<RolMain />} />
                <Route path="RolAccess/:rolId" element={<RolAccessView />} />
                <Route path="Branches" element={<BranchMain />} />
                <Route path="UserConf/:userId" element={<UserConfiguration />} />
                <Route path="ProductBranch/:productId" element={<ProductBranch />} />

                {/* Rutas de PABLO */}
                <Route path="Clients" element={<ClientsMainView />} />
                <Route path="Cart" element={<CartMainView />} />
                <Route path="Cart/Add" element={<AddToCartView />} />
                <Route path="Cart/Remove" element={<RemoveFromCartView />} />
                <Route path="Cart/Checkout" element={<CheckoutView />} />
                <Route path="Cart/Discount" element={<ApplyDiscountView />} />

                {/* Rutas de PATZAN */}
                <Route path="Products" element={<ProductsMainView />} />
                <Route path="Providers" element={<ProvidersMainView />} />
                <Route path="Brands" element={<BrandsMainView />} />
                <Route path="Categories" element={<CategoriesMainView />} />
                <Route path="Measures" element={<MeasuresMainView />} />
              </Route>
              <Route path="*" element={<Navigate to={isAuthenticated ? '/Products' : '/login'} replace />} />
            </Routes>
          </ClientProvider>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
