import { UserActionTypes, ActionEx } from '../actions/user.action';

export const initialState = {};
export function UserReducer(state = initialState, action: ActionEx) {
  switch (action.type) {
    case UserActionTypes.Add:
      return  action.payload;
    case UserActionTypes.Remove:
      return state;
    default:
      return state;
  }
}