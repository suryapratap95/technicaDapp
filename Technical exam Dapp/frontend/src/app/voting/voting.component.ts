import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {
  VotingForm:FormGroup;
  VotingFormControl:any;
  title = 'voting';
  voterName:any;
  showTable:boolean=false;
  voterList =[];
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.VotingForm = this.fb.group({
      voter: ['', [Validators.required]],
     
    });
    this.VotingFormControl = this.VotingForm.controls;
  }

  GetData(ID){
    debugger
      let Value = this.VotingForm.value;
    
      if(ID!=null){  
       this.showTable = true;
      } 
    }

    countBiden(i){
      debugger
      this.voterList.push({
        name: this.VotingForm.value,
        cname:"Biden"
      })
      console.log(this.voterList)
 
    }
    countTrumph(i){
debugger
// this.VotingForm.value;
this.voterList.push({
  name: this.VotingForm.value,
  cname:"Trumph"
})
console.log(this.voterList)
    }
    onSubmit(){

    }

}
