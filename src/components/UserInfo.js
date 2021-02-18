export class UserInfo {
    constructor ({nameSelector, descriptionSelector, avatarSelector}) {
        this._name = document.querySelector(nameSelector);
        this._description = document.querySelector(descriptionSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo () { //функция: вернуть массив с данными пользователя со страницы
        const profileData = {
            name: this._name.textContent,
            description: this._description.textContent,
            avatar: this._avatar.src,
            id: this._id
        };
        return profileData
    }

    setUserId (id) {
        this._id = id
    }

    setUserAvatar (inputAvatar) { //функция: задать аватар пользователя на странице
        this._avatar.src = inputAvatar;
    }

    setUserInfo (inputName, inputdescription) { //функция: задать значения данным пользователя на странице
        this._name.textContent = inputName;
        this._description.textContent = inputdescription;
    }
}
