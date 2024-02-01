import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import PokemonList from './components/PokemonList'
import PokemonDetails from './components/PokemonDetails'
import './App.css'

function App() {
  return (
    <Router>
      <div>
        <header className="header">
          <Link to={`/`} className="link">
            <h1 className="title">Pokémon App</h1>
          </Link>
        </header>
        <main className="main">
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
