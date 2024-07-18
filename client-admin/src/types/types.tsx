export interface StatusValueType {
    current: string,
    next: string,
}

export interface ProductType {
    idProduct: number,
    nameProduct: string,
    price: number,
    imgProduct?: string,
    idType?: number,
    brand?: string,
    nameType?: string,
    discount?: number,
    quantity?: number | string,
    action?: "show" | "hide"
}
export interface UserType {
    idUser: string,
    nameUser: string,
    img?: string,
    email?: string,
    phone?: string,
    created_at?: string,
    updated_at?: string,
    action?: string
}
export interface UserAddressType {
    idAddress: number,
    idUser: string,
    typeAddress: string,
    detail: string,
    nameUser: string
}
export interface PositionType {
    position_id?: number,
    idStaff?: string,
    position_name?: string
}
export interface StaffType extends PositionType {
    idStaff: string,
    name: string,
    avatar?: string,
    email?: string,
    phone?: string,
    birthday?: string,
    address: string,
    created_at?: string,
    updated_at?: string,
    action?: string
}
export interface ShipperType {
    idStaff: string,
    position_name: string,
    name: string
}
export interface PostType {
    idPost: number,
    idType: number,
    nameType: string,
    title: string,
    thumbnails: string,
    dateAdded: string,
    poster: string,
    valuesPosts?: string
}
export interface CommentProductType {
    idComment: number,
    idProduct: number,
    idUser: string,
    commentValue: string,
    created_at?: Date
}
export interface CommentPostType {
    idComment: number,
    idPost: number,
    idUser: string,
    commentValue: string,
    created_at?: Date
}
export interface SaleDetailType {
    idSaleDetail: number,
    idProduct: number,
    idSale: number,
    discount: number,
    created_at?: Date
}
export interface SaleType {
    idSale: number,
    title: string,
    start_date: Date,
    end_date: Date,
}
export interface OrderType {
    idOrder: string,
    idUser: string,
    idShipper: string | null,
    created_at: string,
    fullName: string,
    phone: string,
    address: string,
    costs: number,
    method: string,
    edd: Date,
    paymentStatus: 'paid' | 'unpaid',
    orderStatus: string,
    note: string,
}
export interface OrderDetailType {
    idOrdDetail: number,
    idOrder: string,
    idProduct: number,
    countProduct: number,
    discount: number,
}
export interface CategoryPostType {
    idType: number,
    nameType: string,
    create_at?: Date,
    update_at?: Date
}
export interface CategoryProductType {
    idType: number,
    nameType: string,
    detail: CategoryDetailType[]
}
export interface CategoryDetailType {
    idType?: number;
    id: string;
    type: string;
    name: string;
    displayname: string;
    datatypes: string;
    displayorder: number;
}

export interface WarehouseType {
    id: number,
    idProduct: number,
    idpersonIOX: string,
    dateIOX: Date,
    countProduct: number,
    statusWare: 'import' | 'export'
}