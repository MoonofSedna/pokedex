import styled from "styled-components";

export const CardGrid = styled.div`
  display: grid;
  gap: 1rem;
  margin-top: 2rem;
  grid-template-columns: repeat(
    auto-fill,
    minmax(350px, 1fr)
  );
  @media (max-width: 800px) {
    grid-template-columns: repeat(
      auto-fill,
      minmax(280px, 1fr)
    );
  }
`;
