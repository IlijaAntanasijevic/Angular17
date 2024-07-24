import { IBaseName } from "../../interfaces/i-base"
import { IUser } from "../../users/profile/interfaces/i-user"
import { IReview } from "./i-reviews"


export interface IApartment extends IBaseName {
  mainImage: string
  price: number
  totalReviews: number
  rate: number
  maxGuest: number
  city: string
} 

export interface IApartmentDetail extends IApartment {
  location: string
  images: string[]
  user: IUser
  reviews: IReview[]
  description: string
  features: string[]
}
