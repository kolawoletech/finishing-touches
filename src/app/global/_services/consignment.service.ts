import { Injectable } from "@angular/core";
import { Logger } from './logger.service'
import * as moment from 'moment'
import { Consignment } from '../_models/consignment.model';
import { Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { ConfigService } from './config.service';

export interface NewConsignmentData {
	dateReceived?: String
	dateInvoiced?: String
}

@Injectable()

export class ConsignmentService {
    constructor(private logger:Logger, private http: Http, private configService: ConfigService) {
        this.getAllConsignment();
        this.initialize();
    }

    private initialize():void {
       
	}
    getAllConsignment():any {
        return this.http.get(this.configService.getAllPatient_url)
        .map((response: Response) => {
            console.log(response);
            return response.json();
        });
    }
}