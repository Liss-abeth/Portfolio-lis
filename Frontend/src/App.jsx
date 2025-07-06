import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Portfolio from './Components/Portfolio'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './Components/Admin'
import AdminErrorBoundary from './Components/AdminErrorBoundary'
import AdminLogin from './Components/AdminLogin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/admin-dashboard" element={ <AdminErrorBoundary><Admin/></AdminErrorBoundary>} />
         <Route path="/admin-login" element={<AdminLogin />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
