export class HtmlEscape {
    static toEscape(text) {
        return text.replace(/[<>&"]/g, k => {
            return {
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;',
                '"': '&quot;'
            }[k];
        });
    }
}