import { UserModel } from "@/domain/models/user";
import { randomUUID } from "crypto";

export class User {
  private readonly id: string;
  private readonly name: UserModel["name"];
  private readonly email: UserModel["email"];
  private readonly picture: UserModel["picture"];

  constructor(data: UserModel) {
    const id = data.id ?? randomUUID();
    this.id = id;
    this.name = data.name;
    this.email = data.email;
    this.picture = data.picture;
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  toModel(): UserModel {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      picture: this.picture,
    };
  }
}
