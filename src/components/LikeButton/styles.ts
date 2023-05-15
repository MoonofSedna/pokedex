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
  transition: var(--btn-transition);
  box-shadow: 0px 5px 12px 0px
    rgba(0, 0, 0, 0.2);
  & svg {
    top: 2px;
    width: 32px;
    height: 32px;
    position: relative;
    transition: var(--btn-transition);
  }
  & g {
    transition: 0.2s ease-in-out;
    fill: var(--transparent-font-color);
  }

  &:hover svg {
    transform: scale(1.05);
    transition: var(--btn-transition);
  }
  &.active g {
    transition: 0.2s ease-in-out;
    fill: var(--red);
  }
`;
