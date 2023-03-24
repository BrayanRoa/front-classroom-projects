import { Component } from '@angular/core';
import { GroupService } from '../../service/group.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent {
  title:string=""
  loading:boolean = true
  id!:string


  constructor(
    private readonly groupService:GroupService,
    private aRoute: ActivatedRoute,
    private fb:FormBuilder
  ){
    this.loading = false
    this.id = this.aRoute.snapshot.paramMap.get("id")!
    this.uploadGroup()
  }

  formInfoGroup:FormGroup = this.fb.group({
    id: ["", [Validators.required]],
    name: ["", [Validators.required]],
    subject: ["", [Validators.required]],
    code:["", Validators.required]
  })

  uploadGroup(){
    this.groupService.uploadOneGroup(this.id).subscribe({
      next:value =>{
        this.formInfoGroup.setValue({
          id:value.data.id,
          name:value.data.name,
          subject:value.data.subject.name,
          code:value.data.subject.code
        })
      },
      error: e =>{

      }
    })
  }
}
