import { DoctorActionTypes, ActionEx } from '../actions/doctor.actions';

export const initialState = {};
export function DoctorReducer(state = initialState, action: ActionEx) {
  switch (action.type) {
    case DoctorActionTypes.Add:
      return  action.payload;
    case DoctorActionTypes.Remove:
      return state;
    default:
      return state;
  }
}