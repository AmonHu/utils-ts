const wcf = require('wcf.js');
import {Observable} from 'rxjs';


export class WcfService {
    request$(serviceUrl: string, action: string, params: object, options?: any) {
        let binding = new wcf.BasicHttpBinding();
        let proxy = new wcf.Proxy(binding, serviceUrl);

        let message =
            `<Envelope xmlns='http://schemas.xmlsoap.org/soap/envelope/'>
                <Header />
                <Body>
                    <${this._extractAction(action)} xmlns='http://tempuri.org/'>
                        ${this._parseParams(params)}
                    </${this._extractAction(action)}>
                </Body>
            </Envelope>`;

        return new Observable(observer => {
            proxy.send(message, `http://tempuri.org/${action}`, (r: any, t: any) => {
                observer.next(r);
                observer.complete();
            });
        });
    }

    private _parseParams(params: object): string {
        let result = '';
        for (const key in params) {
            const pkey = key as keyof typeof params;
            result += `<${pkey}>${params[pkey]}</${pkey}>`;
        }
        return result;
    }

    private _extractAction(action: string): string {
        let index = action.lastIndexOf('/');
        return action.slice(index + 1);
    }
}
