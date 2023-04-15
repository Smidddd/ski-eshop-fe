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
  sizes: Set<number>;
  type: type;
  image: string;
}
