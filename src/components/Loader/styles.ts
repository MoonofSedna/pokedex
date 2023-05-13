import styled, {
  keyframes,
} from "styled-components";

const spin = keyframes`
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
`;

export const Loader = styled.div`
  height: 100dvh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 1.5rem;
  color: var(--white);
  &::before {
    content: "";
    display: block;
    height: 5rem;
    width: 5rem;
    border: 0.6em solid var(--red);
    border-radius: 100%;
    margin-bottom: 10px;
    clip-path: polygon(
      0 0,
      0 40%,
      50% 40%,
      50% 60%,
      0 60%,
      0 100%,
      100% 100%,
      100% 60%,
      50% 60%,
      50% 40%,
      100% 40%,
      100% 0
    );
    animation: ${spin} 0.5s infinite
      ease-in-out;
  }
  &::after {
    content: "";
    display: block;
    position: absolute;
    top: 49.6%;
    margin-top: -1.6em;
    height: 3.2rem;
    width: 3.2rem;
    background-color: #ccc;
    border-radius: 100%;
  }
`;
