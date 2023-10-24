import { RootState } from "@/store";


export const selectBreadcrumbItems = (state: RootState) => state.breadcrumb.items;