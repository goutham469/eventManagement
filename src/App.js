import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import store from './store';

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


import About from './club/About/About';
import MasterComponent from './club/MasterComponent/MasterComponent';
import NewPost from './club/NewPost/NewPost';


import { useEffect } from 'react';

function App() {
  console.log(process.env)

  useEffect(()=>{
    store.dispatch({type:"check_is_signed"})
    console.log(store.getState())
  })



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
      path:'clubOK',
      element:<MasterComponent/>,
      children:[
        {
          path:'',
          element:<About/>
        },
        {
          path:'about',
          element:<About/>
        },
        {
          path:'newPost',
          element:<NewPost/>
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

  // console.log(store)
  return (
    <div className="App">
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
