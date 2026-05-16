import React, { useState } from 'react'
import logo from '../../images/Logo.png';

export default function LoginMainView({ onSubmit = async () => false, loading = false }) {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const handleSession = async (e) => {
        e.preventDefault();

        const success = await onSubmit(user, password);
        if (success) {
            setPassword('');
        }
    };

    return (
        <div className='w-100 vh-100 bg-light'>
            <div className='row w-100 h-100 bg-light d-flex justify-content-center align-items-center'>
                <div className='card px-4 py-3 shadow bg-light login'>
                    <form onSubmit={handleSession}>
                        <div className='text-center'>
                            <h3>Iniciar sesión</h3>
                            <img src={logo} alt="logo" className='logo' />
                        </div>
                        <div className='col-md-12 mb-3'>
                            <input className='form-control' value={user} onChange={e => setUser(e.target.value)} type="text" placeholder='Usuario' autoFocus required autoComplete='off' />
                        </div>
                        <div className='col-md-12 mb-3'>
                            <input className='form-control' value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Contraseña' required />
                        </div>
                        <div className='col-md-12'>
                            <button type='submit' className='btn btn-theme-tertiary w-100' disabled={loading}>
                                {loading ? 'Validando...' : 'Entrar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
