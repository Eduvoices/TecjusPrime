import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/logo.png'
import * as S from './styles.js'

export const Login = () => {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")

    function handleEnter(e) {
        if (e.keyCode === 13) {
            const input = e.target.form
            const i = Array.prototype.indexOf.call(input, e.target)
            input.elements[i + 1].focus()
            e.preventDefault()
        }
    }
    const navigate = useNavigate();

    return (
        <S.Container className="container">
        <S.ContainerLogin className="container-login">
            <S.Wrapper className="wrapper">
            <S.LoginForm className="login-form">

                <div id='central-img'>
                    <img src={logo} alt="Logo do sistema"/>
                </div>

                <S.WrapInput className='wrap-input'>
                <S.Input
                type='email'
                value={user}
                onChange={e => setUser(e.target.value)}
                onKeyDown={handleEnter}
                />
                <S.FocusInput className='focus-input' data-placeholder='E-mail'></S.FocusInput>
                </S.WrapInput>

                <S.WrapInput className='wrap-input'>
                <S.Input
                type='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={handleEnter}
                />
                <S.FocusInput className='focus-input' data-placeholder='Senha'></S.FocusInput>
                </S.WrapInput>

                <S.Remember>
                    <input type='checkbox' id='remember'/>
                    <label htmlFor='remember'>Lembrar e-mail</label>
                </S.Remember>

                <S.ContainerFormBtn className='container-login-form-btn'>
                <S.FormBtn className='login-form-btn' type='submit' onClick={() => {navigate('/dashboard')}}>
                    Entrar
                </S.FormBtn>
                </S.ContainerFormBtn>

            </S.LoginForm>
            </S.Wrapper>
        </S.ContainerLogin>
        </S.Container>
    );
};
