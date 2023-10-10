import { makeAutoObservable } from "mobx";
import { PaxActions } from "./Actions/PaxActions";
import { TPax, TPersonalPreferences, TPreferredAccommodation } from "./types";
import { PreferredAccommodationActions } from "./Actions/PreferredAccommodationActions";


class Store {
    tourLeader: Partial<TPax> = {};
    paxList: TPax[] = [];
    newPax: TPax = {
        contactPerson: false,
        id: '',
        name: '',
        phone: '',
        email: '',
        diet: '',
        remarks: '',
    };
    groupPreferences: TPersonalPreferences = {
        flightBooked: false,
        startingDate: '',
        endingDate: '',
        roomType: '',
        bedType: '',
        noOfBags: 0,
        level: '1',
        comments: '',
    };
    newAccPreference: TPreferredAccommodation = {
        location: '',
        firstOption: '',
        secondOption: '',
        thirdOption: '',
        remarks: '',
    }
    preferredAccommodationList: TPreferredAccommodation[] = [];
    generalComments: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    saveFormRegisterDetails(tourLeader: Partial<TPax>) {
        this.tourLeader = tourLeader;
    }

    setPersonalPreferencesDetails(preferences: TPersonalPreferences) {
        this.groupPreferences = preferences;
    }

    addPax(newPax: TPax) {
        PaxActions.addPax(this.paxList, newPax);
        this.newPax = {
            contactPerson: false,
            name: '',
            phone: '',
            email: '',
            diet: '',
            remarks: '',
        }
    }

    removePax(paxToRemove: string) {
        PaxActions.removePax(this.paxList, paxToRemove);
    }

    addAccommodationPreference(newAccPreference: TPreferredAccommodation) {
        PreferredAccommodationActions.addAccPreference(this.preferredAccommodationList, newAccPreference);
        this.newAccPreference = {
            location: '',
            firstOption: '',
            secondOption: '',
            thirdOption: '',
            remarks: '',
        }
    }

    removeAccommodationPreference(accLocation: string) {
        PreferredAccommodationActions.removeAccPreference(this.preferredAccommodationList, accLocation);

        const newArray = this.preferredAccommodationList.map((element, index) => ({
            ...element,
            nightNo: index + 1
        }))
        this.preferredAccommodationList = [...newArray];
    };

    setGeneralComment(summaryComments: string) {
        this.generalComments = summaryComments;
    }
}

const store = new Store();
export default store;