export default function searchReducer (state = '', action = '@search/nothing') {
    switch (action.type) {
        case "@search/typing" : 
            
            return action.payload
        case "@search/nothing" :
            return state          
        case "@search/pressenter":
            return action.payload      
        default : 
            return state
    }
}