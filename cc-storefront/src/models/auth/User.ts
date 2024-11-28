import { Entity } from "../Entity";

export class User extends Entity {
  private static defaultUserRole: Array<string> = ["user"];

  public id: number = -1;
  public username: string;
  public password: string = "";
  public confirmPassword: string = "";
  public email: string;
  public firstName: string;
  public lastName: string;
  public gender: string;
  public image: string;
  public accessToken: string = "";
  public refreshToken: string = "";
  public roles: Array<string> = User.defaultUserRole;

  constructor({
    username,
    email,
    firstName,
    lastName,
    gender,
    image,
    id = -1,
    accessToken = "",
    refreshToken = "",
    roles = User.defaultUserRole,
    password = "",
    confirmPassword = "",
  }: {
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    image: string;
    id?: number;
    accessToken?: string;
    refreshToken?: string;
    roles?: Array<string>;
    password?: string;
    confirmPassword?: string;
  }) {
    super();
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.gender = gender;
    this.image = image;
    this.lastName = lastName;
    this.id = id;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.roles = roles;
    this.password = password;
    this.confirmPassword = confirmPassword;
  }
}
