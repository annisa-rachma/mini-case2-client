const initialState = {}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case 'login':
            return {...state, ...action.payload}
        case 'logout':
            return initialState
        case 'setUser':
            return {...state, ...action.payload}
        default:
            return state
    }
}
