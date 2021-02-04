const xml2js = require('xml2js');
import {from, Observable} from "rxjs";

export class XmlTransformer {
    static parseXml2Obj$(data: string): Observable<any> {
        return from(xml2js.parseStringPromise(data, {explicitArray: false}));
    }

    static toObject$(data: string): Observable<any> {
        return this.parseXml2Obj$(data);
    }
}
