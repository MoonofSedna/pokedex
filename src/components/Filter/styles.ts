import styled from "styled-components";

const Generations = styled.div`
  width: 90%;
  display: grid;
  gap: 12px;
  padding: 1.5rem 0;
  grid-template-columns: repeat(
    auto-fit,
    minmax(70px, 1fr)
  );
  & > button {
    cursor: pointer;
    border: none;
    border-radius: 30px;
    font-weight: var(--bold);
    padding: 0.7rem 1.52rem;
    background-color: var(--white);
    &.active {
      cursor: default;
      background-color: var(
        --dark-blue
      );
      color: var(--white);
    }
  }
`;

const Types = styled.div`
  width: 100%;
  display: grid;
  gap: 12px;
  padding: 1.5rem 0;
  grid-template-columns: repeat(
    auto-fill,
    minmax(110px, 1fr)
  );
  & > div {
    cursor: pointer;
  }
`;

export { Generations, Types };
