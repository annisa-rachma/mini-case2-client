const initialState = {positions : [], positionById : null}

export default function positionReducer(state = initialState, action) {
    switch (action.type) {
        case 'setPositions':
            return {...state, positions:action.payload}
        default:
            return state
    }
}
