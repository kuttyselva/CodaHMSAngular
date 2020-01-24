import { Action } from "@ngrx/store";
export enum PatientActionTypes {
  Add = "[Patient Component] Add",
  Remove = "[Patient Component] Remove"
}
export class ActionEx implements Action {
  readonly type;
  payload: any;
}
export class PatientAdd implements ActionEx {
  readonly type = PatientActionTypes.Add;
  constructor(public payload: any) {}
}
export class PatientRemove implements ActionEx {
  readonly type = PatientActionTypes.Remove;
  constructor(public payload: any) {}
}


