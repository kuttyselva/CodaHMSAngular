import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {
  patientEntryForm:FormGroup;
  invalid:boolean;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.patientEntryForm=this.formBuilder.group({
      name: ["", Validators.required],
      disease: ["", Validators.required]
    })
  }
  patientEntry(patientEntryForm:FormGroup){
    console.log(patientEntryForm);

  }

}
