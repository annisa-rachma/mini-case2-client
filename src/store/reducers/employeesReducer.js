const initialState = {employees : [], employeeById : null}

export default function employeeReducer(state = initialState, action) {
    switch (action.type) {
        case 'setEmployee':
            return {...state, employees:action.payload}
        case 'setEmployeeDetail' :
            return {...state, employeeById:action.payload}
        default:
            return state
    }
}
