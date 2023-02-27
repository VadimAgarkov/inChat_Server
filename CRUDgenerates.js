const prisma = require('./index')





class CRUDgenerations {

async newUser (req, res) {
  try{
    if(req.body) {
      console.log('create new user')
      const user =  await prisma.users.create({
        data: {
          login: data.email,
          password: data.password,
          fullName: data.bithday,
          last_name: data.password
        },
      });


      console.log('finish')
    } else {
      console.log('no new users')
    }
  } catch (e) {
    console.log(e)
  };

};
  
  
async delUser (data) {
  const {email} = data
  const user =  await prisma.users.delete({
    where: {
      email: email
    },
  })
  const users = await prisma.users.findMany()
  console.log('fn del',data)
};

};




module.exports = CRUDgenerations;
