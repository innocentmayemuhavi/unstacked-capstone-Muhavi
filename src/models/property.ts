export interface IProperty {
    id?: string;
    name: string;
    address: string;
    price: number;
    area: number;
    bedrooms: number;
    bathrooms: number;
    category: string;
    ammenities?: string[];
    nearby_places?: string[];
}
