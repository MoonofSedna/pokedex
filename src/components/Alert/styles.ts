import styled from "styled-components";
// animation
import { fade } from "../Card/styles";

const AlertContainer = styled.div`
  width: fit-content;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  top: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
`;

const Alert = styled.div`
  background-color: #e3777a;
  border-radius: 5px;
  padding: 1rem;
  width: 100%;
  animation: ${fade} 0.6s linear;
  & span {
    color: var(--white);
    font-weight: 600;
  }
`;

export { Alert, AlertContainer };
