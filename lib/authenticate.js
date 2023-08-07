import jwtDecode from "jwt-decode";

/** Building an "Authentication" Library */

/** set the user token in a local storage */
export const setToken = (token) => localStorage.setItem('access_token', token)

/** get the current loggedin user's JWT Token stored locally*/
export const getToken = () => {
    try {
        return localStorage.getItem('access_token')
    } catch (err) {
        console.error(err.message)
    }
}

/** check if there is any valid access token present or not, and remove accordingly */
export const removeToken = () => localStorage.removeItem('access_token')

/** read the token with hwt-decode */
export const readToken = () => {
    try {
        const token = getToken()
        return token ? jwtDecode(token) : null
    } catch (err) {
        console.error(err.message)
    }

}

/** authenticate the give user */
export const authenticateUser = async (user, password) => {
    // Simulating authentication logic here...
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
        method: 'POST',
        body: JSON.stringify({ userName: user, password: password }),
        headers: {
            'content-type': 'application/json',
        },
    });

    const data = await res.json();

    if (res.status === 200) {
        setToken(data.token);
        return true;
    } else {
        throw new Error(data.message);
    }
}



/** simply return true if the given user is authenticated */
export function isAuthenticated() {
    const token = readToken();
    return token ? true : false;
}

export const registerUser = async (user, password, password2) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ userName: user, password: password, password2: password2 })
    })

    const data = await res.json()
    
    /** check if the return result status is (200) */
    if (!data) {
        return;
    }
    else {
        return true
    }
}

