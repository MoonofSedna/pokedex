import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  margin-top: 1.5rem;
  flex-direction: column;
  position: relative;
  & > span {
    position: absolute;
    display: flex;
    align-items: center;
    gap: 5px;
    top: -2rem;
    right: 0;
    font-size: 1.2rem;
  }
`;

export const CardGrid = styled.div<{
  isLoading?: boolean;
}>`
  display: grid;
  position: relative;
  gap: 1rem;

  grid-template-columns: repeat(
    auto-fill,
    minmax(350px, 1fr)
  );
  opacity: ${({ isLoading }) =>
    isLoading ? "0.5" : "1"};
  @media (max-width: 800px) {
    grid-template-columns: repeat(
      auto-fill,
      minmax(280px, 1fr)
    );
  }
`;
