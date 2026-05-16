import React, { useEffect, useState } from 'react'
import SweetAlert from '../../../SweetAlert2.js'

export default function AddUserView({onSave, roles}) {
    const [Name, setName] = useState('');
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const [RolID, setRolID] = useState('');

    const safeRoles = Array.isArray(roles) ? roles : [];

    const handleRoleChange = (event) => {
        setRolID(event.target.value);
    };

    useEffect(() => {
        if (!RolID && safeRoles.length > 0) {
            setRolID(safeRoles[0].rolId);
        }
    }, [roles, safeRoles.length, RolID]);

    const saveUser = () => {
        if(Name.trim() !== '' && Username.trim() !== '' && Password.trim() !== '' && RolID){
            const data = {
                name : Name,
                username : Username,
                password : Password,
                rolId : RolID,
                state : true
            }
    
            onSave(data);
        }
        else{
            SweetAlert.ShowMessage('Debe llenar todos los campos y seleccionar un rol', 'Error', 'error');
        }
    };

    return (
        <div className="modal fade" id="modalAdd" data-bs-backdrop="static" tabIndex="-1" aria-labelledby="addTitle" aria-hidden="true" >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-light">
                        <h5 className="modal-title" id="addTitle">Agregar usuario</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body p-0 ">
                        <div className='row mx-3 my-2'>
                            <div className='mb-2'>
                                <label >Nombre completo: </label>
                                <input type="text" className='form-control' onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='mb-2'>
                                <label >Nombre de usuario: </label>
                                <input type="text" className='form-control' onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className='mb-2'>
                                <label >Contraseña: </label>
                                <input type="password" className='form-control' onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className='mb-2'>
                                <label >Rol: </label>
                                <select className='form-select' value={RolID} onChange={handleRoleChange}>
                                    <option value='' disabled>Seleccione un rol</option>
                                    {
                                        safeRoles.map(rol => (
                                            <option key={rol.rolId} value={rol.rolId}>{rol.name}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer bg-light">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" className="btn btn-theme-primary" onClick={saveUser}>Guardar</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
