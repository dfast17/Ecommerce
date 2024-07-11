export const postCreate = async (data: any, token: string) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/post`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    }).then((res) => res.json());
};