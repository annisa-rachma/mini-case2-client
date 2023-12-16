const initialState = {branches : [], branchById : null}

export default function branchReducer(state = initialState, action) {
    switch (action.type) {
        case 'setBranches':
            return {...state, branches:action.payload}
        default:
            return state
    }
}
