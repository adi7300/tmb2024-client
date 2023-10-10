import { TPreferredAccommodation } from "../types";

export namespace PreferredAccommodationActions {
    export function addAccPreference(preferredAccommodationList: TPreferredAccommodation[], accPreference: TPreferredAccommodation) {
        preferredAccommodationList.push(accPreference);
    };

    export function removeAccPreference(preferredAccommodationList: TPreferredAccommodation[], accPreferenceLocation: string) {
        const indexToRemove = preferredAccommodationList.findIndex((preference) => preference.location === accPreferenceLocation);

        if (indexToRemove !== -1) {
            preferredAccommodationList.splice(indexToRemove, 1);
        }
    };

}