export class UserInfo {
    constructor ({nameSelector, descriptionSelector}) {
        this._nameSelector = nameSelector;
        this._descriptionSelector = descriptionSelector;
        this._name = document.querySelector(this._nameSelector);
        this._description = document.querySelector(this._descriptionSelector);
    }

    getUserInfo () { //функция: вернуть массив с данными пользователя со страницы
        const profileData = {name: this._name.textContent, description: this._description.textContent};
        return profileData
    }

    setUserInfo (inputName, inputdescription) { //функция: задать значения данным пользователя на странице
        this._name.textContent = inputName;
        this._description.textContent = inputdescription;
    }
}
