import styled from "styled-components";

export const Search = styled.div`
  width: 100%;
  display: flex;
  & > div {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    & img {
      position: absolute;
      right: 1rem;
      cursor: pointer;
    }
    & input {
      width: 100%;
      padding: 1rem;
      border: none;
      border-radius: 30px 0 0 30px;
      outline: none;
      font-size: 1rem;
      font-weight: 500;
      font-family: var(--fira-sans);
    }
  }
`;
