import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 95%;
  max-width: 500px;
  padding: 1rem 0 2rem 0;
  & h3 {
    font-size: clamp(1.8rem, 2vw, 2rem);
    font-weight: var(--bold);
    margin-bottom: 2rem;
  }
  & span {
    width: fit-content;
    color: var(--white);
    background-color: var(--red);
    font-size: 0.7rem;
    padding: 2px 5px;
    border-radius: 5px;
    margin: 0.5rem 0 0.1rem 0.6rem;
  }
  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 5px 0;
  }

  & label {
    width: 100%;
    display: block;
    font-size: 1rem;
    font-weight: var(--bold);
    letter-spacing: 1px;
    margin: 0.5rem 0 0.5rem 0.6rem;
  }
  & input {
    font-size: 1rem;
    font-weight: 500;
    border: none;
    height: 32px;
    border-radius: 20px;
    padding: 1.4rem;
    width: 100%;
    color: var(--white);
    background: var(
      --transparent-font-color
    );
  }
  & input:focus {
    box-shadow: var(--btn-box-shadow);
    border: none;
    outline: none;
  }

  & input::placeholder {
    font-family: var(--fira-sans);
    color: var(--white);
  }

  & button {
    margin-top: 2rem;
    color: var(--white);
    background-color: var(--dark-blue);
  }
`;
