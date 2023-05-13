import styled, {
  keyframes,
} from "styled-components";
// images
import Pokeball from "../../assets/images/pokeball.svg";

const scale = keyframes`
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
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
    height: 90%;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    background-color: ${(props) =>
      props.background};
    filter: blur(140px);
  }
`;

const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  border-radius: var(
    --card-border-radius
  );
  overflow: hidden;
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
    background-position: 300% -100px;
    background-size: 120%;
  }
  & > img {
    margin: 1rem 0 0 1rem;
    cursor: pointer;
    transition: 0.5s ease-in-out;
    &:hover {
      transform: scale(1.1);
      transition: 0.5s ease-in-out;
    }
  }
  & .pokemon-image {
    width: 100%;
    height: auto !important;
    max-height: 380px;
    max-width: 400px;
    transition: 0.8s ease-in-out;
    filter: drop-shadow(
      1px 10px 17px rgba(0, 0, 0, 0.4)
    );
    animation: ${scale} 1s linear;
  }
  & .header {
    padding: 0.8rem;
    top: 1.5rem;
    right: 30px;
    svg {
      width: 35px;
      height: 35px;
    }
  }
  @media screen and (max-width: 600px) {
    & .header {
      padding: 0.7rem;
      svg {
        width: 40px;
        height: 40px;
      }
    }
  }
`;

const CardBody = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  padding: 0 3rem 1rem 3rem;
  grid-template-columns: repeat(
    auto-fit,
    minmax(300px, 1fr)
  );
  gap: 1rem;
  @media screen and (max-width: 760px) {
    padding: 0 1.5rem 1rem 1.5rem;
    grid-template-columns: repeat(
      auto-fit,
      minmax(240px, 1fr)
    );
    & > div:first-of-type {
      padding: 2rem 1rem;
    }
    & > div:last-of-type {
      padding: 1rem;
      display: flex;
      justify-content: center;
    }
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  &:first-of-type {
    max-width: 450px;
    padding: 3rem 3rem 3rem 0;
  }
  &:last-of-type {
    justify-content: center;
    padding: 3rem 1.5rem;
  }
  & > span {
    font-size: clamp(
      3.5rem,
      5vw,
      1.5rem
    );
    color: var(
      --transparent-font-color
    );
  }
  & h2 {
    font-size: 2.8rem;
    padding-bottom: 0.5rem;
    text-transform: uppercase;
    color: #fff;
    width: fit-content;
  }

  & p {
    color: var(--white);
    font-size: 18px;
    padding: 1.5rem 0;
    font-weight: 600;
  }

  & .pokemon-types {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 7px;
  }

  & > a {
    margin-top: 1rem;
    width: 100%;
  }
`;

const PokemonData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    color: var(--white);
    font-size: 1.5rem;
  }
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  padding: 3rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(
    --transparent-white
  );
  box-shadow: var(--footer-box-shadow);
  & .favorites {
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 0.1rem;
    gap: 1rem;
    font-size: clamp(1rem, 2vw, 2rem);
    & svg {
      width: 35px;
      height: 35px;
    }
  }
  @media screen and (max-width: 760px) {
    padding: 2rem 1.5rem;
  }
`;

export {
  Overlay,
  Container,
  CardBody,
  CardContent,
  PokemonData,
  Footer,
};
