import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Toaster } from './components/ui/toaster'

function App() {

  return (
    <>
      {/* Toaster is from radix UI package */}
      <Toaster/>
      <BrowserRouter>
        <Routes>
          {/* Index page route */}
          <Route index element={ <Home/> } />
          {/* Not Found page route */}
          <Route path='*' element={ <NotFound/> } />
        </Routes>
      </BrowserRouter>
      {/* <p className="example-card">Hello</p> */}
    </>
  )
}

export default App