export interface IProduct {
  productId: string;
  name: string;
  image: string;
  description: string;
  brand: string;
  category: string;
  price: number;
  countInStock: number;
  rating: number;
  numReviews: number;
  qty?: number;
}

export interface ICartItems {
  id: number;
  product: IProduct;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  price?: number;
  qty: number;
}

export interface IShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface ICart {
  cartItems: ICartItems[];
  shippingAddress: IShippingAddress;
  paymentMethod: string;
  itemsTotalPrice?: number;
  shippingTotalPrice?: number;
  taxTotalPrice?: number;
  totalFinalPrice?: number;
}

export interface IUser {
  token: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: string;
}

export interface IAuthState {
  userInfo: IUser | null;
}

export interface ILoginRequest {
  username: string;
  password: string;
}

export interface IMessage {
  message: string;
}
