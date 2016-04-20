import _ from 'lodash';

export default class DeedListCtrl {
  constructor($location, Deed, Act) {
    Object.assign(this, { $location, Deed, Act });

    this.loading = true;
    this.Deed.find({ fields: '_id,logo,title,urlTitle' })
      .then(response => {
        this.deeds = response.data;

        _.each(this.deeds, deed => this.Act.count({ deed: deed._id }));
      })
      .catch(() => null)
      .then(() => this.loading = false);
  }
}

DeedListCtrl.$inject = ['$location', 'Deed', 'Act'];
