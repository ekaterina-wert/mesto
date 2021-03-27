//информация о пользователе, в конструктор идут profile__
export class UserInfo {
    constructor(userNameSelector, userAboutSelector, userAvatarSelector) {
        this._userName = document.querySelector(userNameSelector);
        this._userAbout = document.querySelector(userAboutSelector);
        this._userAvatar = document.querySelector(userAvatarSelector);
    }

    //возвращает объект с данными пользователя из info при открытии
    getUserInfo() {
        const userData = {};
        userData.userName = this._userName.textContent;
        userData.userAbout = this._userAbout.textContent;

        return userData;
    }

    //заполняет раздел ИНФО новыми данными от пользователя при сабмите
    setUserInfo(name, about) {
        this._userName.textContent = name;
        this._userAbout.textContent = about;
    }

    //заполняет раздел ИНФО новыми данными от пользователя при сабмите
    setUserAvatar(avaUrl) {
        this._userAvatar.setAttribute('src', avaUrl);
    }
}