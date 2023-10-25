export interface IBreadcrumbItem {
  key: string;
  title: string;
}

interface IInitialState {
  items: IBreadcrumbItem[]
}

export const initialState: IInitialState = {
  items: JSON.parse(sessionStorage.getItem("breadcrumb") as string) || [{ key: "/", title: "首页" }]
}
