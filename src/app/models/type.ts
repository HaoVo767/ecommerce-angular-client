export interface IBillboard {
  id: string;
  label: string;
  imageUrl: string;
}

export interface ICategory {
  id: string;
  name: string;
  billboard?: IBillboard;
}

export interface IProduct {
  id: string;
  category: ICategory;
  name: string;
  price: string;
  isFeatured: boolean;
  thumnailUrl: string;
  size: ISize;
  color: IColor;
  image: IImage[];
}

export interface ISize {
  id: string;
  name: string;
  value: string;
}

export interface IColor {
  id: string;
  name: string;
  value: string;
}

export interface IImage {
  id: string;
  url: string;
}

export interface IOrderContact {
  name: string;
  phone: string;
  address: string;
}

export interface IOrderItems {
  id: string;
  orderId: string;
  order: IOrder;
  productId: string;
  product: IProduct;
}

export interface IOrder {
  id: string;
  storeId: string;
  orderItems: Partial<IOrderItems>[];
  isPaid: boolean;
  name: string;
  phone: string;
  address: string;
}

export interface IQuery {
  [key: string]: string | number | null;
}
