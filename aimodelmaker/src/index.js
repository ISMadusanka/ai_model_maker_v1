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
          element: <ProjectsLayout/>,
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
          path: 'projects/:projectId',
          element: <DashboardLayout/>,
          children: [
            {
              index:true,
              loader: ImageClassifierPageLoader, //async function to load the page. while loading, loading state will be shown
              element: <ImageClassifierPage/>
            }
          ]
        }
      ]
    },
  ]
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
