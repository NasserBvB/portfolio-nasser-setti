import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import experiences from './data';
import { ExperienceCompanyTitle, ExperienceDescription, ExperienceHeader, ExperienceTitle, ExperienceTitlesWrapper } from './Experience/styles';
import { List, Wrapper } from './styles';

export default function Experiences() {
  return (
    <Wrapper id='experiences'>
      <h1>Experiences</h1>

      <VerticalTimeline lineColor='green' >

        {
          experiences.map((experience, i) => (
            <VerticalTimelineElement
              key={i}
              className="vertical-timeline-element--work"
              contentArrowStyle={{ borderRight: '12px solid  green' }}
              contentStyle={{
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.3)",
                background: "inherit",
              }}
              date={experience.period}
              iconStyle={{ background: 'white', color: '#fff' }}
              icon={<img alt={experience.company.title} src={experience.company.logo} height="100%" width="100%" style={{ overflow: "hidden", borderRadius: "50%" }} />}
            >
              <ExperienceHeader>
                <ExperienceTitlesWrapper>
                  <ExperienceTitle>{experience.title}</ExperienceTitle>
                  <ExperienceCompanyTitle>at {experience.company.title},  <span>{experience.period}</span></ExperienceCompanyTitle>
                </ExperienceTitlesWrapper>
              </ExperienceHeader>
              <ExperienceDescription>
                {experience.description.map((item, index) => {
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
            </VerticalTimelineElement>
          ))
        }
      </VerticalTimeline>
      <List>
      </List>
    </Wrapper>
  )
}
