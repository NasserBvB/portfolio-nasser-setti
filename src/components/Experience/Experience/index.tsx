import React from 'react'
import ScrollAnimation from 'react-animate-on-scroll';
import { ExperienceCompanyLogo, ExperienceCompanyTitle, ExperienceDescription, ExperienceHeader, ExperienceTitle, ExperienceTitlesWrapper, ExperienceWrapper } from './styles';

interface IProps {
  id: number;
  title: string;
  company: {
    title: string;
    logo: string;
  }
  description: string;
  period: string;
}

export default function Experience({ id, title, company, description, period }: IProps) {


  return (
    <ScrollAnimation animateIn={id % 2 === 0 ? "fadeInRight" : "fadeInLeft"} delay={0.6 * 1000}>
      <ExperienceWrapper>
        <ExperienceHeader>
          <ExperienceCompanyLogo src={ company.logo } alt=""  />
          <ExperienceTitlesWrapper>
            <ExperienceTitle>{title}</ExperienceTitle>
            <ExperienceCompanyTitle>at {company.title},  <span>{ period }</span></ExperienceCompanyTitle>
          </ExperienceTitlesWrapper>
        </ExperienceHeader>
        <ExperienceDescription>
          {description}
        </ExperienceDescription>
      </ExperienceWrapper >
    </ScrollAnimation>
  )
}
