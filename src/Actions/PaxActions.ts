import { TPax } from "../types";

export namespace PaxActions {
    export function addPax(paxList: TPax[], pax: TPax) {
        paxList.push(pax);
    };

    export function removePax(paxList: TPax[], paxId: string) {
        const indexToRemove = paxList.findIndex((pax) => pax.id === paxId);

        if (indexToRemove !== -1) {
            paxList.splice(indexToRemove, 1);
        }
    };

}