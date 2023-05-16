module.exports = class UserDto {
  email;
  id;
  isActived;
  role;

  constructor(user) {
    this.email = user.email;
    this.id = user.id;
    this.role = 'USER';
    this.isActived = user.isActived;
  };
};



