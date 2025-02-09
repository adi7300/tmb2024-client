import { makeAutoObservable, runInAction } from "mobx";
import { arrayMove } from "@dnd-kit/sortable";
import dayjs from 'dayjs';

// Types
export type TPax = {
    id: string;
    contactPerson: boolean;
    name: string;
    phone: string;
    email: string;
    diet: string;
    birthDate?: dayjs.Dayjs | null;
    remarks: string;
};

export type TPersonalPreferences = {
    flightBooked: boolean;
    startingDate: string | dayjs.Dayjs;
    endingDate: string | dayjs.Dayjs;
    roomType: string;
    bedType: string;
    noOfBags: number;
    level: string;
    comments: string;
};

export type TPreferredAccommodation = {
    nightNo: number;
    location: string;
    firstOption: string;
    secondOption: string;
    thirdOption: string;
    remarks: string;
};

class Store {
    // Store State
    tourLeader: Partial<TPax> = {};
    paxList: TPax[] = [];
    newPax: TPax = this.getInitialPaxState();
    groupPreferences: TPersonalPreferences = this.getInitialPreferencesState();
    newAccPreference: TPreferredAccommodation = this.getInitialAccommodationState();
    preferredAccommodationList: TPreferredAccommodation[] = [];
    generalComments: string = '';
    editingAccommodation: TPreferredAccommodation | null = null;

    constructor() {
        makeAutoObservable(this);
        this.loadPersistedData();
    }

    // Initial States
    private getInitialPaxState(): TPax {
        return {
            id: '',
            contactPerson: false,
            name: '',
            phone: '',
            email: '',
            diet: 'none',
            birthDate: null,
            remarks: '',
        };
    }

    private getInitialPreferencesState(): TPersonalPreferences {
        return {
            flightBooked: false,
            startingDate: '',
            endingDate: '',
            roomType: 'dormitory',
            bedType: '',
            noOfBags: 0,
            level: '1',
            comments: '',
        };
    }

    private getInitialAccommodationState(): TPreferredAccommodation {
        return {
            nightNo: 0,
            location: '',
            firstOption: '',
            secondOption: '',
            thirdOption: '',
            remarks: '',
        };
    }

    // Persistence Methods
    persistData = () => {
        const dataToStore = {
            tourLeader: this.tourLeader,
            paxList: this.paxList,
            groupPreferences: this.groupPreferences,
            preferredAccommodationList: this.preferredAccommodationList,
            generalComments: this.generalComments
        };
        try {
            localStorage.setItem('formData', JSON.stringify(dataToStore));
        } catch (error) {
            console.error('Error persisting data:', error);
        }
    };

    loadPersistedData = () => {
        try {
            const storedData = localStorage.getItem('formData');
            if (storedData) {
                const parsedData = JSON.parse(storedData);
                runInAction(() => {
                    this.tourLeader = parsedData.tourLeader || {};
                    this.paxList = parsedData.paxList || [];
                    this.groupPreferences = parsedData.groupPreferences || this.getInitialPreferencesState();
                    this.preferredAccommodationList = parsedData.preferredAccommodationList || [];
                    this.generalComments = parsedData.generalComments || '';
                });
            }
        } catch (error) {
            console.error('Error loading persisted data:', error);
        }
    };

    // Tour Leader Methods
    saveFormRegisterDetails = (tourLeader: Partial<TPax>) => {
        runInAction(() => {
            this.tourLeader = tourLeader;
            this.persistData();
        });
    };

    // Passenger Methods
    addPax = (newPax: TPax) => {
        runInAction(() => {
            this.paxList.push(newPax);
            this.newPax = this.getInitialPaxState();
            this.persistData();
        });
    };

    removePax = (paxId: string) => {
        runInAction(() => {
            this.paxList = this.paxList.filter(pax => pax.id !== paxId);
            this.persistData();
        });
    };

    // Personal Preferences Methods
    setPersonalPreferencesDetails = (preferences: TPersonalPreferences) => {
        runInAction(() => {
            this.groupPreferences = preferences;
            this.persistData();
        });
    };

    // Accommodation Methods
    reorderAccommodationPreferences = (oldIndex: number, newIndex: number) => {
        runInAction(() => {
            const newList = arrayMove(this.preferredAccommodationList, oldIndex, newIndex);
            this.preferredAccommodationList = newList.map((item, index) => ({
                ...item,
                nightNo: index + 1
            }));
            this.persistData();
        });
    };

    addAccommodationPreference = (newAccPreference: TPreferredAccommodation) => {
        runInAction(() => {
            this.preferredAccommodationList.push({
                ...newAccPreference,
                nightNo: this.preferredAccommodationList.length + 1
            });
            this.newAccPreference = this.getInitialAccommodationState();
            this.persistData();
        });
    };

    editAccommodationPreference = (acc: TPreferredAccommodation) => {
        runInAction(() => {
            this.editingAccommodation = { ...acc };
        });
    };

    updateAccommodationPreference = (updatedAcc: TPreferredAccommodation) => {
        const index = this.preferredAccommodationList.findIndex(
            item => item.nightNo === updatedAcc.nightNo
        );
        if (index !== -1) {
            runInAction(() => {
                this.preferredAccommodationList[index] = updatedAcc;
                this.editingAccommodation = null;
                this.persistData();
            });
        }
    };

    cancelEditingAccommodation = () => {
        runInAction(() => {
            this.editingAccommodation = null;
        });
    };

    removeAccommodationPreference = (nightNo: number) => {
        runInAction(() => {
            this.preferredAccommodationList = this.preferredAccommodationList
                .filter(acc => acc.nightNo !== nightNo)
                .map((acc, index) => ({
                    ...acc,
                    nightNo: index + 1
                }));
            this.persistData();
        });
    };

    // General Comments Methods
    setGeneralComment = (comments: string) => {
        runInAction(() => {
            this.generalComments = comments;
            this.persistData();
        });
    };

    // Reset Methods
    resetStore = () => {
        runInAction(() => {
            this.tourLeader = {};
            this.paxList = [];
            this.newPax = this.getInitialPaxState();
            this.groupPreferences = this.getInitialPreferencesState();
            this.newAccPreference = this.getInitialAccommodationState();
            this.preferredAccommodationList = [];
            this.generalComments = '';
            this.editingAccommodation = null;
            localStorage.removeItem('formData');
        });
    };
}

const store = new Store();
export default store;