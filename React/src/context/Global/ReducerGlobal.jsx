function ReducerGlobal (state, action) {
    switch(action.type){
        
        case 'CLELAR_MESSAGE':
            return {
                ...state,
                message: null,
            }

        case 'FETCH_ERRORS':
            return {
                ...state,
                errors: action.errors,
            }

        case 'FORM_SUBMMIT_SUCCESS':
            return {
                ...state,
                errors: null,
                message: action.message
            }

        case 'UPDATED': 
            return {
                ...state,
                user: action.user,
                themeColor: action.themeColor,
                currencies: action.currencies,
                currentLocale: action.currentLocale,
                lang: action.lang,
                currentCurrecy: action.currentCurrecy,
                csrf_token: action.csrf_token,
            }

        default:
            return state;
    }
}

export default ReducerGlobal; 