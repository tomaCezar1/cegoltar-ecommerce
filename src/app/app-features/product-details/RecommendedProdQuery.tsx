import { gql } from '@apollo/client';

export const RecommendedProductsQuery = gql`
  query($productId: String!) {
    recommendedProducts(productId: $productId) {
      articleCode
      available
      description
      images
      isPromo
      name
      newPrice
      notAvailableCustomText
      price
      promoDiscount
      slug
      sortOrder
    }
  }
`;

export interface IRecommendedProducts {
  articleCode: string;
  available: boolean;
  description: string;
  images: [string];
  isPromo: boolean;
  name: string;
  newPrice: number;
  notAvailableCustomText: string;
  price: number;
  promoDiscount: number;
  slug: string;
  sortOrder: number;
}
