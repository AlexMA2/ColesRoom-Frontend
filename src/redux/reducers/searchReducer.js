export default function searchReducer (state = '', action) {
    switch (action.type) {
        case "@search/typing" : 
            
            return action.payload
                
        default : 
            return state
    }
}