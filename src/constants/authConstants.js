export const BASE_URL = 'https://lyftrac.herokuapp.com/api'

export const getAuthHeaders = (token) => {
    return { headers: { Authorization: `Bearer ${token}` } }
}
