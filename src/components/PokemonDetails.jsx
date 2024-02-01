import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './css/pokemonDetails.css'

// Componente funcional para mostrar los detalles de un Pokémon
function PokemonDetails() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null) // Estado para almacenar los detalles del Pokémon

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => response.json())
      .then((data) => setPokemon(data))
      .catch((error) => console.error('Error fetching data:', error))
  }, [id])

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

  // Si no se ha cargado la información del Pokémon, se muestra un mensaje de carga
  if (!pokemon) {
    return (
      <div className="loading">
        <p className="loading-text">Cargando...</p>
      </div>
    )
  }

  return (
    <div className="pokemon-details">
      <h3>{pokemon.name}</h3>
      <img src={pokemon.sprites.other.home.front_default} alt={pokemon.name} />
      <h4>Details:</h4>
      <p className="info">Number {formatPokemonId(pokemon.id)}</p>
      <p className="info">Weight {pokemon.weight} KG</p>
      <p className="info">Height {pokemon.height} M</p>
      <p className="subtitle">Abilities:</p>
      <ul>
        {pokemon.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default PokemonDetails
