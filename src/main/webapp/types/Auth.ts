export class Auth {
  id: string;

  validForNoSeconds: string;

  idInUserStorage: string;

  idFromLogin: string;

  lastName: string;

  firstName: string;

  logoutURL: string;

  constructor(
    id: string,
    validForNoSeconds: string,
    idInUserStorage: string,
    idFromLogin: string,
    firstName: string,
    lastName: string,
    logoutURL: string
  ) {
    this.id = id;
    this.validForNoSeconds = validForNoSeconds;
    this.idInUserStorage = idInUserStorage;
    this.idFromLogin = idFromLogin;
    this.firstName = firstName;
    this.lastName = lastName;
    this.logoutURL = logoutURL;
  }
}
