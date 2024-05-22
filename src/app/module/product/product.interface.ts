// varannts type
export type TVariants = {
  type: string;
  value: string;
};

// inventory type
export type TInventory = {
  quantity: number;
  inStock: boolean;
};

// product interface
export interface TProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariants[];
  inventory: TInventory;
}

// interface for updateDoc
export interface TUpdateProduct {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
  tags?: string[];
  variants?: TVariants[];
  inventory?: TInventory;
}
