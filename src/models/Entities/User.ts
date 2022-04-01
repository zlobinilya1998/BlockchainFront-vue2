export class User {
    name = "Iliya"
    email = "qwertin199@gmail.com"
    birthDate = "1990-10-24"
}

export class LoginModel {
    email = "qwertin1998@gmail.com"
    password = '1234'
}

export class RegisterModel {
    login = "Iliya"
    password = '1234'
    email = "qwertin1998@gmail.com"
}


export enum FormState {
    login,
    registration,
}
