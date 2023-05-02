import styled from "styled-components";

export const LikeButton = styled.div`
  cursor: pointer;
  position: absolute;
  z-index: 2;
  right: 0;
  top: 40px;
  background: var(--transparent-white);
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: 0.5s ease-in-out;
  & svg {
    top: 2px;
    width: 32px;
    height: 32px;
    position: relative;
    transition: 0.5s ease-in-out;
  }
  & g {
    transition: 0.2s ease-in-out;
    fill: var(--transparent-font-color);
  }

  &:hover svg {
    transform: scale(1.05);
    transition: 0.5s ease-in-out;
  }
  &.active g {
    transition: 0.2s ease-in-out;
    fill: var(--red);
  }
`;
