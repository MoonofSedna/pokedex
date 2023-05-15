import styled from "styled-components";

export const Divider = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 1.5rem;
  gap: 1.5rem;
  &::before,
  &::after {
    content: "";
    display: block;
    width: 1px;
    height: 12rem;
    margin: 0 auto;
  }

  &::before {
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      #fff 100%
    );
  }

  &::after {
    background: linear-gradient(
      180deg,
      #fff 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  svg {
    width: 5rem;
    height: 5rem;
  }

  @media screen and (max-width: 767px) {
    position: static;
    transform: initial;
    flex-direction: row;
    align-items: center;
    padding-top: 0;
    margin: 2rem 0;
    width: 100%;
    &::before,
    &::after {
      width: 45%;
      height: 1px;
    }

    &::before {
      background: linear-gradient(
        270deg,
        #fff 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }

    &::after {
      background: linear-gradient(
        90deg,
        #fff 0%,
        rgba(255, 255, 255, 0) 100%
      );
    }
  }
`;
