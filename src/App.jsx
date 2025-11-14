
import './App.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import HomePage from './components/HomePage'
import VideoPage from './components/VideoPage'
import AppointmentBooking from './components/AppointmentBooking'
import AppointmentList from './components/AppointmentList'

function App() {
const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/room/:id",
    element:<VideoPage/>
  },
  {
    path:"/book-appointment",
    element:<AppointmentBooking/>
  },
  {
    path:"/appointments",
    element:<AppointmentList/>
  }
])

  return (
    <div className='App'>
<RouterProvider router={router}/>
    </div>
  )
}

export default App
