'use client'
import styled from 'styled-components';
import { RiLogoutCircleLine } from "react-icons/ri";

const LogOutButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <StyledWrapper>
      <button className="holographic-button" onClick={onClick}>
        <div className="ring" />
        <div className="particles" />
        <RiLogoutCircleLine className="icon" />
        <div className="pulse" />
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .holographic-button {
    position: relative;
    width: clamp(2.8rem, 10vw, 3.5rem);
    height: clamp(2.8rem, 10vw, 3.5rem);
    border-radius: 50%;
    background: transparent;
    border: none;
    cursor: pointer;
    color: #38bdf8;
    display: flex;
    align-items: center;
    justify-content: center;
    perspective: 1000px;
    transition: transform 0.3s ease, color 0.3s ease;
  }

  /* 🌑 Floating ground shadow */
  .holographic-button::before {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 8%;
    width: 84%;
    height: 22%;
    background: rgba(0, 0, 0, 0.35);
    border-radius: 50%;
    filter: blur(12px);
    transform: rotateX(80deg) translateZ(-20px);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  .holographic-button:hover::before {
    opacity: 0.5;
  }

.icon {
  z-index: 3;
  font-size: clamp(1.2rem, 4vw, 1.5rem);
  pointer-events: none;
  filter: drop-shadow(0 0 6px currentColor);
  transition: 
    transform 0.3s ease,
    filter 0.3s ease;
}


  .ring {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-bottom-color: transparent;
    animation: rotate 3s linear infinite;
    opacity: 0.7;
  }

  .particles {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      transparent 20%,
      currentColor 20%,
      currentColor 30%,
      transparent 30%,
      transparent 40%,
      currentColor 40%,
      currentColor 50%,
      transparent 50%
    );
    background-size: 10px 10px;
    opacity: 0;
  }

  .pulse {
    position: absolute;
    inset: 0;
    border-radius: 50%;
    box-shadow: 0 0 12px currentColor;
    opacity: 0;
  }

  .holographic-button:hover {
    transform: translateY(-4px) rotateX(12deg);
    color: #f87171;
  }

  .holographic-button:hover .particles {
    opacity: 0.3;
    animation: particles 3s linear infinite;
  }

  .holographic-button:hover .pulse {
    opacity: 0.5;
    animation: pulse 2s ease-out infinite;
  }

  @keyframes rotate {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes particles {
    to {
      background-position: 20px 20px;
    }
  }

  @keyframes pulse {
    0% {
      transform: scale(0.85);
      opacity: 0.5;
    }
    100% {
      transform: scale(1.25);
      opacity: 0;
    }
  }
`;

export default LogOutButton;
