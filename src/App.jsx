import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { NotFound } from './pages/NotFound'
import { Toaster } from './components/ui/toaster'

function App() {

  return (
    <>
      <BrowserRouter>
        {/* Toaster is from radix UI package */}
        <Toaster/>
        <Routes>
          {/* Index page route */}
          <Route index element={ <Home/> } />
          {/* Projects page */}
          <Route path="/projects" element={ <Projects/> }/>
          {/* Not Found page route */}
          <Route path='*' element={ <NotFound/> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}
// NOTE: Home.jsx contains the global semantic layout (header/main/footer)
export default App