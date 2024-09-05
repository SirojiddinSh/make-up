interface ProductColor {
    colour_name: string;
    hex_value: string;
}

export type Product = {
    api_featured_image: string;
    brand: string;
    category: string;
    created_at: string;
    currency: string | null;
    description: string;
    id: number;
    image_link: string;
    name: string;
    price: string;
    price_sign: string | null;
    product_api_url: string;
    product_colors: ProductColor[] | string[];
    product_link: string;
    product_type: string;
    rating: string | null;
    tag_list: string[];
    updated_at: string;
    website_link: string;
};

export type Category = {
    _id: string;
    name: string;
    image: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};

export type FetchCategory = {
    message: string;
    payload: Category[];
};
