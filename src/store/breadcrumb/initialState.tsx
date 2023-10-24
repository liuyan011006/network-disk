export interface IBreadcrumbItem {
  title: string
}

interface IInitialState {
  items: IBreadcrumbItem[]
}

export const initialState: IInitialState = {
  items: [
    {
      title: '首页'
    }
  ]
}
