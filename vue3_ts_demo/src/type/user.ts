export interface ListInt {
    id: number,
    nickName: string,
    role: RoleInt[],
    userName: string
}

interface RoleInt {
    role: number,
    roleName: string
}

interface selectData {
    role: number,
    nickName: string
}

interface RoleListInt {
    authority: number[],
    roleId: number,
    roleName: string
}

export class InitData {
    list: ListInt[] = []
    selectData: selectData = {
        role: 0,
        nickName: ""
    }
    roleList: RoleListInt[] = []
}