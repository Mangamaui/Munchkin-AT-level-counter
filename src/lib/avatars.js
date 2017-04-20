const avatar = {
  id: 0,
  name: "",
  img: ""
}

const avatarList = [
  {
    "id": 1,
    "name": "Finn",
    "image": "assets/finn.png"
  },
  {
    "id": 2,
    "name": "Jake",
    "image": "assets/jake.png"
  },
  {
    "id": 3,
    "name": "BMO",
    "image": "assets/bmo.png"
  },
  {
    "id": 4,
    "name": "Lady Rainicorn",
    "image": "assets/lady_rainicorn.png"
  },
  {
    "id": 5,
    "name": "Princess Bubblegum",
    "image": "assets/princess_bubblegum.png"
  },
  {
    "id": 6,
    "name": "Flame princess",
    "image": "assets/flame_princess.png"
  },
  {
    "id": 7,
    "name": "Lumpy Space Princess",
    "image": "assets/lumpy_space_princess.png"
  },
  {
    "id": 8,
    "name": "Marceline",
    "image": "assets/marceline.png"
  }
];

const availableAvatarList = avatarList.slice();

module.exports = {
  AvatarList: availableAvatarList,
  UpdateAvailableAvatars: function(id) {
    let index = avatarList.findIndex(avatar => avatar.id === id);

    availableAvatarList.splice(index,1);
    console.log(availableAvatarList);
  }
}
