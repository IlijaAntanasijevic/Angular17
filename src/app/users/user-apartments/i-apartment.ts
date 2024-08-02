export interface IAddApartment {
  name: string,
  description: string,
  address: string,
  cityCountryId: number,
  maxGuests: number,
  price: number,
  mainImage: string,
  apartmentTypeId: number,
  featureIds: number[],
  paymentMethodIds: number[],
  images: string[]
}