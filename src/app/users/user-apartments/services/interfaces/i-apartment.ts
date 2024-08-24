export interface IAddApartmentForm {
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

export interface IAddApartmentDdlData {
  features: any[],
  paymentMethods: any[],
  countries: any[],
  cities: any[],
  apartmentTypes: any[]
}

export interface IAddApartmentRequest  extends IAddApartmentForm{
  
}