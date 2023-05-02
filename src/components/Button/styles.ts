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
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.5s ease-in-out;
  text-transform: uppercase;
  &:hover {
    color: var(--white);
    transition: 0.5s ease-in-out;
    background-color: rgba(
      255,
      255,
      255,
      0.5
    );
  }
`;
