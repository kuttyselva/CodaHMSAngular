import { Action } from "@ngrx/store";
export enum UserActionTypes {
  Add = "[User Component] Add",
  Remove = "[User Component] Remove"
}
export class ActionEx implements Action {
  readonly type;
  payload: any;
}
export class UserAdd implements ActionEx {
  readonly type = UserActionTypes.Add;
  constructor(public payload: any) {}
}
export class UserRemove implements ActionEx {
  readonly type = UserActionTypes.Remove;
  constructor(public payload: any) {}
}
