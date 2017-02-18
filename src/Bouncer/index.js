'use strict'

/**
 * node-fence
 * @license MIT
 * @copyright Slynova - Romain Lanz <romain.lanz@slynova.ch>
 */

const Helpers = require('../Helpers')
const Storage = require('../Storage').instance
const InvalidUser = require('../Exceptions').InvalidUser

 /**
  * @class Bouncer
  */
class Bouncer {

  /**
   * Constructor.
   *
   * @constructor
   * @param  {object} user
   * @return {void}
   */
  constructor (user) {
    user = user || Storage.retrieveUser()

    if (!user) {
      throw new InvalidUser('You need to specify a user for the Bouncer.')
    }

    this.$user = user
  }

  /**
   * Registers the gate name.
   *
   * @method goThroughGate
   * @param  {string} ability
   * @return {this}
   */
  goThroughGate (gate) {
    this.$gate = gate

    return this
  }

  /**
   * Registers the gate name.
   *
   * @method pass
   * @param  {string} ability
   * @return {this}
   */
  pass (gate) {
    this.goThroughGate(gate)
  }

  /**
   * Verifies the given gate for the given resource.
   *
   * @method for
   * @param  {object|string} resource
   * @return {boolean}
   */
  for (resource) {
    const gate = Storage.retrieveGate(this.$gate)

    return gate(this.$user, resource)
  }

  /**
   * Call the given policy method.
   *
   * @method callPolicy
   * @param  {string} ability
   * @param  {object} resource
   * @return {boolean}
   */
  callPolicy (ability, resource) {
    const resourceName = Helpers.formatResourceName(resource)
    const policy = Storage.retrievePolicy(resourceName)

    return policy[ability](this.$user, resource)
  }

}

module.exports = Bouncer
