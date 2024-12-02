export class HeaderConfiguration {
  contentType: string;
  auth: string;
  constructor({
    contentType = "application/json",
    auth = "",
  }: { contentType?: string; auth?: string } = {}) {
    this.contentType = contentType;
    this.auth = auth;
  }
  public toHeaders() {
    return {
      "Content-Type": this.contentType,
      Authorization: this.auth,
    };
  }
}
