import styled from 'styled-components'

export const Container = styled.div`
width: 100%;
margin: 0 auto;
`

export const ContainerSenha = styled.div`
width: 100%;
min-height: 100vh;
display: flex;
flex-wrap: wrap;
align-items: center;
justify-content: center;
padding: 16px;
background-color: #9999;
`

export const Wrapper = styled.div`
width: 1280px;
height: 100%;
padding: 24px;
background-color: #fff;
border-radius: 12px;
overflow: hidden;
box-shadow: rgba(0, 0, 0, 0.24 );
position: relative;
`

export const FormTitle = styled.div`
display: block;
font-size: 24px;
color: #c4b69c;
line-height: 1.2;
text-align: center;
margin: 36px 0;

img {
    width: 360px;

    @media (max-width: 480px) {
        width: 100%;
    }
}
`
export const SenhaForm = styled.form`
line-height: 1.2;
margin: 24px 0;
display: flex;
flex-wrap: wrap;
justify-content: space-around;
align-items: center;
margin-top: 32px;

@media (max-width: 1023px) {
    width: 100%;
    display: block;
}
`
export const FocusInput = styled.label`
position: absolute;
text-align: justify;
width: 100%;
height: 100%;
top: 0;
left: 0;
pointer-events: none;
color: #9999;

&::before {
    content: "";
    display: block;
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;

    background: #c9b4a0;
    background: -webkit-linear-gradient(to left, #c9b4a0, #5f3106);
    background: -o-linear-gradient(to left, #c9b4a0, #5f3106);
    background: -moz-linear-gradient(to left, #c9b4a0, #5f3106);
    background: linear-gradient(to left, #c9b4a0, #5f3106);
}

&::after {
    font-size: 12px;
    color: #4b453d;
    line-height: 1.2;
    display: block;
    width: 100%;
    position: absolute;
    top: -16px;
    left: 0;
    padding-left: 8px;
    content: attr(data-placeholder);

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
}
`
export const WrapInput = styled.div`
position: relative;
border-bottom: 2px solid #adadad;
margin-bottom: 32px;
width: 360px;

p {
    font-size: 10px;
    color: red;
}

@media (max-width: 1023px) {
    width: 100%;
}

.input {
    font-size: 16px;
    color: #c4b69c;
    padding: 24px;
    border: none;
    text-align: left;
    height: 48px;
    background-color: transparent;
    width: 100%;

    @media (max-width: 1023px) {
        width: 100%;
        text-align: center;
    }

    &:focus {
        outline: 0;

        & + ${FocusInput}::after {
            top: -16px;
            transition: all 0.4s;
        }

        & + ${FocusInput}::before {
            width: 100%;
        }
    }
}
`
export const Exit = styled.img`
display: flex;
position: absolute;
top: 0;
right: 0;
padding: 16px;
cursor: pointer;
`
export const ButtonRow = styled.div`
display: flex;
justify-content: center;
width: 100%;

.disabled {
    background-color: #f1f1f1;
}

@media (max-width: 480px) {
    width: 100%;
}
`
export const FormBtn = styled.button`
padding: 8px;
font-size: 12px;
border: none;
border-radius: 8px;
color: #fff;
line-height: 1.2;
text-transform: uppercase;
display: flex;
justify-content: center;
align-items: center;
width: 240px;
height: 48px;
background: #4b453d;
margin-left: 4px;
position: relative;
margin-right: 48px;
pointer-events: ${(props) => props.disabled?'none':null};

&:hover {
    cursor: pointer;
    filter: brightness(80%);
}

@media (max-width: 1023px) {
    width: 100%;
    margin-bottom: 8px;
}

i {
    margin-right: 8px;
}
`
export const Required = styled.span`
font-size: 12px;
color: #c4b69c;
line-height: 1.2;
`
