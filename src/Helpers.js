export function makeRequestOptions(body, method = 'POST') {
    if (method === 'GET') {
        return {
            method,
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
        };
    }
    return {
        method,
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    };
}

export function fetchWrapper(url, body, method = 'POST') {
    if (method === 'GET') {
        if (body) {
            const queryParams = new URLSearchParams(body).toString();
        }
    }
    return fetch(url, makeRequestOptions(body, method))
        .then(response => {
            if (!response.ok) {
                // Always print this
                console.log(response.json());
                return {
                    'success': false,
                    'error': `Unexpected error on ${url}`,
                }
            }
            return response.json();
        })
        .catch((error) => {
            return {
                'success': false,
                'error': error.message,
            }
        });
}