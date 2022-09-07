import produce from "immer";
import { actionTypes } from "./action"
const initialState = {
    movies: null,
    selectedMovies: null,
    cinemas: null,
    schedule: null,
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_MOVIES:
            {
                const newState = produce(state, (draft) => {
                    draft.movies = action.payload
                })
                return newState;
            }

        case actionTypes.SET_SELECTMOVIE:
            {
                const newState = produce(state, (draft) => {
                    draft.selectedMovies = action.payload
                })
                return newState;
            }
        case actionTypes.SET_CINEMAS:
            {
                const newState = produce(state, (draft) => {
                    draft.cinemas = action.payload
                })
                return newState;
            }
        case actionTypes.SET_SCHEDULE:
            {
                const newState = produce(state, (draft) => {
                    draft.schedule = action.payload[0]
                })
                return newState;
            }
        default:
            return state;
    }
};
export default reducer;