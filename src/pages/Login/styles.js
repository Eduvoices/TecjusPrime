import { styled } from "styled-components";

export const Container = styled.div`
    width: 100%;
    margin: 0 auto;
`
export const ContainerLogin = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    padding: 15px;
    background-color: #9999;
`
export const Wrapper = styled.div`
width: 480px;
height: 496px;
background-color: #fff;
border-radius: 12px;
overflow: hidden;
padding: 32px;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
position: relative;
`

export const LoginForm = styled.form`
width: 100%;

#central-img {
    display: flex;
    align-items: center;
    justify-content: center;
}

img {
    width: 240px;
    margin: 16px 0;

    @media (max-width: 480px) {
        width: 100%;
    }
}
`
export const WrapInput = styled.div`
    width: 100%;
    position: relative;
    border-bottom: 2px solid #999;
    margin: 24px 0;
`


export const FocusInput = styled.span`
    position: absolute;
    display: block;
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

    background: -webkit-linear-gradient(to left, #c9b4a0, #5f3106);
    background: -o-linear-gradient(to left, #c9b4a0, #5f3106);
    background: -moz-linear-gradient(to left, #c9b4a0, #5f3106);
    background: linear-gradient(to left, #c9b4a0, #5f3106);
    }

    &::after {
    font-size: 14px;
    color: #4b453d;
    display: block;
    width: 100%;
    position: absolute;
    left: 0;
    top: -16px;
    padding-left: 8px;
    content: attr(data-placeholder);

    -webkit-transition: all 0.4s;
    -o-transition: all 0.4s;
    -moz-transition: all 0.4s;
    transition: all 0.4s;
    }
`
export const Input = styled.input`
font-size: 14px;
color: #c4b69c;
border: none;
display: block;
width: 100%;
height: 36px;
background: transparent;
padding: 16px;

&:focus {
    outline: 0;

    & + ${FocusInput}::before {
        width: 100%;
    }

    & + ${FocusInput}::after {
        top: -16px;
        transition: all 0.4s;
    }
}
`

export const ContainerFormBtn = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
padding-bottom: 16px;

`
export const FormBtn = styled.button`
font-size: 14px;
border: none;
border-radius: 8px;
color: #fff;
line-height: 1.2;
text-transform: uppercase;
display: flex;
justify-content: center;
align-items: center;
width: 240px;
height: 40px;
background:  #4b453d;
margin-top: 32px;

@media (max-width: 480px) {
    margin-top: 8px;
    width: 100%;
}

&:hover {
    cursor: pointer;
    background: #665e53;
}
`
export const Remember = styled.div`
display: flex;
align-items: center;
justify-content: center;
color: #555;
padding: 8px;
font-size: 12px;
margin-top: -16px;

input {
    margin-right: 8px;
}
`
