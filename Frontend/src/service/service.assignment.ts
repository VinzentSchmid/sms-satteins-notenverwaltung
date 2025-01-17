import { Injectable } from '@angular/core';
import {
  Assignment,
  AssignmentType,
  Semester,
} from '../model/model.assignment';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { SaveAssignment } from 'src/model/model.saveassignment';
import { AuthHeaderService } from './service.authheader';

@Injectable({
  providedIn: 'root',
})
export class AssignmentService {
  private apiUrl = 'https://restapinotenverwaltung.azurewebsites.net/api/Assignments';

  constructor(
    private http: HttpClient,
    private authHeaderService: AuthHeaderService
  ) {} // Injizieren Sie den AuthHeaderService

  createAssignment(assignment: SaveAssignment): Observable<SaveAssignment> {
    return this.http.post<SaveAssignment>(this.apiUrl, assignment, {
      withCredentials: true,
      headers: this.authHeaderService.getAuthHeaders(),
    });
  }

  getAssignmentsBySubjectId(subjectId: number): Observable<Assignment[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/BySubject/${subjectId}`, {
        withCredentials: true,
        headers: this.authHeaderService.getAuthHeaders(),
      })
      .pipe(
        map((assignments) =>
          assignments.map(
            (a) =>
              new Assignment(
                new Date(a.creationDate),
                a.reachablePoints,
                a.subjectFk,
                this.mapAssignmentType(a.assignmentType),
                this.mapSemester(a.semester),
                a.assignmentPk
              )
          )
        )
      );
  }

  private mapAssignmentType(type: string): AssignmentType {
    switch (type) {
      case 'Test':
        return AssignmentType.Test;
      case 'Check':
        return AssignmentType.Check;
      case 'Homework':
        return AssignmentType.Homework;
      case 'Framework':
        return AssignmentType.Framework;
      default:
        return AssignmentType.Test; // Default or throw error
    }
  }

  private mapSemester(semester: string): Semester {
    return semester === 'FirstSemester'
      ? Semester['1.Semester']
      : Semester['2.Semester'];
  }
}
