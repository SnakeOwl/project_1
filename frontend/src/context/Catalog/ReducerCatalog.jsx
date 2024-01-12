export default function ReducerCatalog(state, action) {
    switch (action.type) {

        case "SET_OFFERS":
            return {
                ...state,
                offers: action.offers,
            };

        case "SET_ACTIVE_CATEGORY":
            return {
                ...state,
                activeCategoryAlias: action.activeCategoryAlias,
            };

        case "SET_ACTIVE_OPTIONS":
            return {
                ...state,
                activeOptions: action.activeOptions,
            };

        case "SET_OFFERS_AND_ACTIVE_OPTIONS":
            return {
                ...state,
                offers: action.offers,
                activeOptions: action.activeOptions,
            }

        default:
            return state;
    }
}
