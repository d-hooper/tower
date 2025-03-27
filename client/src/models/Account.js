

export class Profile {
  /**
   * @typedef ProfileData
   * @property {string} id
   * @property {string} name
   * @property {string} picture
   * 
   * @param {ProfileData} data
   */
  constructor(data) {

    this.id = data.id
    this.picture = data.picture
    this.name = data.name
  }
}
export class Account extends Profile {

  constructor(data) {
    super(data)
    this.email = data.email
    // TODO add additional properties if needed
  }
}
