export const RequestAjax = async (url: any, method: string, dataToSave: any = '', needAuthorization = false, files = false) => {
  let charging = true;

  let options: { method: string, body?: string, headers?: HeadersInit } = {
    method: 'GET',
    body: undefined,
    headers: undefined
  };

  if (method == 'GET' || method == 'DELETE') {
    // add orderBy param to url if exists
    if (dataToSave.orderBy) {
      url += `?orderBy=${encodeURIComponent(JSON.stringify(dataToSave.orderBy))}`;
      delete dataToSave.orderBy;
    }

    options = {
      method
    }

    needAuthorization ? 
      options.headers = { 
        'Accept': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      } : options.headers = {
        'Accept': 'application/json'
      };
  }

  if (method == 'POST' || method == 'PUT' || method == 'PATCH') {
    if ( files ) {
      options = {
        method,
        body: dataToSave
      }
    } else {
      options = {
        method,
        body: JSON.stringify(dataToSave)
      }
    }

    needAuthorization ? 
      options.headers = { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      } : options.headers = {
        'Content-Type': 'application/json'
      };
  }

  const request = await fetch(url, options);
  const data = await request.json();

  charging = false

  return {
    data,
    charging
  }
}
