import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { DOMAIN } from '../../app.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LandingService {
  public SEND_CONTACT_INFO = `${DOMAIN}/sendContactInfo.php`;

  constructor(private httpClient: HttpClient) {}

  public sendContactInfo(
    name: string,
    email: string,
    phone: string,
    businessType: string,
    message: string
  ): Observable<any> {
    return this.httpClient
      .post(this.SEND_CONTACT_INFO, {
        contactName: name,
        contactEmail: email,
        contactPhone: phone,
        contactBusinessType: businessType,
        contactMessage: message,
      })
      .pipe(
        map((response) => {
          return response;
        })
      );
  }
}
