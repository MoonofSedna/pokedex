import styled from "styled-components";

export const Button = styled.button<{
  width?: string;
  search?: boolean;
}>`
  background-color: ${(props) =>
    props.search
      ? "var(--dark-blue)"
      : "var(--white)"};
  width: ${(props) =>
    props.width ? props.width : "auto"};
  font-family: var(--fair-sans);
  padding: 0.8rem 1.2rem;
  border-radius: ${(props) =>
    props.search
      ? "var(--search-btn-border-radius)"
      : "30px"};
  border: none;
  color: ${(props) =>
    props.search
      ? "var(--white)"
      : "var(--dark-blue)"};
  font-weight: var(--bold);
  font-size: 1rem;
  cursor: pointer;
  transition: var(--btn-transition);
  text-transform: uppercase;
  &.scroll-btn {
    padding: 0.5rem 0.6rem;
    position: absolute;
    right: 0;
    & svg {
      width: 1.5rem;
      height: 1.5rem;
      fill: var(--dark-blue);
      transition: var(--btn-transition);
    }
    &:hover svg {
      fill: var(--white);
      transition: var(--btn-transition);
    }
  }
  &:hover {
    color: var(--white);
    transition: var(--btn-transition);
    background-color: rgba(
      255,
      255,
      255,
      0.5
    );
  }
`;
