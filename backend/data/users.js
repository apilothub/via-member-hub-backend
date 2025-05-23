import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'Nguyễn Thành Nam',
    email: 'nam@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Hồ Minh Đức',
    email: 'duc@gmail.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
