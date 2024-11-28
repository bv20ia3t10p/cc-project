import { HeaderConfiguration } from "@/models/api/HeaderConfiguration";
import { Environment } from "@/utils/env/Environment";
import { ApiClient } from "./ApiClient";
import { User } from "@/models/auth/User";
import { Entity } from "@/models/Entity";

export class AuthApiClient extends ApiClient<User> {
  constructor() {
    const authServiceUrl = Environment.getEnvVariable("AUTH_SERVICE");
    super(authServiceUrl, new HeaderConfiguration());
  }
  loginUser(userData: User): Promise<User> {
    return this.post({ path: "/login", body: userData.toRecord() });
  }
}
