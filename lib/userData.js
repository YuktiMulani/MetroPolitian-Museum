/** a put request to add to a favorite's by id 
 * todo: If the operation was successful (ie: status is 200), return the
 * data (ie: the result from calling res.json())
 * If the operation was not successful (ie: status was not 200)
 * return an empty array, ie: []
*/

import { getToken } from "./authenticate"

export const addToFavourites = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'PUT',
        headers: { Authorization: `JWT ${getToken()}` },
        body: JSON.stringify({ id: id })
    })
    
    const data = await res.json()

    // check the status returned
    if (res.status === 200) {
        return data
    } else {
        return []
    }
}

/** a DELETE request to remove a favorite's by id 
 * todo: If the operation was successful (ie: status is 200), return the
 * data (ie: the result from calling res.json())
 * If the operation was not successful (ie: status was not 200)
 * return an empty array, ie: []
*/
export const removeFromFavourites = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `JWT ${getToken()}` },
        body: JSON.stringify({ id: id })
    })

    const data = await res.json()

    // check the status returned
    if (res.status === 200) {
        return data
    } else {
        return []
    }

}

/** a get request to favorite's 
 * todo: If the operation was successful (ie: status is 200), return the
 * data (ie: the result from calling res.json())
 * If the operation was not successful (ie: status was not 200)
 * return an empty array, ie: []
*/
export const getFavourites = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
        method: 'GET',
        headers: { Authorization: `JWT ${getToken()}` },
        
    })

    const data = await res.json()

    // check the status returned
    if (res.status === 200) {
        return data
    } else {
        return []
    }

}

/** a put request to add to history a by id 
 * todo: If the operation was successful (ie: status is 200), return the
 * data (ie: the result from calling res.json())
 * If the operation was not successful (ie: status was not 200)
 * return an empty array, ie: []
*/
export const addToHistory = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'PUT',
        headers: { Authorization: `JWT ${getToken()}` },
        body: JSON.stringify({id: id })
    })

    const data = await res.json()

    // check the status returned
    if (res.status === 200) {
        return data
    } else {
        return []
    }
}

/** a DELETE request to remove an history by id 
 * todo: If the operation was successful (ie: status is 200), return the
 * data (ie: the result from calling res.json())
 * If the operation was not successful (ie: status was not 200)
 * return an empty array, ie: []
*/
export const removeFromHistory = async (id) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `JWT ${getToken()}` },
        body: JSON.stringify({id: id })
    })

    const data = await res.json()

    // check the status returned
    if (res.status === 200) {
        return data
    } else {
        return []
    }

}

/** a get request to history 
 * todo: If the operation was successful (ie: status is 200), return the
 * data (ie: the result from calling res.json())
 * If the operation was not successful (ie: status was not 200)
 * return an empty array, ie: []
*/
export const getHistory = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
        method: 'GET',
        headers: { Authorization: `JWT ${getToken()}` },
        // body: JSON.stringify({ id })
    })

    const data = await res.json()

    // check the status returned
    if (res.status === 200) {
        return data
    } else {
        return []
    }

}






