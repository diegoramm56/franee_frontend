import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LoginMainView from './LoginMainView'
import { BeginSession } from '../../API_Service/User.js'
import SweetAlert from '../../SweetAlert2.js'

export default function LoginMain({ onSuccess = () => {} }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSession = async (user, pass) => {
    try {
      setLoading(true);
      const session = await BeginSession(user, pass);
      if (session) {
        SweetAlert.ShowMessage(`Bienvenido ${session.name}`, 'Sesion iniciada', 'success');
        sessionStorage.setItem('lastActivity', Date.now().toString());
        onSuccess(session);
        const hasBranch = Boolean(sessionStorage.getItem('branchId'));
        const nextPath = hasBranch ? '/Products' : `/SelectBranch/${session.userId}`;
        navigate(nextPath, { replace: true });
        return true;
      }
      SweetAlert.ShowMessage('El usuario o contraseña son incorrectos', 'Error', 'error');
      return false;
    } catch (error) {
      console.error(error);
      SweetAlert.ShowMessage('No se pudo iniciar sesión', 'Error', 'error');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
        <LoginMainView onSubmit={handleSession} loading={loading} />
    </div>
  )
}
