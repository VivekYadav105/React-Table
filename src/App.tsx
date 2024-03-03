import './App.css'
import BasicTable from './basicTable'
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import ExpandableTable from './expandable/expandableTable'
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route element={<ExpandableTable/>} path='/'/>      
      </Routes>
    </Router>
    {/* <BasicTable/> */}
    </>
  )
}

export default App
