export class StringChinese {
    /**
     * 计算字符串长度
     * 一个中文字符长度为2
     * @param s
     * @returns 字符串长度
     */
    static getLength(s: string): number {
        let chineseArr = s.match(/[\u4e00-\u9fa5]+/g);
        if (!chineseArr || !chineseArr.length) {
            return s.length;
        }

        let chineseLength = 0;
        chineseArr.forEach(s => {
            chineseLength += s.length;
        });

        return s.length + chineseLength;
    }

    /**
     * 字符串截取
     * 一个中文字符长度为2
     * @param s 字符串
     * @param start 开始位置
     * @param end 结束位置
     * @returns 截取所得字符串
     */
    static slice(s: string, start: number, end?: number): string {
        let i = 0;
        // start实际位置
        for (i = 0; start > 0; i++) {
            if (s[i].match(/[\u4e00-\u9fa5]+/)) {
                start -= 2;
            } else {
                start -= 1;
            }

            if (start <= 0) {
                break;
            }
        }
        start = i;
        i = 0;

        // end实际位置
        if (!!end) {
            let length = this.getLength(s);
            if (end >= length) {
                end = s.length;
            } else {
                for (; end > 0 && i < s.length; i++) {
                    if (s[i].match(/[\u4e00-\u9fa5]+/)) {
                        end -= 2;

                        if (end <= 1) {
                            end--;
                        }

                    } else {
                        end -= 1;
                    }

                }
                end = i;
            }
        }

        return s.slice(start, end);
    }

    /**
     * 根据子字符串长度拆分字符串
     * @param s 原字符串
     * @param itemLength 子字符串长度
     */
    static split(s: string, itemLength: number): Array<string> {
        let arr: Array<string> = [];
        let length = this.getLength(s);
        let i = 0;
        while (i < length) {
            arr.push(this.slice(s, i, itemLength + i));
            i += itemLength + 1;
        }
        return arr;
    }
}
