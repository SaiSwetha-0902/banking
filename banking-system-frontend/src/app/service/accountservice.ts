import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Account } from '../models/account';
import { AuditLog } from '../models/audit-log';
import { environment } from '../../environment/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class Accountservice {
   private baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/admin/users`);
  }

  createAccount(userId: number, type: 'SAVINGS' | 'CURRENT', initialDeposit: number): Observable<Account> {
    return this.http.post<Account>(
      `${this.baseUrl}/api/accounts/create/${userId}/${type}/${initialDeposit}`, 
      null
    );
  
}
freezeAccount(accountNumber: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/accounts/${accountNumber}/freeze`, {});
  }

  // --------------------------
  // Unfreeze an account
  // --------------------------
  unfreezeAccount(accountNumber: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/accounts/${accountNumber}/unfreeze`, {});
  }

  getAllLogs():Observable<any>{
    return this.http.get<AuditLog[]>(`${this.baseUrl}/admin/audit-logs`)
  }
}