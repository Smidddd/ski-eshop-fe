enum type{
  SKI,
  SNOWBOARD,
  SKIBOOTS,
  SNOWBOOTS
}
export interface Filter{
  price1: number;
  price2: number;
  type: type;
  sizes: Array<string>;

}
