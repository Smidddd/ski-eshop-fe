enum type{
  SKI,
  SNOWBOARD,
  SKIBOOTS,
  SNOWBOOTS
}
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sizes: Array<number>;
  type: type;
  image: string;
}
