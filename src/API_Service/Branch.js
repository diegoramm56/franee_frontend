const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const API_URL = `${API_BASE_URL}/Branch`;

export async function GetBranches() {
    try {

        const response = await fetch(API_URL, {//SOLICITUD AL SERVIDOR
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

export async function GetBranch(id) {
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