const initialState = {
    user:{},
    isUploadBaseInfo:'未填',
    hasOperatorAuth:'未授权',
    hasIDAuth:'未认证',
    hasContactsAuth:'未授权',
    backIDCard:0,
    frontIDCard:0,
}

export default function (state = initialState, action){
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.user,
            }
        case 'LOGIN_FAILURE':
            return {
                ...state,
            }

        case 'LOGOUT_REQUEST':
            return {
                ...state,
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                user: {},
            }
        case 'LOGOUT_FAILURE':
            return {
                ...state,
            }

        case 'REGISTER_REQUEST':
            return {
                ...state,
            }
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                user: action.user,
            }
        case 'REGISTER_FAILURE':
            return {
                ...state,
            }

        case 'MODIFY_LOGIN_PASSWORD_REQUEST':
            return {
                ...state,
            }
        case 'MODIFY_LOGIN_PASSWORD_SUCCESS':
            return {
                ...state,
                user: action.user,
            }
        case 'MODIFY_LOGIN_PASSWORD_FAILURE':
            return {
                ...state,
            }

        case 'CONFIRM_BASEINFO_REQUEST':
            return {
                ...state,
            }
        case 'CONFIRM_BASEINFO_SUCCESS':
            return {
                ...state,
                isUploadBaseInfo:'已认证',
                user: action.user,
            }
        case 'CONFIRM_BASEINFO_FAILURE':
            return {
                ...state,
            }

        case 'CONTACTS_AUTH_DENIED':
            return {
                ...state,
                hasContactsAuth:'拒绝授权'
            }
        case 'CONTACTS_AUTH_SUCCESS':
            return {
                ...state,
                hasContactsAuth:'已授权'
            }
        case 'CONTACTS_AUTH_UNDEFINED':
            return {
                ...state,
            }

        case 'FRONT_ID_CARD':
            return {
                ...state,
                frontIDCard:action.data
            }
            case 'BACK_ID_CARD':
            return {
                ...state,
                backIDCard:action.data
            }

        case 'LIVENESS_SUCCESS':
            return {
                ...state,
                hasIDAuth:'已认证'
            }
        
        default:
            return state
    }
}