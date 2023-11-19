import UserContextType from "./UserContextType";


type Action =
    | { type: 'SET_TOKEN', token: string }
    | { type: 'SET_BKEY', bkey: string }
    | { type: 'SET', token:string , bkey: string };


export default function ReducerUser(
    state: UserContextType,
    action: Action
): UserContextType {
    switch (action.type) {
        case "SET":{
            return {
                token: action.token,
                bkey: action.bkey
            }
        }

        case 'SET_TOKEN':
            return {
                ...action,
                token: action.token
            }

        case "SET_BKEY":
            return {
                ...action,
                bkey: action.bkey
            }

        default:
            return state;
    }
}
