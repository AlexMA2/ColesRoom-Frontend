export default function userReducer (state = '', action = '@user/nothing') {
    switch (action.type) {
        case "@user/auth" :             
            return action.payload
        case "@user/logout" :
            return action.payload
        case "@user/nothing" :
            return state
        default : 
            return state
    }
}