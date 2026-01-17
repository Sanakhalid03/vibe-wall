'use client'
import styled from 'styled-components';

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="container" />
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;

  .container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;   /* Use 100% instead of 100vw */
    height: 100%;  /* Use 100% instead of 100vh */
    min-width: 100%;
    min-height: 100%;
    overflow: hidden;
    background: linear-gradient(135deg, #fff9f9, #f0fcff);
  }

  .container::before,
  .container::after {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: conic-gradient(
      from 0deg,
      #ffe5e5,
      #fff7e6,
      #e6fff9,
      #e6f0ff,
      #f9e6ff,
      #fff0f5,
      #ffe5e5
    );
    animation: rotate 12s linear infinite;
    filter: blur(60px);
    opacity: 0.6;
  }

  .container::after {
    animation: rotate-reverse 16s linear infinite;
    opacity: 0.4;
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes rotate-reverse {
    to {
      transform: rotate(-360deg);
    }
  }
`;

export default Pattern;
