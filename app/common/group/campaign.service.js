import has from 'lodash/has';
import first from 'lodash/first';

class CampaignService {
  /* @ngInject */
  constructor($http, $q, config) {
    Object.assign(this, { $http, $q });

    this.baseUrl = `${config.serverUrl}/campaigns`;
  }

  /**
   * Find campaigns by params
   *
   * @param {object} [params={}]
   *
   * @returns {Promise}
   */
  find(params = {}) {
    return this.$http.get(this.baseUrl, { params }).then(extractData);
  }

  /**
   * Find a single campaign by params
   *
   * @param {object} params
   *
   * @returns {Promise}
   */
  findOne(params) {
    return this.find(params)
      .then(campaigns => {
        if (campaigns.length === 1) {
          return first(campaigns);
        } else {
          throw 'Campaign not found';
        }
      });
  }

  /**
   * Save a new or existing campaign
   *
   * @param {object} campaign
   *
   * @returns {Promise}
   */
  save(campaign) {
    if (has(campaign, '_id')) {
      return this.$http.put(`${this.baseUrl}/${campaign._id}`, campaign).then(extractData);
    } else {
      return this.$http.post(this.baseUrl, campaign).then(extractData);
    }
  }

  /**
   * Update an existing campaign
   *
   * @param {object}   campaign
   * @param {object[]} changes
   *
   * @returns {Promise}
   */
  update(campaign, changes) {
    return this.$http.patch(`${this.baseUrl}/${campaign._id}`, changes).then(extractData);
  }
}

/**
 * Extra data from HTTP response
 *
 * @param {Response} response
 *
 * @returns {*}
 */
function extractData(response) {
  return response.data;
}

export default CampaignService;
