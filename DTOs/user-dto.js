module.exports = class UserDto{
  email;
  id;
  isActived;

  constructor(user) {
    this.email = user.email;
    this.id = user.id;
    this.isActived = user.isActived
  };
};



