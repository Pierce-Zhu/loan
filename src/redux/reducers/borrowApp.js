const initialState = {
    borrowApp:{},
}

export default function (state = initialState, action){
    switch (action.type) {
        case 'LOAN_REQUEST':
            return {
                ...state,
            }
        case 'LOAN_SUCCESS':
            return {
                ...state,
                borrowApp: action.borrowApp,
            }
        case 'LOAN_FAILURE':
            return {
                ...state,
            }
        case 'CONFIRM_LOAN_REQUEST':
            return {
                ...state,
            }
        case 'CONFIRM_LOAN_SUCCESS':
            return {
                ...state,
            }
        case 'CONFIRM_LOAN_FAILURE':
            return {
                ...state,
            }
        default:
            return state
    }
}