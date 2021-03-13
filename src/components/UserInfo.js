//информация о пользователе
export class UserInfo {
    constructor(userNameSelector, userInfoSelector, nameInput, infoInput) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
        this._newUserName = nameInput;
        this._newUserInfo = infoInput;
    }

    //возвращает объект с данными пользователя из ИНФО при открытии
    getUserInfo() {
        const userInfoData = {};
        userInfoData.userName = this._userName.textContent;
        userInfoData.userInfo = this._userInfo.textContent;
        return userInfoData;
    }

    //заполняет раздел ИНФО новыми данными от пользователя при сабмите
    setUserInfo() {
        this._userName.textContent = this._newUserName.value;
        this._userInfo.textContent = this._newUserInfo.value;
    }
}