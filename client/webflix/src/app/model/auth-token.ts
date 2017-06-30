export class AuthToken {

  constructor(public username: string,
              public jwtToken: string,
              public roles: string[]) {
  }
}
