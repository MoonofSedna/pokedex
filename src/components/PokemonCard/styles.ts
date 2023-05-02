import styled, {
  keyframes,
} from "styled-components";

const progressBar = keyframes`
    to {
      transform: initial;
    }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const PokemonStats = styled.div`
  width: 100%;
  padding: 2.5rem 4.5rem 2.5rem 2.5rem;
  @media (max-width: 62.5rem) {
    padding: 2rem 1.5rem 2.5rem;
  }
`;

const StatsTitle = styled.span`
  font-size: clamp(1.5rem, 5vw, 2rem);
  line-height: 2.5rem;
  display: block;
  margin-bottom: 2rem;
  color: var(--white);
`;

const StatsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  span {
    font-size: 1rem;
    line-height: 1;
    display: inline-block;
    text-align: left;
    min-width: 2rem;
  }
  span:nth-child(1) {
    min-width: 4.38rem;
  }
  span:nth-child(2) {
    min-width: 4rem;
    margin: 0 1rem 0 0.7rem;
    font-weight: 700;
  }
  li {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    color: var(--white);
  }
  @media (max-width: 31.25rem) {
    span:nth-child(2) {
      margin: 0 0.75rem;
    }
  }
`;

const EvolutionList = styled.div`
  & > div:not(:last-of-type) {
    border-bottom: solid 1px
      rgba(0, 0, 0, 0.151);
  }
`;

const EvolutionGroup = styled.div`
  display: grid;
  padding: 2rem 0;
  grid-template-columns: repeat(
    auto-fit,
    minmax(120px, 1fr)
  );
  @media screen and (max-width: 550px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(200px, 1fr)
    );
  }
`;

const Evolution = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  &:hover img {
    filter: drop-shadow(
      1px 8px 12px rgba(0, 0, 0, 0.3)
    );
  }
  & span {
    text-transform: capitalize;
    font-size: 1rem;
    line-height: 1;
    font-weight: 400;
    display: inline-block;
    color: var(--white);
  }
`;

const ArrowRight = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 2rem;
  & span {
    color: var(--white);
  }
  & img {
    opacity: 0.3;
    position: relative;
    z-index: 1;
  }
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 0.5rem;
  border-radius: 0.25rem;
  background: #555;
  overflow: hidden;
  backface-visibility: hidden;
  box-shadow: var(--btn-box-shadow);
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
  -webkit-transform: translate3d(
    0,
    0,
    0
  );
  -moz-transform: translate3d(0, 0, 0);
`;

const ProgressBarFill = styled.div<{
  base_stat: number;
}>`
  height: 0.5rem;
  border-radius: 0.25rem;
  transform: translate3d(-100%, 0, 0);
  animation: ${progressBar} 2s forwards;
  width: ${(props) =>
    props.base_stat >= 100
      ? "100%"
      : `${props.base_stat}%`};
  background: ${(props) =>
    props.base_stat >= 50
      ? "#1CD80E"
      : "#FF364E"};
  box-shadow: 0 0 0.75rem 0.25rem
    ${(props) =>
      props.base_stat >= 50
        ? "rgba(28, 216, 14, 0.25)"
        : "rgba(255, 54, 78, 0.25)"};
`;

const EvolutionCard = styled.div`
  display: flex;
  justify-content: center;
`;

export {
  Container,
  EvolutionList,
  EvolutionGroup,
  Evolution,
  ArrowRight,
  EvolutionCard,
  PokemonStats,
  StatsTitle,
  StatsList,
  ProgressBar,
  ProgressBarFill,
};
