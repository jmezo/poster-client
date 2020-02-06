export class User {
  constructor(
    public username: string,
    private access_token: string,
    private expirationDate: Date
    ) { }

    get token() {
      if (!this.expirationDate || new Date() > this.expirationDate) {
        return null;
      } else {
        return this.access_token;
      }
    }
    get _expirationDate() {
      return this.expirationDate;
    }
}