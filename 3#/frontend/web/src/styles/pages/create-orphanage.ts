import styled from "styled-components";

export const Container = styled.div`
  display: flex;

  main {
    flex: 1;
  }
`;

export const Fieldset = styled.fieldset`
  border: 0;

  legend {
    width: 100%;

    font-size: 3.2rem;
    line-height: 3.4rem;
    color: ${(props) => props.theme.colors.title};
    font-weight: 700;

    border-bottom: 1px solid ${(props) => props.theme.colors.borderColor};
    margin-bottom: 4rem;
    padding-bottom: 2.4rem;
  }
`;

export const InputBlock = styled.div`
  label {
    display: flex;
    color: ${(props) => props.theme.colors.text};
    margin-bottom: 0.8rem;
    line-height: 2.4rem;

    span {
      font-size: 1.4rem;
      color: ${(props) => props.theme.colors.title};
      margin-left: 2.4rem;
      line-height: 2.4rem;
    }
  }

  input,
  textarea {
    width: 100%;
    background: ${(props) => props.theme.colors.inputBackground};
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    border-radius: 2rem;
    outline: none;
    color: ${(props) => props.theme.colors.title};
  }

  input {
    height: 6.4rem;
    padding: 0 1.6rem;
  }

  textarea {
    min-height: 12rem;
    max-height: 24rem;
    resize: vertical;
    padding: 1.6rem;
    line-height: 2.8rem;
  }

  .new-image {
    height: 9.6rem;
    background: ${(props) => props.theme.colors.inputBackground};
    border: 1px dashed ${(props) => props.theme.colors.tertiaryLight};
    border-radius: 2rem;
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      color: ${(props) => props.theme.colors.tertiaryLight};
    }
  }

  input[type="file"] {
    visibility: hidden;
    opacity: 0;
  }
`;

export const ImagesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1.6rem;
`;

export const Form = styled.form`
  width: 70rem;
  margin: 6.4rem auto;

  background: ${(props) => props.theme.colors.formBackground};
  border: 1px solid ${(props) => props.theme.colors.borderColor};
  border-radius: 2rem;

  padding: 6.4rem 8rem;

  overflow: hidden;

  ${Fieldset} + ${Fieldset} {
    margin-top: 8rem;
  }

  ${InputBlock} + ${InputBlock} {
    margin-top: 2.4rem;
  }

  .leaflet-container {
    margin-bottom: 4rem;
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    border-radius: 2rem;
  }
`;

export const ButtonSelect = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  button {
    height: 6.4rem;
    background: ${(props) => props.theme.colors.inputBackground};
    border: 1px solid ${(props) => props.theme.colors.borderColor};
    color: ${(props) => props.theme.colors.title};
    cursor: pointer;
  }

  button.active {
    background: ${(props) => `${props.theme.colors.tertiaryLight}1A`};
    border: 1px solid ${(props) => props.theme.colors.tertiaryLight};
    color: ${(props) => props.theme.colors.tertiary};
  }

  button:first-child {
    border-radius: 2rem 0px 0px 2rem;
  }

  button:last-child {
    border-radius: 0 2rem 2rem 0;
    border-left: 0;
  }
`;

export const ImagePreview = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 9.6rem;
    object-fit: cover;
    border-radius: 2rem;
  }

  button {
    position: absolute;
    top: 0;
    right: 0;

    background-color: #fff;
    padding: 1rem;
    padding-bottom: 0.5rem;
    border-top-right-radius: 2rem;
    border-bottom-left-radius: 2rem;

    border: 0;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      background-color: #ddd;
    }

    svg {
      color: #ff669d;
    }
  }
`;

export const ConfirmButton = styled.button`
  margin-top: 6.4rem;

  width: 100%;
  height: 6.4rem;
  border: 0;
  cursor: pointer;
  background: ${(props) => props.theme.colors.tertiary};
  border-radius: 2rem;
  color: #ffffff;
  font-weight: 800;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: background-color 0.2s;

  svg {
    margin-right: 1.6rem;
  }

  :hover {
    background: ${(props) => props.theme.colors.tertiaryDark};
  }
`;
