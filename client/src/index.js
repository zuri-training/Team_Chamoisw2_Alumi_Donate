import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import "./pages/styles/dashboard.scss"
import FAQPage from "./pages/FAQ"
import CheckoutPage from "./pages/components/Checkout/Checkout"
import SuccessPage from "./pages/SuccessPage"
import LandingPage from "./pages/LandingPage"
import SignupPage from "./pages/SignUp"
import SigninPage from "./pages/SignIn"
import DashboardPage from "./pages/Dashboard"
import DonationLinkPage from "./pages/DonationLink"
import DonationsPage from "./pages/Donations"
import AboutUsPage from "./pages/AboutUs"
import ContactUsPage from "./pages/ContactUs"
import DonateNow from "./pages/components/DonateNow"
import ProtectedRoutes from "./pages/components/ProtectedRoutes"
import ProfilePage from './pages/components/Dashboard/Profile'
import CollegesPage from './pages/components/Admin/College'
import BanksPage from './pages/components/Admin/Bank'
import RegisterCollegePage from "./pages/components/Admin/College/register"
import EditCollegePage from "./pages/components/Admin/College/edit"
import AdminPage from './pages/components/Admin/admin-index'
import AdminSignInPage from './pages/components/Admin/login'
import AdminRegisterPage from './pages/components/Admin/register'
import AdminEditPage from './pages/components/Admin/edit'
import RegisterBankPage from "./pages/components/Admin/Bank/register"
import EditBankPage from "./pages/components/Admin/Bank/edit"
import ProtectedAdminRoutes from "./pages/components/ProtectedRoutes/admin"
import {
  createBrowserRouter,
  RouterProvider,
  Navigate
} from "react-router-dom";

import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { store } from './redux/store'
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "login",
        element: <SigninPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "about-us",
        element: <AboutUsPage />,
      },
      {
        path: "donations",
        element: <DonationsPage />,
      },
      {
        path: "contact-us",
        element: <ContactUsPage />,
      },
      {
        path: "faq",
        element: <FAQPage />,
      },
      {
        path: "donate/:donationLink",
        element: <DonationLinkPage />,
      },
      {
        path: "",
        element: <LandingPage />,
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminPage exact />,
    children: [
      {
        path: "login",
        element: <AdminSignInPage />,
      },
      {
        path: "register",
        element: <AdminRegisterPage />,
      },
      {
        path: "edit",
        element: <ProtectedAdminRoutes><AdminEditPage /></ProtectedAdminRoutes>,
      },
      {
        path: "colleges",
        element: <ProtectedAdminRoutes><CollegesPage /></ProtectedAdminRoutes>,
        children: [
          {
            path: "register",
            element: <ProtectedAdminRoutes>
                      <RegisterCollegePage />
                    </ProtectedAdminRoutes>,
          },
          {
            path: "edit",
            element: <ProtectedAdminRoutes>
                      <EditCollegePage />
                    </ProtectedAdminRoutes>
          },
        ]
      },
      {
        path: "banks",
        element: <ProtectedAdminRoutes><BanksPage /></ProtectedAdminRoutes>,
        children: [
          {
            path: "edit",
            element: <ProtectedAdminRoutes><EditBankPage /></ProtectedAdminRoutes>
          }
        ]
      },
    ]
  },
  {
    path: "/dashboard",
    element: <ProtectedRoutes><DashboardPage /></ProtectedRoutes>,
    children: [
      {
        path: "profile",
        element: <ProtectedRoutes><ProfilePage /></ProtectedRoutes>,
      },
      {
        path: "donate",
        element: <ProtectedRoutes><DonateNow /></ProtectedRoutes>,
      },
      {
        path: "donate/checkout",
        element: <ProtectedRoutes><CheckoutPage /></ProtectedRoutes>,
      },
      {
        path: "donate/success",
        element: <ProtectedRoutes><p className='text-center'>Donation Successful</p></ProtectedRoutes>,
      }
    ]
  }
]);


const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
