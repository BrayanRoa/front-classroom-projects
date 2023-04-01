import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AllTaskInterface } from '../../groups/interfaces/all-task.interface';
import { ResponseHttp } from 'src/app/shared/interfaces/response.interface';
import { NewTaskInterface } from '../interfaces/new-task.interface';
import { ViewTaskInterface } from '../interfaces/view-task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  URL: string = environment.API_URL

  constructor(
    private http: HttpClient
  ) { }

  //TODO: MOSTRAR SOLO LAS TAREAS QUE HAY POR HACER
  findAllTaskOfGroup(id: string): Observable<AllTaskInterface> {
    return this.http.get<AllTaskInterface>(`${this.URL}/task/${id}`)
  }

  newTask(body: NewTaskInterface): Observable<ResponseHttp> {
    return this.http.post<ResponseHttp>(`${this.URL}/task/create`, body)
  }

  countActiveTask(id: string): Observable<ResponseHttp> {
    return this.http.get<ResponseHttp>(`${this.URL}/task/active/${id}`)
  }

  viewTask(id: string):Observable<ViewTaskInterface> {
    return this.http.get<ViewTaskInterface>(`${this.URL}/task/${id}`)
  }
}
