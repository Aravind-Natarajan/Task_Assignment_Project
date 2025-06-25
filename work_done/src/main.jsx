import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
// import Registration from './Components/Registration.jsx'
// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import LoginPage from './Components/Login.jsx'
// import User from './Components/User.jsx'

// const router = createBrowserRouter([
//     {
//         path:"/",
//         element:<App/>
//     },
//      {
//         path:"/register",
//         element:<Registration/>
//     },
//     {
//         path:"/login",
//         element:<LoginPage/>
//     },
//     {
//         path:"/user",
//         element:<User/>
//     }
// ])

createRoot(document.getElementById('root')).render(
  <App/>
    // <RouterProvider router={router}/>
  
)
