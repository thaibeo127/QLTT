import { User } from "./User";

export class UserList{
    ArrUser: User[] = [];
    
    AddUser = (newUser) => {
        this.ArrUser.push(newUser);
    };

    DelUser = (accNeedDel) => {
        this.ArrUser = this.ArrUser.filter((user) => {
            return user.TaiKhoan != accNeedDel;
        });
    };
    
}