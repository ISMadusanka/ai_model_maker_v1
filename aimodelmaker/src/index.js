import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomeLayout from './layouts/HomeLayout';
import HomePage from './pages/Home/Index';
import SignInPage from './pages/Authentication/Signin/Index';
import SignUpPage from './pages/Authentication/SignUp/Index';
import ProjectsLayout from './layouts/ProjectsLayout';
import ProjectListPage from './pages/Project/ProjectList/Index';
import DashboardLayout from './layouts/DashboardLayout';
import NewProjectPage from './pages/Project/NewProject/Index';
import ImageClassifierPage, { ImageClassifierPageLoader } from './pages/Dashboard/ImageClassifier/Index';
import ErrorPage from './pages/Error/ErrorPage';
import ModelsPage from './pages/Dashboard/Models/ModelsPage';
import SettingsPage from './pages/Dashboard/Settings/SettingsPage';
import AuthProvider from './services/authentication/AuthProvider';
import ProtectedRoute from './services/authentication/ProtectedRoute';
import { DashboardProvider } from './context/DashboardProvider';



const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App/>,
      errorElement: <ErrorPage/>,
      children: [
        { 
          path: '/', 
          element: <HomeLayout />,
          children: [
            {
              index: true,
              element: <HomePage/>
            },
            {
              path: 's',
              element: <SignInPage/>
            }
          ]
        },
        
        {
          
          path:'signin',
          element: <SignInPage/>

        },
        {
          path:'signup',
          element: <SignUpPage/>
        },

        {
          path:'projects',
          element: <ProtectedRoute><ProjectsLayout/></ProtectedRoute>,
          children: [
            {
              path: 'allprojects',
              element: <ProjectListPage/>
            },
            {
              path: 'newproject',
              element: <NewProjectPage/>
            }
          ]
        },
        {
          path: 'projects',
          element: <DashboardLayout/> ,
          children: [
            
            {
              path: 'models',
              element: <ModelsPage/>
            },
            {
              path: 'settings',
              element: <SettingsPage/>
            },
            {
              index:true,
              element: <ImageClassifierPage/>
            },
          ]
        }
      ]
    },
  ]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <DashboardProvider>
      <RouterProvider router={router}/>

      </DashboardProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
