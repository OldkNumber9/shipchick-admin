// types/route.ts
export interface Route {
    _id?: string;
    originCountry: string;
    originAirport: string;
    destinationCountry: string;
    destinationAirport: string;
    pricePerKg: number;
    gstPercent?: number;
    additionalFees?: number;
    lastUpdatedBy?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  