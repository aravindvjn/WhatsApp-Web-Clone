export default class UserData {
  constructor({ email, username, profilePic, status, groups, _id, lastSeen }) {
    this.email = email;
    this.username = username;
    this.profilePic = profilePic;
    this.status = status;
    this.groups = groups;
    this._id = _id;
    this.lastSeen = lastSeen;
  }
}
