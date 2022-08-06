import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll';
import { ExperienceActions, ExperienceCompanyLogo, ExperienceCompanyTitle, ExperienceDescription, ExperienceHeader, ExperienceTitle, ExperienceTitlesWrapper, ExperienceWrapper } from './styles';

type Description = {
  title: string;
  children: Array<string>
}
export interface IExperienceProps {
  id: number;
  title: string;
  company: {
    title: string;
    logo: string;
  }
  description: Array<Description>;
  period: string;
}

export default function Experience({ id, title, company, description, period }: IExperienceProps) {
  return (
    <ScrollAnimation animateIn={id % 2 === 0 ? "fadeInRight" : "fadeInLeft"} delay={0.6 * 1000} animateOnce>
      <ExperienceWrapper>
        <ExperienceHeader>
          <ExperienceCompanyLogo src={company.logo} alt="" />
          <ExperienceTitlesWrapper>
            <ExperienceTitle>{title}</ExperienceTitle>
            <ExperienceCompanyTitle>at {company.title},  <span>{period}</span></ExperienceCompanyTitle>
          </ExperienceTitlesWrapper>
        </ExperienceHeader>
        <ExperienceDescription>
          {description.map((item, index) => {
            if (typeof item === 'string') {
              return <li key={index}>{item}</li>
            }

            return <li key={index}>
              <span>{item.title}</span>
              <ul>
                {item.children.map((item, index) => <li key={index}>{item}</li>)}
              </ul>
            </li>
          })}
        </ExperienceDescription>
        {/* <ExperienceActions>
          <button>Projects list</button>
        </ExperienceActions> */}
      </ExperienceWrapper >
    </ScrollAnimation>
  )
}
