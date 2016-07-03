import moment from 'moment';

const momentFilter = () => {
  return (dateString, format = 'DD/MM/YYYY') => {
    if (!dateString) { return; }

    return moment(dateString).format(format);
  };
};

export default momentFilter;
