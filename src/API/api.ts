import axios from "axios";
import store from "../store";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export namespace FormApi {
    export const submitForm = () => {
        if (!apiBaseUrl) {
            console.error("Missing REACT_APP_API_BASE_URL");
            return;
        }

        axios({
            method: 'POST',
            url: `${apiBaseUrl}/api/submitForm`,
            data: {
                tourLeader: store.tourLeader,
                paxList: store.paxList,
                bookingPreference: store.groupPreferences,
                accList: store.preferredAccommodationList,
                otherComments: store.generalComments,
                bookingEmail: store.bookingEmail,
                termsAccepted: store.termsAccepted,
            },
        })
            .then(() => {
                console.log('Request sent successfully');
            })
            .catch((error) => {
                console.error('error is:', error);
            });
    };
}