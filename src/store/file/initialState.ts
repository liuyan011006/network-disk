interface IInitialState {
  fileSelectedRowKeys: React.Key[]
  recycleSelectedRowKeys: React.Key[]
}

export const initialState: IInitialState = {
  fileSelectedRowKeys: [],
  recycleSelectedRowKeys: []
}
