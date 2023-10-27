import React, { useEffect, useState } from 'react'
import Cards from './Cards'
import { shuffle } from 'lodash'

import './App.css'

let pokemon = []

const App = () => {

  const [opened, setOpen] = useState([])
  const [match, setMatch] = useState([])
  const [show, setShow] = useState(false)
  const [double, setDouble] = useState([])
  const [score, setScore] = useState(0)

  useEffect(() => {
    setGame()
  }, [])

  const setGame = () => {
    pokemon = [...Array(6)].map((_, index) => {
      let num
      while (true) {
        num = Math.floor(Math.random() * 1000 + 1)
        if (pokemon.includes(num)) continue
        if (num > 1000) continue
        break
      }
      return {id: num}
    })
    
    setDouble(shuffle([...pokemon, ...pokemon]))
    setShow(false)
    setScore(0)
    setOpen([]) 
    setMatch([])
  }
  
  useEffect(() => {
    if (opened.length < 2) return

    const first = double[opened[0]]
    const second = double[opened[1]]
    
    if (first?.id === second?.id) setMatch(match => [...match, first?.id])
    setTimeout(() => setOpen([]), 500)
    
  }, [opened])
  
  useEffect(() => {
    if (match.length === 6) {
      setTimeout(() => {
        setShow(true)
      }, 500);
    }
  }, [match])

  const flipCard = (index) => {
    if (opened.length >= 2) return
    
    if (opened.includes(index)) {
      return setOpen([])
    }
    setOpen(open => [...open, index])
    setScore(prev => prev+1)
  }

  return (
    <>
      
      <div className='cards'>
        
        {
          double?.map((pokemon, index) => {
            let flip = false
            let disable = false
            if (opened.includes(index)) flip = true
            if (match.includes(pokemon.id)) {
              flip = true
              disable = true
            }
            return <Cards key={index} index={index} pokemon={pokemon} disable={disable} flip={flip} flipCard={(index) => flipCard(index)} />
          }
          )
        }
      </div>
      <div className='trial'>{show}</div>
      <div className={show ? 'win show ' : 'win'}>
        <div className="score">
          {score}
        </div>
        <button onClick={setGame}>play Again</button>
      </div>
    </>
  )
}

export default App