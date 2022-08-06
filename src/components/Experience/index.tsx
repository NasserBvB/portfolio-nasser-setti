import React from 'react'
import { List, Wrapper } from './styles'
import Experience, { IExperienceProps } from './Experience'
import experiences from './data'

export default function Experiences() {
  console.log(experiences);
  
  return (
    <Wrapper id='experiences'>
      <h1>Experiences</h1>
      <List>
        {
          experiences.map((experience, i) => (
            <Experience { ...experience as IExperienceProps } key={i} id={i}></Experience>
          ))
        }
      </List>
    </Wrapper>
  )
}
