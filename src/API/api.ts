import axios from "axios";
import store from "../store";

export namespace FormApi {
    export const submitForm = () => {
        axios({
            method: 'POST',
            url: 'https://server-two-teal.vercel.app/api/submitForm', // for production only
            // url: 'http://localhost:8080/api/submitForm', // for debugging only
            data: {
                tourLeader: store.tourLeader,
                paxList: store.paxList,
                bookingPreference: store.groupPreferences,
                accList: store.preferredAccommodationList,
                otherComments: store.generalComments,
            },
        })
            .then((response) => {
                console.log('Request sent successfully');
            })
            .catch((error) => {
                console.error('error is:', error);
            });
    }
}