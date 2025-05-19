
type DimensionsType = {
        width:  number,
        height:  number,
        depth: number
}

type Review = {
    rating: number,
    comment: string,
    date: string,
    reviewerName: string,
    reviewerEmail: string
}
  
 type Meta =  {
    createdAt: string,
    updatedAt: string,
    barcode: string,
    qrCode: string
  }

type ProductTypes = {
    id: number,
    title: string,
    description: string,
    category: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    tags: string[],
    brand: string,
    sku: string,
    weight: number,
    dimensions: DimensionsType,
    warrantyInformation: string,
    shippingInformation: string,
    availabilityStatus: string,
    reviews: Review[],
    returnPolicy:  string,
    minimumOrderQuantity: number,
    meta: Meta,
    images: string[],
    thumbnail: string,
    cartQuantity?: number
  }
  

type ProductResponse = {
    products: ProductTypes[],
    total: number,
    skip: number,
    limit: number
  }
