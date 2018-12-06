[{
  id: '',
  name: '',
  room: ''
}]

// addUser(id,name,room)

//removeUser(id)

//getUser(id)

//getUserlist(room)

class Users {
  constructor(){
    this.users = [];
  }

  addUser (id, name, room){
    var user = {id, name, room};
    this.users.push(user);
    return user;
  }

  removeUser (id) {
    // var removedUser = this.users.filter((user) => user.id === id);
    // var newUsers = this.users.filter((user) => user.id !== id);
    // this.users = newUsers;
    var getUser = this.getUser(id);
    if (getUser) {
      this.users = this.users.filter((user) => user.id !== id);
    }

    return getUser;
  }

  getUser (id){
    return this.users.filter((user) => user.id === id)[0];
    // var user = userArray[0];
    // return user;

  }
  getUserList(room){
    // var users = this.users.filter((user) => {
    //   return user.room === room;
    // })
    var users = this.users.filter((user) => user.room === room);
    // var namesArray = users.map((user) => {
    //   return user.name
    // });
    var namesArray = users.map((user) => user.name);
    return namesArray;
  }

}

module.exports = {Users};

// class Person {
//   constructor (name, age) {
//     console.log(name,age)
//     this.name = name;
//     this.age = age;
//   }
//   getUserDescription(){
//     return `${this.name} is ${this.age} year(s) old`;
//   }
//
// }
//
// var me = new Person('Dave',39);
// var description = me.getUserDescription();
//
// console.log(description);
