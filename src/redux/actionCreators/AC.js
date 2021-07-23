export const typeWord = (word) => {   
    return (dispatch) => {        
        dispatch({
            type: '@search/typing',
            payload: word
        })
    }
}

export const setUser = (user) => {
    return (dispatch) => {
        dispatch({
            type: '@user/auth',
            payload: user
        })
    }
}