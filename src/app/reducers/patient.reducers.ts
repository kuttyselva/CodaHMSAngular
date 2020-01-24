import { PatientActionTypes, ActionEx } from '../actions/patient.actions';

export const initialState = {};
export function PatientReducer(state = initialState, action: ActionEx) {
  switch (action.type) {
    case PatientActionTypes.Add:
      return  action.payload;
    case PatientActionTypes.Remove:
      return state;
    default:
      return state;
  }
}