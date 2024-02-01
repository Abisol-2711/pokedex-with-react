import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './css/pokemonList.css'

// Componente funcional para mostrar una lista de Pokémon
function PokemonList() {
  const [pokemons, setPokemons] = useState([]) // Estado para almacenar la lista de Pokémon
  const [sortBy, setSortBy] = useState('number')
  const [sortOrder, setSortOrder] = useState('asc')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=10')
      .then((response) => response.json())
      .then((data) => {
        const promises = data.results.map((pokemon) =>
          fetch(pokemon.url).then((response) => response.json())
        )
        Promise.all(promises).then((pokemonDetails) => {
          setPokemons(pokemonDetails)
          setIsLoading(false)
        })
      })
      .catch((error) => console.error('Error fetching data:', error))
  }, [])

  // Función para manejar el cambio de tipo de ordenamiento
  const handleSortChange = (sortBy) => {
    setSortBy(sortBy)
    setSortOrder((order) => (order === 'asc' ? 'desc' : 'asc'))
  }

  // Función para formatear el ID del Pokémon
  function formatPokemonId(id) {
    if (id < 10) {
      return `#00${id}`
    } else if (id < 100) {
      return `#0${id}`
    } else {
      return id.toString()
    }
  }

  // Se ordena la lista de Pokémon según el tipo de ordenamiento y el orden especificado
  const sortedPokemons = pokemons.slice().sort((a, b) => {
    let valueA, valueB

    if (sortBy === 'name') {
      valueA = a.name
      valueB = b.name
    } else if (sortBy === 'weight') {
      valueA = parseInt(a.weight, 10)
      valueB = parseInt(b.weight, 10)
    } else if (sortBy === 'height') {
      valueA = parseInt(a.height, 10)
      valueB = parseInt(b.height, 10)
    } else {
      valueA = parseInt(a.id, 10)
      valueB = parseInt(b.id, 10)
    }
    return sortOrder === 'asc' ? valueA - valueB : valueB - valueA
  })

  if (isLoading) {
    return (
      <div className="loading">
        <p className="loading-text">Cargando...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="content-btn">
        <button className="btn" onClick={() => handleSortChange('number')}>
          Sort by number
        </button>
        <button className="btn" onClick={() => handleSortChange('weight')}>
          Sort by weight
        </button>
        <button className="btn" onClick={() => handleSortChange('height')}>
          Sort by height
        </button>
      </div>
      <ul className="pokemon-list">
        {sortedPokemons.map((pokemon, index) => (
          <Link
            to={`/pokemon/${pokemon.id}`}
            key={index}
            className="pokemon-card link"
          >
            <div>
              <p className="pokemon-id-back">{formatPokemonId(pokemon.id)}</p>
              <div className="pokemon-imagen">
                <img
                  src={pokemon.sprites.other.home.front_default}
                  alt={pokemon.name}
                />
              </div>
              <div className="pokemon-info">
                <div className="nombre-contenedor">
                  <p className="pokemon-id">{formatPokemonId(pokemon.id)}</p>
                  <h2 className="pokemon-nombre">{pokemon.name}</h2>
                </div>
                <div className="pokemon-stats">
                  <p className="stat">{pokemon.height} m</p>
                  <p className="stat">{pokemon.weight} kg</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default PokemonList
