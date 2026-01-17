'use client'

import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="scene" type="submit">
        <div className="cube">
          <span className="side top">Vibe</span>
          <span className="side front">Post</span>
        </div>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .scene {
    width: clamp(5.5rem, 30vw, 7rem);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cube {
    cursor: pointer;
    font-family: 'Roboto', sans-serif;
    transition: transform 0.85s cubic-bezier(.17,.67,.14,.93);
    transform-style: preserve-3d;
    width: 100%;
    height: clamp(2.2rem, 8vw, 2.8rem);
    position: relative;
  }

  .cube:hover {
    transform: rotateX(-90deg);
  }

  .side {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-weight: bold;
    font-size: clamp(0.65rem, 2.5vw, 0.8rem);
    box-sizing: border-box;
    border-radius: 6px;
  }

  /* 🌈 Gradient border using background-clip */
  .top,
  .front {
    padding: 2px; /* border thickness */
    background: linear-gradient(
      135deg,
      #38bdf8,   /* sky blue */
      #6366f1,   /* indigo */
      #ec4899    /* pink */
    );
  }

  .top > *,
  .front > * {
    background: inherit;
  }

  .top::before,
  .front::before {
    content: "";
    position: absolute;
    inset: 2px;
    border-radius: 4px;
    background: inherit;
    z-index: -1;
  }

  .top {
    background-clip: padding-box;
    color: #0b1e2d;
    transform: rotateX(90deg)
      translate3d(0, 0, calc(clamp(2.2rem, 8vw, 2.8rem) / 2));
  }

  .top::after {
    content: "Vibe";
    position: absolute;
    inset: 2px;
    background: #e0f2fe;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .front {
    transform: translate3d(
      0,
      0,
      calc(clamp(2.2rem, 8vw, 2.8rem) / 2)
    );
  }

  .front::after {
    content: "Post";
    position: absolute;
    inset: 2px;
    background: #0f172a;
    color: #fff;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export default Button;
