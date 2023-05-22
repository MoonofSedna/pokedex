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
    padding: 0.65rem 1.3rem;
    background-color: var(--white);
    &.active {
      cursor: default;
      background-color: var(
        --dark-blue
      );
      color: var(--white);
    }
    &[disabled] {
      opacity: 0.6;
      cursor: default;
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
`;

export { Generations, Types };
