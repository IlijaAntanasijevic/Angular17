interface IUserBase {
  email: string,
  firstName: string,
  lastName: string,
  phone: string,
  oldPassword: string
  newPassword: string
}

export interface IUser extends IUserBase {
  id: number,
  avatar: string,

}

export interface IUserRequest extends IUserBase {
  avatar: string
}