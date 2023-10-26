import React, { useState } from 'react'

const Cards = ({ pokemon, index, flip, flipCard }) => {
  
  return (
    <>
      <div className={flip ? 'pokemon-card flipped' : 'pokemon-card'} onClick={() => flipCard(index)}>
        <div className="inner">
          <div className="front">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
              alt={pokemon.id} />

          </div>
          <div className="back">?</div>
        </div>
      </div>
    </>
  )
}

export default Cards