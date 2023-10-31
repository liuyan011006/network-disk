import { HomeFilled, CreditCardFilled } from '@ant-design/icons'

export const NavList = [
    {
        icon: HomeFilled,
        label: '首页',
        key: '/index?category=all'
    },
    {
        icon: CreditCardFilled,
        label: '分享',
        key: '/share'
    }
]

export const icon_style = (selected: boolean) => {
    return {
        fontSize: 30,
        color: selected ? "#4aa9f8" : '#acb5c9'
    }
}

export const font_style = (selected: boolean) => {
    return {
        fontSize: 16,
        color: selected ? "#4aa9f8" : '#acb5c9'
    }
}