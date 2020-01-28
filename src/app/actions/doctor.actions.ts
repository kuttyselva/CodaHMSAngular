import { Action } from "@ngrx/store";
export enum DoctorActionTypes {
  Add = "[Doctor Component] Add",
  Remove = "[Doctor Component] Remove"
}
export class ActionEx implements Action {
  readonly type;
  payload: any;
}
export class DoctorAdd implements ActionEx {
  readonly type = DoctorActionTypes.Add;
  constructor(public payload: any) {}
}
export class DoctorRemove implements ActionEx {
  readonly type = DoctorActionTypes.Remove;
  constructor(public payload: any) {}
}
