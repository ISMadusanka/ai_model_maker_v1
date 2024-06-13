import logo from './logo.svg';
import './App.css';
import HomeLayout from './layouts/HomeLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import WebcamComponent from './services/freemodels/ImageClassifier';

function App() {
  return (
    <div>
      <Outlet/>
    </div>
  );
}

export default App;
