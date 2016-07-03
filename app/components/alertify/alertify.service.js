import alertify from 'alertify.js';

class AlertifyService {
  constructor() {
    alertify
      .theme('bootstrap')
      .logPosition('top right');
  }

  /**
   * Show a normal log message
   *
   * @param {string} message
   * @param {string} icon
   *
   * @returns {object}
   */
  log(message, icon = 'info-circle') {
    return alertify
      .setLogTemplate(input => `<i class="fa fa-fw fa-${icon}"></i> ${input}`)
      .log(message);
  }

  /**
   * Show a green success message
   *
   * @param {string} message
   * @param {string} icon
   *
   * @returns {object}
   */
  success(message, icon = 'check-circle') {
    return alertify
      .setLogTemplate(input => `<i class="fa fa-fw fa-${icon}"></i> ${input}`)
      .success(message);
  }

  /**
   * Show a red error message
   *
   * @param {string} message
   * @param {string} icon
   *
   * @returns {object}
   */
  error(message, icon = 'exclamation-circle') {
    return alertify
      .setLogTemplate(input => `<i class="fa fa-fw fa-${icon}"></i> ${input}`)
      .error(message);
  }
}

export default AlertifyService;
