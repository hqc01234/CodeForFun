import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GET, Query } from '../http-client.decorators';
import { HttpAbstractService } from '../http-client.service';

@Injectable()
export class ProductApiService extends HttpAbstractService {

    @GET('api/SampleData/WeatherForecasts')
    public getSampleData(@Query('param') param: any): Observable<any> {
        return null;
    }
}
