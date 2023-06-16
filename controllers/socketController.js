const MessageController = require('./message-controller.js');
const userService = require('../service/userService.js')



const socketConnections = (io) => {
  const connections = [];

  io.sockets.on('connection', function (socket) {
    console.log('connection::', socket.id)
    connections.push(socket);

    socket.on('disconnect', function (data) {
      console.log('disconnection', socket.id)
      connections.splice(connections.indexOf(socket), 1)
    });


    socket.on('send message', async (data) => {
      const arr = await MessageController.getMessages(data.chat_id)
      const lastMessage = arr[arr.length - 1]
      const message = await MessageController.writeMessage(data)
      io.sockets.emit('newMessage', { msg: message, lastMessage: lastMessage }, console.log('newMessage was sent'));
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////

    socket.on('load_messages_for_pages', async (chatId, count, idUser, idSocket) => {
  
      if (socket.id === idSocket) {
        const messages = await MessageController.getMessages(chatId)
        const startIndex = messages.findIndex((item) => item.is_read === false && item.sender !== idUser)
        /////////////
        let TopHasMore = true || false
        let BottomHasMore = true || false

        const loadMessages = messages.slice(-20)
        ////////////
        if (messages[messages.length - 1] === loadMessages[loadMessages.length - 1]) {
          BottomHasMore = false;
        } else {
          BottomHasMore = true;
        }

        if (messages.length > loadMessages.length) {
          TopHasMore = true
        } else {
          TopHasMore = false
        }

        io.to(idSocket).emit('add messages', { msg: loadMessages, TopHasMore: TopHasMore, BottomHasMore: BottomHasMore });
        // if (startIndex !== -1) {
        //   const isNotRead = messages.length - startIndex;
        //   // console.log('isNotRead', isNotRead)
        //   if (isNotRead < count) {
        //     const backStep = count - isNotRead;
        //     const sliceIndex = startIndex - backStep;
        //     const loadMessages = messages.slice(sliceIndex, count)
        //     console.log('befor emit', loadMessages)
        //     io.sockets.to(idSocket).emit('add messages', { msg: loadMessages });
        //     console.log('load_messages_for_pages => isNotRead < count =>', loadMessages)
        //   } else {
        //     const loadMessages = messages.slice(startIndex, count);
        //     console.log('else isNotRead < count => ', loadMessages)
        //     io.emit('add messages', { msg: loadMessages });
        //     console.log('after');
        //   };
        // } else {
        //   const startIndex = messages.length - count;
        //   const loadMessages = messages.slice(startIndex, count)
        //   // console.log('loadMessages-3', loadMessages)
        //   io.sockets.to(idSocket).emit('add messages', { msg: loadMessages });
        // };
      }
    });

    socket.on('loadMoreNextMessages', async (chatId, lastMessage, count, idSocket) => {

      if (chatId, lastMessage) {
        const messages = await MessageController.getMessages(chatId);
        const startIndex = messages.findIndex(obj => obj.id === lastMessage) + 1;
        if (startIndex + count >= messages.length) {
          const BottomHasMore = false;
          const newMessages = messages.slice(startIndex, messages.length);
          io.to(idSocket).emit('loadMoreNextMessages', newMessages, BottomHasMore);
        } else {
          const TopHasMore = true;
          const newMessages = messages.slice(startIndex, startIndex + count);
          io.to(idSocket).emit('loadMoreNextMessages', newMessages, TopHasMore);
        };
      };
    });

    socket.on('loadMorePreviousMessages', async (chatId, firstMessage, count, idSocket) => {
      if (socket.id === idSocket) {
        if (chatId, firstMessage) {
          const messages = await MessageController.getMessages(chatId);
          const Index = messages.findIndex(obj => obj.id === firstMessage);
          if (Index <= count) {
            if (Index == 0) {
              const TopHasMore = false;
              const newMessages = null;
              io.to(idSocket).emit('loadMorePreviousMessages', newMessages, TopHasMore)
            } else {
              const newCount = Index - 1;
              const startIndex = 0;
              const newMessages = messages.slice(0, startIndex + newCount)
              const TopHasMore = false;
              io.to(idSocket).emit('loadMorePreviousMessages', newMessages, TopHasMore)
            };
          } else {
            const TopHasMore = true;
            const startIndex = Index - (count + 1);
            const newMessages = messages.slice(startIndex, startIndex + count);
            io.to(idSocket).emit('loadMorePreviousMessages', newMessages, TopHasMore);
          };
        };
      };
    });

    socket.on('online', async (id) => {
      if (id) {
        const user = { user_id: id }
        const newData = await userService.updateUser(user, { online: true })
      }
    });

    socket.on('offline', async (id) => {
      if (id) {
        const user = { user_id: id }
        const newData = await userService.updateUser(user, { online: false })
      }
    });
  });
};

module.exports = socketConnections;