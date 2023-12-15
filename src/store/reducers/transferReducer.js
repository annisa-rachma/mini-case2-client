const initialState = {}

export default function transferReducer(state = initialState, action) {
    switch (action.type) {
        case 'setTransfer':
            return {...state, ...action.payload}
        default:
            return state
    }
}
