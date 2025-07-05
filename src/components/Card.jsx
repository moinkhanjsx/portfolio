

import React from 'react';
import styled, { keyframes } from 'styled-components';

// 3D Card Carousel from Uiverse.io, styled-components version
const rotate = keyframes`
  0% {
    transform: rotateY(0deg);
  }
  100% {
    transform: rotateY(360deg);
  }
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 340px;
`;

const Card3D = styled.div`
  width: 320px;
  height: 340px;
  background: linear-gradient(135deg, #fbbf24 0%, #f59e42 100%);
  border-radius: 2rem;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${rotate} 8s linear infinite;
  transform-style: preserve-3d;
  perspective: 1000px;
  position: relative;
  overflow: hidden;
`;

const SkillIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1.5rem;
`;

const SkillName = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
`;

const SkillLevel = styled.div`
  font-size: 1rem;
  color: #fef3c7;
`;

const skills = [
  { icon: '⚛️', name: 'React', level: 'Advanced' },
  { icon: '💅', name: 'styled-components', level: 'Intermediate' },
  { icon: '🌐', name: 'HTML/CSS', level: 'Advanced' },
  { icon: '🟦', name: 'Tailwind CSS', level: 'Advanced' },
  { icon: '🟨', name: 'JavaScript', level: 'Advanced' },
  { icon: '⚡', name: 'Vite', level: 'Intermediate' },
];

export default function Card() {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % skills.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const skill = skills[index];

  return (
    <CardContainer>
      <Card3D>
        <SkillIcon>{skill.icon}</SkillIcon>
        <SkillName>{skill.name}</SkillName>
        <SkillLevel>{skill.level}</SkillLevel>
      </Card3D>
    </CardContainer>
  );
}
