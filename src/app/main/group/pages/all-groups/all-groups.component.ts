import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GroupService } from '../../service/group.service';

@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.css']
})
export class AllGroupsComponent {
  title: string = "Grupos"
  subject:string = ""
  loading: boolean = false
  groups: any[] = []
  id: string = ""

  constructor(
    private groupService: GroupService,
    private aRoute: ActivatedRoute
  ) {
    this.id = this.aRoute.snapshot.paramMap.get('id') || ""
    console.log(this.id);
    this.uploadGroupsOfSubject()
  }

  uploadGroupsOfSubject() {
    this.groupService.uploadGroupOfSubject(this.id).subscribe(resp => {
      this.subject = resp.data.name
      this.groups = resp.data.group
      console.log(this.groups);
    })
  }
}
