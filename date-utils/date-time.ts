export class DateTime {
    static format(date: Date, pattern: string): string {
        const o = {
            'M+': date.getMonth() + 1,                      // 月份
            'd+': date.getDate(),                           // 日
            'h+': date.getHours(),                          // 小时
            'm+': date.getMinutes(),                        // 分
            's+': date.getSeconds(),                        // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3),    // 季度
            'S': date.getMilliseconds(),                     // 毫秒
        } as const;
        if (/(y+)/.test(pattern)) {
            pattern = pattern.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }

        for (const k in o) {
            const ok = k as keyof typeof o;
            if (new RegExp('(' + k + ')').test(pattern)) {
                pattern = pattern.replace(RegExp.$1, ((RegExp.$1.length == 1) ? o[ok] : (('00' + o[ok]).substr(('' + o[ok]).length))) as string);
            }
        }

        return pattern;
    }

    static addDay(date: Date, day: number): Date {
        return new Date(date.setDate(date.getDate() + 1));
    }

    static addMonth(date: Date): Date {
        return new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
        );
    }
}
