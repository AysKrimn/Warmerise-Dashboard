import './App.css'
import { Route, Routes } from 'react-router-dom'

// pages
import Home from './Pages/Home'
import SearchUser from './Pages/SearchUser'
import SignIn from './Pages/Login'
import SignUp from './Pages/Register'
// layouts
import AppLayout from './Layout/AppLayout'




function App() {


  return (
    <>  

        <Routes>

            <Route element={<AppLayout></AppLayout>}>

                  <Route path='/' element={<Home></Home>}></Route>
                  <Route path='/users/search-more' element={<SearchUser></SearchUser>}></Route>
               
            </Route>


            <Route path='/login' element={<SignIn></SignIn>}></Route>
            <Route path='/register' element={<SignUp></SignUp>}></Route>
        </Routes>

    </>
  )
}

export default App
