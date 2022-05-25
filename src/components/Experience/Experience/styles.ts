import styled from "styled-components";

export const ExperienceWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  border-radius: 10px;
  padding: 1rem;
  color: black;
  min-width: 400px;
  cursor: pointer;
`;

export const ExperienceHeader = styled.div`
  border-bottom: 1px solid #ccc;
  display: flex;
  gap: 1rem;

  align-items: center;
`;

export const ExperienceTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
`;
export const ExperienceCompanyTitle = styled.h1`
  font-size: 1.2rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #5f5b5b;

  & span {
    text-transform: capitalize;
  }
`;

export const ExperienceTitlesWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ExperienceDescription = styled.p`
  max-width: 50ch;
`;
export const ExperienceCompanyLogo = styled.img`
  width: 50px;
  height: 50px;
`;
