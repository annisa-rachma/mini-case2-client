const initialState = {}

export default function paymentReducer(state = initialState, action) {
    switch (action.type) {
        case 'setPayment':
            return {...state, ...action.payload}
        default:
            return state
    }
}
