import { RootState } from '@/store'



export const selectSelectedRowKeys = (state: RootState) =>
  state.file.selectedRowKeys
