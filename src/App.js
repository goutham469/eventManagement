import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Description from './components/Description/Description';

import MainPage from './userDashBoardComponents/MainPage/MainPage';
import UserHome from './userDashBoardComponents/UserHome/UserHome';
import UserProfile from './userDashBoardComponents/UserProfile/UserProfile';
import UserClubs from './userDashBoardComponents/UserClubs/UserClubs';


import ClubLandingPage from './clubComponents/clubLandingPage/ClubLandingPage';
import ClubDescription from './clubComponents/clubDescription/ClubDescription';
import ClubLogin from './clubComponents/ClubLogin/ClubLogin';
import ClubSignUp from './clubComponents/clubSignUp/ClubSignUp';


function App() {
  // console.log(process.env)
  let router = createBrowserRouter([
    {
      path:'',
      element:<LandingPage/>,
      children:[
        {
          path:'',
          element:<Description/>
        },
        {
          path:'login',
          element:<Login/>
        },
        {
          path:'signup',
          element:<SignUp/>
        }
      ]
    },
    {
      path:'club',
      element:<ClubLandingPage/>,
      children:[
        {
          path:'',
          element:<ClubDescription/>
        },
        {
          path:'login',
          element:<ClubLogin/>
        },
        {
          path:'signUp',
          element:<ClubSignUp/>
        }
      ]
    },
    {
      path:'user',
      element:<MainPage/>,
      children:[
        {
          path:'',
          element:<UserHome/>
        },
        {
          path:'home',
          element:<UserHome/>
        },
        {
          path:'clubs',
          element:<UserClubs/>
        },
        {
          path:'profile',
          element:<UserProfile/>
        }
      ]
    }
  ])
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
