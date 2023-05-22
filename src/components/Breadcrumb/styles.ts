import styled from "styled-components";

export const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  font-size: 1rem;
  width: fit-content;
  text-transform: uppercase;
  letter-spacing: 0.06rem;
  font-weight: var(--bold);
  color: var(--white);
  padding: 1rem 0;
  margin: 2rem 0;
  gap: 1rem;
  flex-wrap: wrap;
  & > span:not(:nth-child(2n)) {
    padding: 0.5rem 0.6rem;
    color: var(--white);
    background-color: var(
      --transparent-white
    );
    border-radius: var(
      --badge-border-radius
    );
  }
`;

export const Type = styled.span<{
  background: string;
}>`
  background-color: ${(props) =>
    props.background !== "#000" &&
    props.background} !important;
`;
