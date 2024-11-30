// Class for Product Review
export class Review {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;

    constructor({
        rating,
        comment,
        date,
        reviewerName,
        reviewerEmail,
    }: {
        rating: number;
        comment: string;
        date: string;
        reviewerName: string;
        reviewerEmail: string;
    }) {
        this.rating = rating;
        this.comment = comment;
        this.date = date;
        this.reviewerName = reviewerName;
        this.reviewerEmail = reviewerEmail;
    }
}

// Class for Product Dimensions
export class Dimensions {
    width: number;
    height: number;
    depth: number;

    constructor({
        width,
        height,
        depth,
    }: {
        width: number;
        height: number;
        depth: number;
    }) {
        this.width = width;
        this.height = height;
        this.depth = depth;
    }
}

// Class for Product Metadata
export class Meta {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;

    constructor({
        createdAt,
        updatedAt,
        barcode,
        qrCode,
    }: {
        createdAt: string;
        updatedAt: string;
        barcode: string;
        qrCode: string;
    }) {
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.barcode = barcode;
        this.qrCode = qrCode;
    }
}

// Class for Product
export class Product {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: Dimensions;
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: Review[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: Meta;
    thumbnail: string;
    images: string[];

    constructor({
        id,
        title,
        description,
        category,
        price,
        discountPercentage,
        rating,
        stock,
        tags,
        brand,
        sku,
        weight,
        dimensions,
        warrantyInformation,
        shippingInformation,
        availabilityStatus,
        reviews,
        returnPolicy,
        minimumOrderQuantity,
        meta,
        thumbnail,
        images,
    }: {
        id: number;
        title: string;
        description: string;
        category: string;
        price: number;
        discountPercentage: number;
        rating: number;
        stock: number;
        tags: string[];
        brand: string;
        sku: string;
        weight: number;
        dimensions: Dimensions;
        warrantyInformation: string;
        shippingInformation: string;
        availabilityStatus: string;
        reviews: Review[];
        returnPolicy: string;
        minimumOrderQuantity: number;
        meta: Meta;
        thumbnail: string;
        images: string[];
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.price = price;
        this.discountPercentage = discountPercentage;
        this.rating = rating;
        this.stock = stock;
        this.tags = tags;
        this.brand = brand;
        this.sku = sku;
        this.weight = weight;
        this.dimensions = new Dimensions(dimensions);
        this.warrantyInformation = warrantyInformation;
        this.shippingInformation = shippingInformation;
        this.availabilityStatus = availabilityStatus;
        this.reviews = reviews.map((review) => new Review(review));
        this.returnPolicy = returnPolicy;
        this.minimumOrderQuantity = minimumOrderQuantity;
        this.meta = new Meta(meta);
        this.thumbnail = thumbnail;
        this.images = images;
    }
}

// Class for API Response
export class ProductApiResponse {
    products: Product[];
    total: number;
    skip: number;
    limit: number;

    constructor({
        products,
        total,
        skip,
        limit,
    }: {
        products: Product[];
        total: number;
        skip: number;
        limit: number;
    }) {
        this.products = products.map((product) => new Product(product));
        this.total = total;
        this.skip = skip;
        this.limit = limit;
    }
}
