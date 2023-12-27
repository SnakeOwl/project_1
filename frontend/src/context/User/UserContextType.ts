import IUser from "@/interfaces/IUser";

type UserContextType = {
    token?: string
    bkey?: string
    user?: IUser
};

export default UserContextType;