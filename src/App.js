import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Home from './components/pages/Home.js'
import Company from './components/pages/Company.js'
import Contact from './components/pages/Contact.js'
import NewProject from './components/pages/NewProject.js'
import Container from './components/layout/Container.js'


function App() {
  return (
    <Router>
      <div>
        <Link to='/'>Home</Link>
        <Link to="/contact">Contato</Link>
        <Link to="/company">Empresa</Link>
        <Link to="/newproject">Novo Projeto</Link>
      </div>
      <Container customClass="minheight">
        <Routes>
          <Route exact path='/' element={<Home/>}>
          </Route>
          <Route exact path='/company' element={<Company/>}>
          </Route>
          <Route exact path='/contact' element={<Contact/>}>
          </Route>
          <Route exact path='/newproject' element={<NewProject/>}>
          </Route>
        </Routes>
      </Container>
      <footer>Footer</footer>
    </Router>
  );
}

export default App;
