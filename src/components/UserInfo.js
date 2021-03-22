//информация о пользователе
export class UserInfo {
    constructor(userNameSelector, userInfoSelector) {
        this._userName = document.querySelector(userNameSelector);
        this._userInfo = document.querySelector(userInfoSelector);
    }

    //возвращает объект с данными пользователя из ИНФО при открытии
    getUserInfo() {
        const userInfoData = {};
        userInfoData.userName = this._userName.textContent;
        userInfoData.userInfo = this._userInfo.textContent;
        return userInfoData;
    }

    //заполняет раздел ИНФО новыми данными от пользователя при сабмите
    setUserInfo(name, info) {
        this._userName.textContent = name;
        this._userInfo.textContent = info;
    }
}