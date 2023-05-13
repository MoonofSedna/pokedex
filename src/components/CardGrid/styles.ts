import styled from "styled-components";

export const CardGrid = styled.div<{
  isLoading?: boolean;
}>`
  display: grid;
  position: relative;
  gap: 1rem;
  margin-top: 2rem;
  grid-template-columns: repeat(
    auto-fill,
    minmax(350px, 1fr)
  );
  opacity: ${({ isLoading }) =>
    isLoading ? "0.5" : "1"};

  &:before {
    content: "Loading...";
    display: ${({ isLoading }) =>
      isLoading ? "block" : "none"};
    position: absolute;
    top: -30px;
    right: 0;
    color: var(--white);
    font-size: 1.2rem;
    z-index: 1;
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(
      auto-fill,
      minmax(280px, 1fr)
    );
  }
`;
