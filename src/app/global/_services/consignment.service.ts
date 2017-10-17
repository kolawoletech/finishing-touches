import { Injectable } from "@angular/core";
import { Logger } from './logger.service'
import * as moment from 'moment'
import { Consignment } from '../_models/consignment.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

export interface NewConsignmentData {
	dateReceived?: String
	dateInvoiced?: String
}

@Injectable()

export class ConsignmentService {
    constructor(private logger:Logger) {
        this.initialize();
    }

    private initialize():void {
        console.log("Working 1");	
	}
    getAllConsignment():any {
      console.log("Working 2");
    }
}