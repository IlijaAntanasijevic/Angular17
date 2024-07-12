export interface ILogin {
  email: string,
  password: string
}

export interface IAuthToken {
  token: string
}

export interface IRegister extends ILogin{
  firstName: string,
  lastName: string,
  phone: string,
  avatar: string
}