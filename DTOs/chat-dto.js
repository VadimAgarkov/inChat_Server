module.exports = class ChatDto {
  user_id;
  fullName;
  phone;
  chat_id;

  constructor(user, chat) {
    this.user_id = user.id
    this.fullName = user.fullName,
    this.phone = user.phone,
    this.chat_id = chat.id
  };
};
