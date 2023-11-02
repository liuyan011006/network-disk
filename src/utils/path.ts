export function parseSearch(search: string) {
    const str = search.slice(1).split("&")
    const obj = {}
    str.forEach((item) => {
        const [key, val] = item.split("=");
        // @ts-ignore
        obj[key] = Number(val)
    })
    return obj
}