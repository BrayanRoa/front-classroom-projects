import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseHttp } from 'src/app/shared/interfaces/response.interface';
import { NewTaskInterface } from '../interfaces/new-task.interface';
import { ViewOneTaskOfProjectInterface } from '../interfaces/view-task.interface';
import { AllTasksOfProjectInterface } from '../interfaces/all_task_projects.interface';
import { TaskOfGroupInterface } from '../interfaces/task_of_group.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  URL: string = environment.API_URL

  constructor(
    private http: HttpClient
  ) { }

  findAllTaskOfGroup(group_id:string):Observable<TaskOfGroupInterface>{
    return this.http.get<TaskOfGroupInterface>(`${this.URL}/tasks/${group_id}`)
  }

  findAllTaskOfProject(group_id: string, id_project: string): Observable<AllTasksOfProjectInterface> {
    return this.http.get<AllTasksOfProjectInterface>(`${this.URL}/task/${group_id}/${id_project}`)
  }

  newTask(body: NewTaskInterface): Observable<ResponseHttp> {
    return this.http.post<ResponseHttp>(`${this.URL}/task/create`, body)
  }

  countActiveTask(id: string): Observable<ResponseHttp> {
    return this.http.get<ResponseHttp>(`${this.URL}/task/active/${id}`)
  }

  viewTask(project_id: string, task_id: string): Observable<ViewOneTaskOfProjectInterface> {
    return this.http.get<ViewOneTaskOfProjectInterface>(`${this.URL}/task_project/${project_id}/${task_id}`)
  }

  addDelivery(id: string, file: any): Observable<ResponseHttp> {
    return this.http.patch<ResponseHttp>(`${this.URL}/task_project/add_delivery/${id}`, file)
  }
}
