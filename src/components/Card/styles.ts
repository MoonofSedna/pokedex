import styled, {
  keyframes,
} from "styled-components";
// images
import Pokeball from "../../assets/images/pokeball.svg";

export const fade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const Overlay = styled.div<{
  background: string;
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  backface-visibility: hidden;
  &::after {
    content: "";
    width: 85%;
    height: 85%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${(props) =>
      props.background};
    filter: blur(80px);
  }
`;

const CardContainer = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  border-radius: var(
    --card-border-radius
  );
  overflow: hidden;
  opacity: 1;
  animation: ${fade} 1s linear;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: 0.8;
    background-image: url(${Pokeball.src});
    background-repeat: no-repeat;
    background-position: 300%;
    background-size: 120%;
    transition: background-position 0.8s
      ease-in-out;
  }
  & .pokemon-image {
    filter: drop-shadow(
      1px 10px 17px rgba(0, 0, 0, 0.6)
    );
  }
  &:hover {
    &::before {
      background-position: -200%;
      transition: background-position
        0.8s ease-in-out;
    }
  }
  &:hover .pokemon-image {
    transform: scale(1.1);
    transition: 0.8s ease-in-out;
  }
  &:hover .show-more {
    height: 100%;
    visibility: visible;
    transition: var(--btn-transition);
    & > span {
      opacity: 1;
      transition: var(--btn-transition);
    }
  }
  &:hover .pokemon-types {
    opacity: 0;
    transition: var(--btn-transition);
  }
`;

const CardHeader = styled.div`
  width: 100%;
  position: relative;
  padding: 0 0.5rem;

  & > div {
    cursor: pointer;
    position: absolute;
    z-index: 2;
    right: 0;
    top: 40px;
  }
`;

const CardBody = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  & h2 {
    width: 80%;
    text-transform: capitalize;
    letter-spacing: 0.05rem;
    padding-bottom: 1rem;
    font-size: clamp(
      1.5rem,
      2vw,
      1.8rem
    );
    color: var(--white);
  }
  & img {
    transition: 0.8s ease-in-out;
  }
  & > span {
    font-size: 1.5rem;
    background-color: var(
      --transparent-white
    );
    position: absolute;
    padding: 0.5rem 1rem 0.5rem 1.1rem;
    top: 0;
    right: 0;
    color: var(
      --transparent-font-color
    );
    border-radius: 0 0 0 30px;
    box-shadow: 0px 2px 8px 0px
      rgba(0, 0, 0, 0.3);
  }
`;

const CardFooter = styled.div<{
  background: string;
}>`
  width: 100%;
  padding: 1rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: var(--transparent-white);
  position: relative;
  box-shadow: var(--footer-box-shadow);
  & .pokemon-types {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
    opacity: 1;
    transition: 1s ease-in-out;
  }
  & .show-more {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 0;
    bottom: 0;
    left: 0;
    transition: 0.8s ease-in-out;
    visibility: hidden;
    &::before {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background: ${(props) =>
        props.background};
      opacity: 0.5;
      z-index: -1;
    }
    & > span {
      color: var(--white);
      opacity: 0;
      text-transform: uppercase;
      transition: var(--btn-transition);
    }
  }
`;

export {
  Overlay,
  CardContainer,
  CardHeader,
  CardBody,
  CardFooter,
};
