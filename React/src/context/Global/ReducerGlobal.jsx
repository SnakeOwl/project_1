function ReducerGlobal (state, action) {
    switch(action.type){

        case 'ERASE_USER_AND_TOKEN':
            localStorage.removeItem("ACCESS_TOKEN");
            return {
                ...state,
                user: null,
            }

        case 'SET_LANG':
            return {
                ...state,
                lang: action.lang,
            }

        case 'SET_USER':
            return {
                ...state,
                user: action.user
            }

        case 'LOGIN':
            if (action.csrf_token){
                localStorage.setItem('ACCESS_TOKEN', action.csrf_token);
            }else{
                localStorage.removeItem('ACCESS_TOKEN');
            }
            
            return {
                ...state,
                user: action.user,
            }        

        case 'SET_MESSAGE':
            return {
                ...state,
                message: action.message,
            }

        case 'CLELAR_MESSAGE':
            return {
                ...state,
                message: null,
            }

        case 'SET_ERRORS':
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

        case 'INIT': 
            return {
                ...state,
                currencies: action.currencies,
                currentLocale: action.currentLocale,
                lang: action.lang,
                currentCurrency: action.currentCurrency,
            }

        default:
            return state;
    }
}

export default ReducerGlobal; 