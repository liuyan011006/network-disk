import { RootState } from '@/store'

export const selectFileSelectedRowKeys = (state: RootState) =>
  state.file.fileSelectedRowKeys

export const selectRecycleSelectedRowKeys = (state: RootState) =>
  state.file.recycleSelectedRowKeys
