export const removeAuthToken = () => {
    const token = localStorage.getItem('token')
    if (token) {
        localStorage.removeItem('token')
    }
}

export const setLocalStorage = (data) => {
    const { token, _id } = data
    localStorage.setItem('token', token)
    localStorage.setItem('id', _id)
}
