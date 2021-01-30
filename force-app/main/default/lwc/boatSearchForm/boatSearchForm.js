import { LightningElement, track, wire, api } from "lwc";
import getBoatTypes from "@salesforce/apex/BoatDataService.getBoatTypes";
export default class BoatSearchForm extends LightningElement {
  @track selectedBoatTypeId = "";

  // Private
  error = undefined;

  searchOptions;

  // Wire a custom Apex method
  @wire(getBoatTypes)
  boatTypes({ error, data }) {
    if (data) {
      this.searchOptions = data.map((type) => {
        // TODO: complete the logic
        return {
          label: type.Name,
          value: type.Id
        };
      });
      this.searchOptions.unshift({ label: "All Types", value: "" });
    } else if (error) {
      this.searchOptions = undefined;
      this.error = error;
    }
  }

  // Fires event that the search option has changed.
  // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
  handleSearchOptionChange(event) {
    // logging
    console.log("*****prev option selected:" + this.selectedBoatTypeId);
    // update selectedBoatTypeId. store the value which triggred the onchange event
    this.selectedBoatTypeId = event.detail.value;
    // Create the const searchEvent , name of event fired is 'search'
    // parent (boatSearch) would be listening to onsearch event
    // passed detail as the boatTypeId whichever was selected
    const searchEvent = new CustomEvent("search", {
      detail: {
        boatTypeId: this.selectedBoatTypeId
      }
    });
    // logging
    console.log("*****option selected:" + this.selectedBoatTypeId);
    // searchEvent must be the new custom event search
    this.dispatchEvent(searchEvent);
  }
}
