
export interface RentType {
    id: string;
    year: number;
    effectiveRent: number;
    startingRent: number;
}

export type CreateRentType = Omit<RentType, 'id'>
