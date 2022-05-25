import React from 'react'
import { List, Wrapper } from './styles'
import Experience from './Experience'
import experiences from './data.json'

export default function Experiences() {
  console.log(experiences);
  
  return (
    <Wrapper>
      <h1>Experiences</h1>
      <List>
        {
          experiences.map((experience, i) => (
            <Experience { ...experience } key={i} id={i}></Experience>
          ))
        }
      </List>
    </Wrapper>
  )
}
