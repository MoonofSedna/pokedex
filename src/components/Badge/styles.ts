import styled from "styled-components";

const Badge = styled.div<{
  background: string;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 33px;
  font-size: 0.8rem;
  box-shadow: var(--btn-box-shadow);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing);
  font-weight: var(--bold);
  text-align: center;
  vertical-align: baseline;
  border-radius: 0.3rem;
  color: #fff;
  padding: 0.5rem 0.6rem;
  font-family: var(--fira-sans);
  background-color: ${(props) =>
    props.background};
  & img {
    margin-right: 0.4rem;
  }
  & span {
    line-height: 0;
  }
`;

const RadioButton = styled.div<{
  color: string;
}>`
  margin-left: 0.3rem;
  & input {
    position: absolute;
    opacity: 0;
    + .radio-label {
      &:before {
        content: "";
        background: var(--white);
        border-radius: 100%;
        border: 1px solid
          darken(var(--white), 25%);
        display: inline-block;
        width: 1em;
        height: 1em;
        position: relative;
        top: 0;
        margin-right: 1em;
        vertical-align: top;
        cursor: pointer;
        text-align: center;
        transition: all 250ms ease;
      }
    }
    &:checked {
      + .radio-label {
        &:before {
          background-color: ${(props) =>
            props.color};
          box-shadow: inset 0 0 0 4px
            var(--white);
        }
      }
    }
    &:focus {
      + .radio-label {
        &:before {
          outline: none;
          border-color: #fff;
        }
      }
    }
    &:disabled {
      + .radio-label {
        &:before {
          box-shadow: inset 0 0 0 4px
            #fff;
          border-color: darken(
            #fff,
            25%
          );
          background: darken(#fff, 25%);
        }
      }
    }
    + .radio-label {
      &:empty {
        &:before {
          margin-right: 0;
        }
      }
    }
  }
`;

export { Badge, RadioButton };
