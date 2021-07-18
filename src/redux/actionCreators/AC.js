export const typeWord = (word) => {   
    return (dispatch) => {        
        dispatch({
            type: '@search/typing',
            payload: word
        })
    }
}