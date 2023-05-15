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
    gap: 10px;
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
      font-weight: var(--bold);
    }
    & li {
      display: flex;
      align-items: center;
    }
    & a {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: var(--btn-transition);
      & svg {
        width: 15px;
        height: 15px;
        transition: var(
          --btn-transition
        );
      }
      &::after,
      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 2px;
        width: 0;
        will-change: width;
        transition: var(
          --btn-transition
        );
        background-color: var(--white);
      }
    }
    & li.btn a,
    div {
      font-weight: var(--bold);
      color: var(--dark-blue);
      background-color: var(--white);
      border-radius: 5px;
      transition: var(--btn-transition);
    }
    & .btn.active-link a,
    div:hover {
      color: var(--white);
      background-color: var(
        --transparent-font-color
      );
      transition: var(--btn-transition);
    }
  }

  @media screen and (min-width: 768px) {
    & li:not(.btn) a:hover,
    & li:not(.btn).active-link > a {
      transition: var(--btn-transition);
      & svg {
        transition: var(
          --btn-transition
        );
      }
      &::after,
      &::before {
        width: 100%;
        transition: var(
          --btn-transition
        );
      }
    }
  }

  @media screen and (max-width: 767px) {
    & ul li:not(.btn) a {
      background-color: var(--white);
      border-radius: 30px;
      padding: 10px;
      &:hover {
        color: var(--white);
        background-color: var(
          --transparent-font-color
        );
        & svg {
          fill: var(--white);
        }
      }
      & svg {
        width: 18px;
        height: 18px;
        fill: var(--dark-blue);
      }
      & span {
        display: none;
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
