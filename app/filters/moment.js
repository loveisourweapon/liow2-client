import moment from 'moment';
import angular from 'angular';

export default angular.module('app.filters.moment', [])
  .filter('moment', () => {
    return (dateString, format = 'DD/MM/YYYY') => {
      if (!dateString) { return; }

      return moment(dateString).format(format);
    };
  })
  .filter('fromNow', () => {
    return (dateString) => {
      if (!dateString) { return; }

      return moment(dateString).fromNow();
    };
  })
  .name;
