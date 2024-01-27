import IUser from "@/interfaces/IUser";
import UserContextType from "./UserContextType";


type Action =
    | { type: 'SET', token: string, bkey: string, user: IUser }
    | { type: 'SET_TOKEN', token: string }
    | { type: 'SET_TOKEN_BKEY', token: string, bkey: string }
    | { type: 'SET_BKEY', bkey: string }
    | { type: 'SET_USER', user: IUser }
    | { type: 'CLEAR' }


export default function ReducerUser(
    state: UserContextType,
    action: Action
): UserContextType {

    switch (action.type) {
        case "SET": {
            return {
                token: action.token,
                bkey: action.bkey,
                user: action.user
            }
        }

        case 'SET_TOKEN':
            return {
                ...state,
                token: action.token
            }

        case "SET_BKEY":
            return {
                ...state,
                bkey: action.bkey
            }

        case "SET_USER":
            return {
                ...state,
                user: action.user
            }

        case "CLEAR":
            return {
                token: undefined,
                bkey: undefined,
                user: undefined
            }

        default:
            return state;
    }
}
