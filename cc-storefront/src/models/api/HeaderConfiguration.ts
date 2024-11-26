export class HeaderConfiguration {
    contentType: string;
    auth: string;
    constructor(contentType: string = 'application/json', auth: string = '') {
       this.contentType = contentType;
       this.auth = auth;
    }
    public toHeaders() {
        return {
            'Content-Type': this.contentType,
            'Authroization': this.auth
        }
    }
}