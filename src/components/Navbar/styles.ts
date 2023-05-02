import styled from "styled-components";

export const Navbar = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & > span {
    font-size: 2em;
  }
  ul {
    display: flex;
    list-style: none;
    gap: 5px;
    a,
    div {
      cursor: pointer;
      padding: 10px 15px;
      text-transform: uppercase;
      text-align: center;
      display: block;
      color: var(--white);
      font-size: 0.99em;
      position: relative;
    }
    & li:not(.btn) {
      a,
      div {
        &::before {
          content: "";
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 3px;
          background: rgba(
            255,
            255,
            255,
            0.8
          );
          opacity: 0;
          transform: translate(0, 10px);
          transition: opacity 0.3s ease,
            transform 0.3s ease;
        }
        &:hover::before {
          opacity: 1;
          transform: translate(0, -3px);
        }
      }
    }
    & li.btn a,
    div {
      font-weight: var(--bold);
      color: var(--dark-blue);
      background-color: var(--white);
      border-radius: 5px;
      transition: all 0.3s ease;
      &:hover {
        color: var(--white);
        background-color: var(
          --transparent-font-color
        );
      }
    }
  }
  @media screen and (max-width: 500px) {
    ul a,
    ul div {
      font-size: 0.9em;
    }
    & img {
      width: 80px;
      height: 25px;
    }
  }
`;
