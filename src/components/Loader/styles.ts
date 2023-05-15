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

export const Container = styled.div`
  height: 90vh;
  font-size: 1.5rem;
  color: var(--white);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  & > h2 {
    font-size: clamp(
      1.5rem,
      4vw,
      2.5rem
    );
    color: var(--white);
  }
  & > img {
    margin-bottom: 10px;
  }
`;

export const Loader = styled.div`
  width: 110px;
  height: 110px;
  background-color: var(--white);
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  margin-bottom: 20px;
  animation: ${spin} 0.8s linear 0s
    infinite;
  &::before {
    content: "";
    position: absolute;
    background-color: var(--white);
    width: 18px;
    height: 18px;
    border: 8px solid var(--dark-blue);
    border-radius: 50%;
    bottom: 38px;
    right: 38px;
    z-index: 1;
  }
  &::after {
    content: "";
    position: absolute;
    width: 110px;
    height: 55px;
    background-color: var(--red);
    border-bottom: 8px solid
      var(--dark-blue);
    top: -4px;
  }
`;
