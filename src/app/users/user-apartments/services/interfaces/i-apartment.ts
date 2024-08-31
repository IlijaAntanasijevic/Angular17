export interface IAddApartmentForm {
  name: string,
  description: string,
  address: string,
  cityCountryId: number,
  cityId?: number,
  countryId?: number,
  maxGuests: number,
  pricePerNight: number,
  mainImage: string,
  apartmentTypeId: number,
  featuresIds: number[],
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