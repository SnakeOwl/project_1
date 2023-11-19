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

    default:
      return state;
  }
}
