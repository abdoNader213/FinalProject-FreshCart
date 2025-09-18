export interface OrderData {
    shippingAddress?:  ShippingAddress;
    taxPrice:          number;
    shippingPrice:     number;
    totalOrderPrice:   number;
    paymentMethodType: PaymentMethodType;
    isPaid:            boolean;
    isDelivered:       boolean;
    _id:               string;
    user:              User;
    cartItems:         CartItem[];
    createdAt:         Date;
    updatedAt:         Date;
    id:                number;
    __v:               number;
    paidAt?:           Date;
}

export interface CartItem {
    count:   number;
    product: Product;
    price:   number;
    _id:     string;
}

export interface Product {
    subcategory:     Brand[];
    ratingsQuantity: number;
    _id:             string;
    title:           string;
    imageCover:      string;
    category:        Brand;
    brand:           Brand;
    ratingsAverage:  number;
    id:              string;
}

export interface Brand {
    _id:       ID;
    name:      BrandName;
    slug:      Slug;
    image?:    string;
    category?: ID;
}

export enum ID {
    The6407F1Bcb575D3B90Bf95797 = "6407f1bcb575d3b90bf95797",
    The6407F243B575D3B90Bf957AC = "6407f243b575d3b90bf957ac",
    The6407F39Bb575D3B90Bf957Df = "6407f39bb575d3b90bf957df",
    The6407F3A8B575D3B90Bf957E2 = "6407f3a8b575d3b90bf957e2",
    The6407F3C0B575D3B90Bf957E8 = "6407f3c0b575d3b90bf957e8",
    The6407F3Ccb575D3B90Bf957Eb = "6407f3ccb575d3b90bf957eb",
    The6407F3D8B575D3B90Bf957Ee = "6407f3d8b575d3b90bf957ee",
    The6407F3E3B575D3B90Bf957F1 = "6407f3e3b575d3b90bf957f1",
    The64089Bbe24B25627A253158B = "64089bbe24b25627a253158b",
    The64089C3924B25627A2531593 = "64089c3924b25627a2531593",
    The64089D5C24B25627A253159F = "64089d5c24b25627a253159f",
    The64089D9E24B25627A25315A5 = "64089d9e24b25627a25315a5",
    The64089Dc924B25627A25315A8 = "64089dc924b25627a25315a8",
    The64089Df124B25627A25315Ab = "64089df124b25627a25315ab",
    The64089F5824B25627A25315C7 = "64089f5824b25627a25315c7",
    The64089Faf24B25627A25315CD = "64089faf24b25627a25315cd",
    The64089Fe824B25627A25315D1 = "64089fe824b25627a25315d1",
    The6439D2D167D9Aa4Ca970649F = "6439d2d167d9aa4ca970649f",
    The6439D58A0049Ad0B52B9003F = "6439d58a0049ad0b52b9003f",
    The6439D5B90049Ad0B52B90048 = "6439d5b90049ad0b52b90048",
}

export enum BrandName {
    Adidas = "Adidas",
    CamerasAccessories = "Cameras & Accessories",
    Canon = "Canon",
    DeFacto = "DeFacto",
    Dell = "Dell",
    Electronics = "Electronics",
    JackJones = "Jack & Jones",
    LCWaikiki = "LC Waikiki",
    LaptopsAccessories = "Laptops & Accessories",
    MenSClothing = "Men's Clothing",
    MenSFashion = "Men's Fashion",
    NetworkingProducts = "Networking Products",
    PrintersAccessories = "Printers & Accessories",
    Puma = "Puma",
    Samsung = "Samsung",
    Sony = "SONY",
    TVsSatellitesAccessories = "TVs, Satellites & Accessories",
    VideoGames = "Video Games",
    WomenSClothing = "Women's Clothing",
    WomenSFashion = "Women's Fashion",
}

export enum Slug {
    Adidas = "adidas",
    CamerasAndAccessories = "cameras-and-accessories",
    Canon = "canon",
    Defacto = "defacto",
    Dell = "dell",
    Electronics = "electronics",
    JackAndJones = "jack-and-jones",
    LaptopsAndAccessories = "laptops-and-accessories",
    LcWaikiki = "lc-waikiki",
    MenSClothing = "men's-clothing",
    MenSFashion = "men's-fashion",
    NetworkingProducts = "networking-products",
    PrintersAndAccessories = "printers-and-accessories",
    Puma = "puma",
    Samsung = "samsung",
    Sony = "sony",
    TvsSatellitesAndAccessories = "tvs-satellites-and-accessories",
    VideoGames = "video-games",
    WomenSClothing = "women's-clothing",
    WomenSFashion = "women's-fashion",
}

export enum PaymentMethodType {
    Card = "card",
    Cash = "cash",
}

export interface ShippingAddress {
    details:     string;
    phone?:      string;
    city:        string;
    postalCode?: string;
}

export interface User {
    _id:   UserID;
    name:  UserName;
    email: Email;
    phone: string;
}

export enum UserID {
    The6407Cf6F515Bdcf347C09F17 = "6407cf6f515bdcf347c09f17",
}

export enum Email {
    Ahmed1Mutt2I2GmailCOM = "ahmed1mutt2i2@gmail.com",
}

export enum UserName {
    KhaledAbdAlMuti = "khaled Abd Al-Muti",
}
