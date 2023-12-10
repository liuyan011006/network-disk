interface IInitialState {
  useInfo: {
    userId: string
    username: string
    nickname: string
    email: string
    avatar: string
    isVip: number
    status: number
    isLock: number
    createDate?: string
    sex?: string
  }
}

export const initialState: IInitialState = {
  useInfo: JSON.parse(localStorage.getItem('userInfo') as string) || {
    userId: '',
    username: '',
    nickname: '',
    email: '',
    avatar: '',
    isVip: 0,
    status: 0,
    isLock: 0,
    createDate: '',
    sex: ''
  }
}
