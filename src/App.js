import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home.js'
import Projects from './components/pages/Projects.js'
import Company from './components/pages/Company.js'
import Contact from './components/pages/Contact.js'
import NewProject from './components/pages/NewProject.js'
import Container from './components/layout/Container.js'
import Navbar from './components/layout/Navbar.js'
import Footer from './components/layout/Footer.js'


function App() {
  return (
    <Router>
      <Navbar/>
      <Container customClass="minheight">
        <Routes>
          <Route exact path='/' element={<Home/>}>
          </Route>
          <Route exact path='/projects' element={<Projects/>}>
          </Route>
          <Route exact path='/company' element={<Company/>}>
          </Route>
          <Route exact path='/contact' element={<Contact/>}>
          </Route>
          <Route exact path='/newproject' element={<NewProject/>}>
          </Route>
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
