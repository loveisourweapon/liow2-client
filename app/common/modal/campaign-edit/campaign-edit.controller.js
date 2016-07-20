import each from 'lodash/each';
import map from 'lodash/map';
import cloneDeep from 'lodash/cloneDeep';
import differenceBy from 'lodash/differenceBy';
import capitalize from 'lodash/capitalize';

class CampaignEditController {
  /* @ngInject */
  constructor($uibModalInstance, Alertify, Campaign, Deed, Modal, action, group, campaign) {
    Object.assign(this, { $uibModalInstance, Alertify, Campaign, Deed, Modal, action, group });

    this.error = null;
    this.deeds = [];

    this.loadDeeds();
    if (!campaign) {
      this.resetFields();
    } else {
      this.campaign = cloneDeep(campaign);
    }
  }

  /**
   * Reset all form fields to defaults
   */
  resetFields() {
    this.campaign = {
      group: this.group._id,
      deeds: []
    };
  }

  /**
   * Save the Campaign
   *
   * @param {object} campaign
   */
  save(campaign) {
    let toSave = cloneDeep(campaign);
    each(toSave.deeds, item => item.deed = item.deed._id);

    this.saving = true;
    this.error = null;
    this.Campaign.save(toSave)
      .then(() => {
        this.$uibModalInstance.close();
        this.Alertify.success(`${capitalize(this.action)}d campaign`);
      })
      .catch(response => this.error = response.data.error)
      .then(() => this.saving = false);
  }

  /**
   * Load all of the deeds
   * Note: in the future we might not want to preload ALL deeds
   */
  loadDeeds() {
    this.loading = true;
    this.Deed.find({ fields: '_id,title' })
      .then(deeds => this.deeds = differenceBy(
        map(deeds, deed => ({ deed })),
        this.campaign.deeds,
        'deed._id'
      ))
      .catch(response => this.error = response.data.error)
      .then(() => this.loading = false)
  }
}

export default CampaignEditController;
