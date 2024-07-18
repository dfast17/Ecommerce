export const getOrder = async (token: string) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/order`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
};
export const getOrderByRoleShipper = async (token: string) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/order/shipper`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
}
export const getOrderById = async (token: string, id: string) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/order/detail/${id}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
}
export const updateStatusOrder = async (token: string, data: { id: string, data_update: [{ orderStatus: string, idShipper?: string }] }) => {
    return fetch(`${import.meta.env.VITE_REACT_APP_URL}/order/`, {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
}