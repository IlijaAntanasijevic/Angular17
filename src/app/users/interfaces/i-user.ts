interface IUserBase {
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  password: string
}

export interface IUser extends IUserBase {
  id: number,
  avatar: string,

}

export interface IUserRequest extends IUserBase {

}