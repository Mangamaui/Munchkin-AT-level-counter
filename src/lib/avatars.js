const avatar = {
  id: 0,
  name: "",
  img: ""
}

const avatarList = [
  {
    "id": 1,
    "name": "Finn",
    "image": "assets/images/avatars/finn.png"
  },
  {
    "id": 2,
    "name": "Jake",
    "image": "assets/images/avatars/jake.png"
  },
  {
    "id": 3,
    "name": "BMO",
    "image": "assets/images/avatars/bmo.png"
  },
  {
    "id": 4,
    "name": "Lady Rainicorn",
    "image": "assets/images/avatars/lady_rainicorn.png"
  },
  {
    "id": 5,
    "name": "Princess Bubblegum",
    "image": "assets/images/avatars/princess_bubblegum.png"
  },
  {
    "id": 6,
    "name": "Flame princess",
    "image": "assets/images/avatars/flame_princess.png"
  },
  {
    "id": 7,
    "name": "Lumpy Space Princess",
    "image": "assets/images/avatars/lumpy_space_princess.png"
  },
  {
    "id": 8,
    "name": "Marceline",
    "image": "assets/images/avatars/marceline.png"
  }
];

let availableAvatarList = avatarList.slice();

module.exports = {
  avatarList: avatarList,
  availableAvatarList: availableAvatarList,
  selectedAvatarID: avatarList[0].id,
  updateAvailableAvatars: function(id) {
    const INDEX = availableAvatarList.findIndex(avatar => avatar.id === id);
    availableAvatarList.splice(INDEX, 1);
    module.exports.selectedAvatarID = (function(){
      if(availableAvatarList[INDEX]) {
        return availableAvatarList[INDEX].id;
      } else {
        return availableAvatarList[0].id;
      }
    })();
  },
  getAvatar: function(currentPlayer) {
    const ID = currentPlayer;
    const image = avatarList.reduce(
      (acc, avatar) => avatar.id == ID ? avatar.image : acc,
      avatarList[0].image
    );

    return image;
  },
  resetStates: function() {
    avatarList.forEach(a => {
      if (availableAvatarList.indexOf(a) == -1) {
        availableAvatarList.push(a);
      }
    });

    availableAvatarList.sort((a, b) => {
      if (a.id < b.id) return -1;
      else if (a.id > b.id) return 1;
      return 0;
    });

    module.exports.selectedAvatarID = avatarList[0].id;
  }
}
