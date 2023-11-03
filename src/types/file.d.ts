

interface IFile {
    key?: string;
    id: string;
    name: string;
    type: TType;
    parentDataId: number;
    createTime: string;
    updateTime: string;
    createBy: number;
    link: string | null;
    size: string | null;
    bytes: string | null
}

interface IPathItem {
    id: number;
    folderName: string;
}