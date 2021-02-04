export class ObjectHelper {
    static extractPropertyInDeep<T>(obj: any, propName: string) {
        let props: Array<any> = [];
        let propStack = [obj];
        do {
            let currObj: any = propStack.pop();

            for (const key in currObj) {
                if (Object.prototype.hasOwnProperty.call(currObj, key)) {
                    const element = currObj[key];
                    if (!element) continue;
                    if (Object.prototype.hasOwnProperty.call(element, propName)) {
                        props.push.apply(props, [element[propName]]);
                        continue;
                    }
                    if (typeof element === 'object') {
                        propStack.push(element);
                    }
                }
            }
        } while (propStack.length > 0);
        return props;
    }
}
