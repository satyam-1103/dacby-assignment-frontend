import { Toaster } from 'react-hot-toast'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <>
      <Toaster position='bottom-right' />
      <Navbar />
      <AppRoutes />
    </>
  )
}

export default App