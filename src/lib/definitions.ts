export const menu = [
    {
        title : "Home",
        path : "/"
    },
    {
        title : "About",
        path : "/about-us"
    },
    {
        title : "My Shop",
        path : "/dashboard"
    },
    {
        title : "Policy",
        path : "/policy"
    }
]

export type ProductType = {
    id: number,
    name: string,
    image: string,
    desc?:string,
    category?:string,
    quantity?: string,
    price: number,
    onClick?:() => void
}