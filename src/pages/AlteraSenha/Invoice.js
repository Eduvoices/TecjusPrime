import React from 'react';
import { useRef, useState } from 'react'

import './styles.css'

const Invoice = () => {
    const [senhaAtual, setSenhaAtual] = useState('')
    const [novaSenha, setNovaSenha] = useState('')
    const [confirmaSenha, setConfirmaSenha] = useState('')

    const refSenhaAtual = useRef(null)
    const refNovaSenha = useRef(null)
    const refConfirmaSenha = useRef(null)
    const refBtn = useRef(null)

    function handleEnter(event) {
        if (event.keyCode === 13) {
            const form = event.target.form
            const index = Array.prototype.indexOf.call(form, event.target)
            form.elements[index + 1].focus()
            event.preventDefault()
        }
    }

    function clear() {
        setConfirmaSenha('')
        setNovaSenha('')
        setSenhaAtual('')
    }

    function enableBtn() {
        let check = confirmaSenha === novaSenha
        if (senhaAtual && check && novaSenha) {
            return false
        } else {
            return true
        }
    }

    function enterAsTab(e) {
        if (e.keyCode === 13) {
            refBtn.current.focus()
        }
    }

    return (
    <div className='container'>
        <div className='container-senha'>
            <div className='wrapper'>

                <i className="pi pi-sign-out" id='exit'></i>

                <div className='form-title'>
                    Alterar Senha
                </div>

                <div className='form-title'>
                    <span id='required'>*Campo obrigatório</span>
                </div>

                <form className='senha-form'>
                    <div className='wrap-input'>
                        <input
                        type="password"
                        id='senha-atual'
                        className='input'
                        title='senha-atual'
                        placeholder=''
                        ref={refSenhaAtual}
                        onBlur={(e) => setSenhaAtual(e.target.value)}
                        onKeyDown={handleEnter}
                        />
                        {senhaAtual !== novaSenha || !senhaAtual ? (<span />) : (<p>A nova senha não pode ser igual à anterior.</p>)}
                        <label className='focus-input' htmlFor="senha-atual" data-placeholder='Senha Atual*'></label>
                    </div>

                    <div className='wrap-input'>
                        <input
                        type="password"
                        id='nova-senha'
                        className='input'
                        title='nova-senha'
                        placeholder=''
                        onKeyDown={handleEnter}
                        ref={refNovaSenha}
                        onBlur={(e) => setNovaSenha(e.target.value)}
                        />
                        <label className='focus-input' htmlFor="nova-senha" data-placeholder='Nova Senha*'></label>
                    </div>

                    <div className='wrap-input'>
                        <input
                        type="password"
                        id='confirma-senha'
                        className='input'
                        title='confirma-senha'
                        placeholder=''
                        onKeyDown={enterAsTab}
                        ref={refConfirmaSenha}
                        onChange={(e) => setConfirmaSenha(e.target.value)}
                        />
                        {confirmaSenha === novaSenha || !confirmaSenha ? (<span />) : (<p>Digite uma senha igual</p>)}
                        <label className='focus-input' htmlFor="confirma-senha" data-placeholder='Confirmar Senha*'></label>
                    </div>

                    <div className='button-row'>
                        <button type='button' className={!enableBtn() ? 'form-btn' : 'form-btn disabled'} disabled={enableBtn()} ref={refBtn}>
                            <i className="pi pi-check"></i>
                            Confirmar
                        </button>

                        <button type='reset' onClick={clear} className='form-btn'>
                            <i className="pi pi-times"></i>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
};

export default Invoice;
