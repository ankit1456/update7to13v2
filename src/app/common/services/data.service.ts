import { AppError } from "./../app.error";
import { NotFoundError } from "./../not-found.error";
import { BadInput } from "./../bad-input";
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DataService {
  constructor(@Inject('url') private url: string, private http: HttpClient) {}
  getAll() {
    return this.http
      .get(this.url)
      .pipe(map((response) => response))
      .pipe(catchError(this.handleError));
  }
  create(resource: any) {
    return this.http
      .post(this.url, resource)
      .pipe(catchError(this.handleError));
  }
  update(id:any,resource: any) {
    return this.http
      .patch(this.url + "/" + id, resource)
      .pipe(catchError(this.handleError));
  }
  delete(id: any) {
    return this.http
      .delete(`${this.url}/${id}`)
      .pipe(catchError(this.handleError));
  }

  login(user:any) {
    return this.http.post(`${this.url}/signin`,user).pipe(catchError(this.handleError))
  }

  private handleError(error: Response) {
    if (error.status == 400) return throwError(() => new BadInput());

    if (error.status == 404) return throwError(() => new NotFoundError());
    return throwError(() => new AppError(error));
  }

  register(user:any) {
    return this.http.post(`${this.url}/signup`,user).pipe(catchError(this.handleError))
  }

}
