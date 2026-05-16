const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const API_URL = `${API_BASE_URL}/User`;

export async function GetUsers() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response !== false) {//VALIDAR RESUPUESTA DEL SERVIDOR
      const data = await response.json();

      return data;
    }
    else {
      return false
    }
  } catch (error) {
    console.error(error);
  }
}

export async function GetUser(id) {
  try {
    const response = await fetch(API_URL + '/' + id, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response !== false) {//VALIDAR RESUPUESTA DEL SERVIDOR
      const data = await response.json();

      return data;
    }
    else {
      return false
    }
  } catch (error) {
    console.error(error);
  }
}

export async function Insert(data) {
  try {
    const requestBody = JSON.stringify(data);

    const response = await fetch(API_URL, {//SOLICITUD AL SERVIDOR
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody
    });

    return response.json();

  } catch (error) {
    console.error(error);
  }
}

export async function Edit(data) {
  try {
    const requestBody = JSON.stringify(data);

    const response = await fetch(API_URL, {//SOLICITUD AL SERVIDOR
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody
    });

    return response.json();

  } catch (error) {
    console.error(error);
  }
}

export async function Delete(id) {
  try {

    const response = await fetch(API_URL + '/' + id, {//SOLICITUD AL SERVIDOR
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: ''
    });

    return response.json();

  } catch (error) {
    console.error(error);
  }
}

export async function BeginSession(user, password) {
  try {
    const requestBody = JSON.stringify({//PREPARACION DE LOS DATOS QUE ENVIAREMOS EN EL BODY DE LA PETICION
      Username: user,
      Password: password
    });

    const response = await fetch(API_URL + '/Session', {//SOLICITUD AL SERVIDOR
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: requestBody
    });
    const data = await response.json();

    if (data !== false) {//VALIDAR RESUPUESTA DEL SERVIDOR
      const timeoutMinutes = Number(data.sessionTimeoutMinutes ?? 10);
      const issuedAt = data.sessionIssuedAt ?? new Date().toISOString();
      const expiresAt = data.sessionExpiresAt ?? new Date(Date.now() + timeoutMinutes * 60000).toISOString();

      sessionStorage.setItem("userId", String(data.userId));
      sessionStorage.setItem("userName", data.username);
      sessionStorage.setItem("rolID", String(data.rolID));
      sessionStorage.setItem("rol", data.rol);
      sessionStorage.setItem("name", data.name);
      sessionStorage.setItem("sessionTimeoutMinutes", String(timeoutMinutes));
      sessionStorage.setItem("sessionIssuedAt", issuedAt);
      sessionStorage.setItem("sessionExpiresAt", expiresAt);
      sessionStorage.setItem("lastActivity", Date.now().toString());
      return data;
    }
    else {
      return null
    }
  } catch (error) {
    console.error(error);
  }
}

export async function GetAccess(userID) {
    try {

        const response = await fetch(API_URL + '/Access/' + userID, {//SOLICITUD AL SERVIDOR
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response !== false) {//VALIDAR RESUPUESTA DEL SERVIDOR
            return await response.json();
        }
        else {
            return false
        }
    } catch (error) {
        console.error(error);
    }
}

export async function GetBranchAccess(userID) {
    try {

        const response = await fetch(API_URL + '/BranchAccess/' + userID, {//SOLICITUD AL SERVIDOR
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (response !== false) {//VALIDAR RESUPUESTA DEL SERVIDOR
            return await response.json();
        }
        else {
            return false
        }
    } catch (error) {
        console.error(error);
    }
}

export async function UpdateBranchAccess(userID, data) {
    try {
        let requestBody = JSON.stringify(data);
        const response = await fetch(API_URL + '/BranchAccess/' + userID, {//SOLICITUD AL SERVIDOR
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestBody
        });

        if (response !== false) {//VALIDAR RESUPUESTA DEL SERVIDOR
            return await response.json();
        }
        else {
            return false
        }
    } catch (error) {
        console.error(error);
    }
}