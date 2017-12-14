const initialState = {
    isLoading:true,
    value:[],
}

export default function (state = initialState, action){
    switch (action.type) {
        case 'QUERY_LOAN_RECORD_REQUEST':
            return {
                ...state,
            }
        case 'QUERY_LOAN_RECORD_SUCCESS':
            return {
                ...state,
                isLoading:false,
                value: action.value,
            }
            case 'QUERY_LOAN_RECORD_FAILURE':
            return {
                ...state,
                isLoading:false,
            }
        default:
            return state
    }
}