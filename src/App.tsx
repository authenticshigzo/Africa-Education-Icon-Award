import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import NavbarSmallScreen from './components/NavbarSmallScreen';
import NavbarMediumScreen from './components/NavbarMediumScreen';
import Navbar from "./components/Navbar"
import Body from "./components/Body"
import MembershipPage from "./MembershipPage"
import "./App.css"
function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const changeScreen = () => {
    if (screenWidth < 768) {
      return <NavbarSmallScreen />
    }

    if (screenWidth < 1024) {
      return <NavbarMediumScreen />
    }

    return <Navbar />
  }

  return (
    <>
      {changeScreen()}
      <Routes>
        <Route>
          <Route path="/" element={<Body />} />
          <Route path="/membership" element={<MembershipPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
