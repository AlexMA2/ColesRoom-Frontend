export default function searchReducer (state = '', action) {
    switch (action.type) {
        case "@user/auth" : 
            
            return action.payload
                
        default : 
            return state
    }
}