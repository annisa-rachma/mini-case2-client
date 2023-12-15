const initialState = {}

export default function reportReducer(state = initialState, action) {
    switch (action.type) {
        case 'setReport':
            return {...state, ...action.payload}
        default:
            return state
    }
}
