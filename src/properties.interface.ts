export interface Properties {
  propertyAddress: string;
  propertyAvailability: string;
  propertyCity: string;
  propertyCode: number;
  propertyCounty: string;
  propertyDescription: string;
  propertyImages: string[];
  propertyPrice: string;
  propertyType: string;
  geolocation: number[];
  propertyDetails: {
    doubleBedroom: number;
    singleBedroom: number;
    bathrooms: number;
    availableFrom: string;
    isFurnished: boolean;
    lease: string;
  };
  [key: string]: any;
}
