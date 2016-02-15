import _ from 'lodash';

export default class CampaignEditCtrl {
  constructor($uibModalInstance, Alertify, Campaign, Deed, Modal, action, group, campaign) {
    Object.assign(this, { $uibModalInstance, Alertify, Campaign, Deed, Modal, action, group, campaign });

    this.error = null;
    this.deeds = [];

    this.loadDeeds();
    if (!this.campaign) {
      this.resetFields();
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
    let toSave = angular.copy(campaign);
    toSave.deeds = _.map(toSave.deeds, deed => ({ deed: deed._id }));

    this.saving = true;
    this.error = null;
    this.Campaign.save(toSave)
      .then(() => {
        this.$uibModalInstance.close();
        this.Alertify.success('Setup campaign');
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
      .then(response => this.deeds = response.data)
      .catch(response => this.error = response.data.error)
      .then(() => this.loading = false)
  }
}

CampaignEditCtrl.$inject = ['$uibModalInstance', 'Alertify', 'Campaign', 'Deed', 'Modal', 'action', 'group', 'campaign'];
