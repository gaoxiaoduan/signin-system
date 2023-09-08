export const request = (url: string, options?: RequestInit): Promise<any> => {
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Request failed with status ${res.status}`);
                }
                return res.json();
            })
            .then(data => resolve(data))
            .catch(err => reject(err));
    });
};

export const getRequest = (url: string, params = {}, options?: RequestInit) => {
    const queryString = Object.entries(params)
        .map(([key, value]: any) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");
    const requestUrl = `${url}?${queryString}`;
    return request(requestUrl, {
        method: "GET",
        ...options,
    });
};

export const postRequest = (url: string, params = {}, options?: RequestInit) => {
    return request(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
        ...options,
    });
};