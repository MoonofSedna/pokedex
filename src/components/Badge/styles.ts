import styled from "styled-components";

const Badge = styled.label<{
  background: string;
}>`
  &.selected {
    cursor: pointer;
    transition: var(--btn-transition);
    &:not(
        :has(input:checked),
        :has(input:disabled)
      ):active {
      transform: scale(0.95);
      transition: var(--btn-transition);
    }
  }
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-height: 32px;
  font-size: 0.8rem;
  box-shadow: var(--btn-box-shadow);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing);
  font-weight: var(--bold);
  text-align: center;
  vertical-align: baseline;
  border-radius: var(
    --badge-border-radius
  );
  color: var(--white);
  padding: 0.5rem 0.6rem;
  background-color: ${(props) =>
    props.background};
  & img {
    margin-right: 0.4rem;
  }
  & span {
    line-height: 0;
  }
  &:has(input:disabled) {
    opacity: 0.8;
    cursor: default;
    & span:before {
      cursor: default;
    }
  }
`;

const RadioButton = styled.div`
  margin-left: 0.3rem;
  & input {
    position: absolute;
    opacity: 0;
    + span {
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
      + span {
        &:before {
          background-color: #9999;
          box-shadow: inset 0 0 0 4px
            var(--white);
        }
      }
    }
    &:focus {
      + span {
        &:before {
          outline: none;
          border-color: #fff;
        }
      }
    }
    &:disabled {
      + span {
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
    + span {
      &:empty {
        &:before {
          margin-right: 0;
        }
      }
    }
  }
`;

export { Badge, RadioButton };
