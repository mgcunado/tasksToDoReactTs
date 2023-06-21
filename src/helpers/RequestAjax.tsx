export const RequestAjax = async (url: any, method: string, dataToSave: any = '', files = false) => {
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
        body: JSON.stringify(dataToSave),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    }
  }
  const request = await fetch(url, options);
  const data = await request.json();

  charging = false

  return {
    data,
    charging
  }
}
