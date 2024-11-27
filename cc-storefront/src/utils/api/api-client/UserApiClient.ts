import { HeaderConfiguration } from "../../../models/api/HeaderConfiguration";
import { User } from "../../../models/auth/User";
import { Environment } from "../../env/Environment";
import { ApiClient } from "./ApiClient";

export class UserApiClient extends ApiClient<User> {
  constructor() {
    const userServiceUrl = Environment.getEnvVariable("USER_SERVICE");
    super(userServiceUrl, new HeaderConfiguration());
  }
  public createUser(registerUser: User) {
    return this.post({ path: "/add", body: registerUser.toRecord() });
  }
}
