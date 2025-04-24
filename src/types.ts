export type TPax = {
    id?: string;
    contactPerson: boolean;
    name: string;
    phone: string;
    email: string;
    diet: string;
    remarks: string;
}

export type TPersonalPreferences = {
    flightBooked: boolean;
    startingDate: Date;
    endingDate: Date;
    roomType: string;
    bedType: string;
    level: string;
    noOfBags?: number;
    comments?: string;
}

export type TPreferredAccommodation = {
    nightNo?: number;
    location: string;
    firstOption: string;
    secondOption: string;
    thirdOption: string;
    remarks: string;
}
