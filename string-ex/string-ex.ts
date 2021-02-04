export class StringEx {
    /**
     * 平均插入sep
     * @param s 字符串
     * @param itemLength 单独长度
     * @param sep 分隔符
     */
    static splitAverage(s: string, itemLength: number, sep: string = ' ') {
        let arr = [];
        for (let i = 0; i < s.length; i += itemLength) {
            arr.push(s.slice(i, i + itemLength));
        }

        return arr.join(sep);
    }
}
