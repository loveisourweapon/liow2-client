import moment from 'moment';

const fromNowFilter = () => {
  return dateString => {
    if (!dateString) { return; }

    return moment(dateString).fromNow();
  };
};

export default fromNowFilter;
