import { products_gender,products_type } from '@prisma/client';
import prisma from '../prisma/client';

interface ProductQueryParams {
    page: number;
    limit: number;
    name?: string;
    priceTable?: string;
}

export const getAllProductsService = async (params: ProductQueryParams) => {
    const { page, limit, name, priceTable } = params;
    const skip = (page - 1) * limit;

    const products = await prisma.products.findMany({
        where: {
            deleted_at: null,
            name: name ? { contains: name } : undefined,
            variants: priceTable
                ? {
                    some: {
                        skus: {
                            some: {
                                price_tables_skus: {
                                    some: {
                                        price_table_id: Number(priceTable),
                                    },
                                },
                            },
                        },
                    },
                }
                : undefined,
        },
        skip,
        take: limit,
        include: {
            variants: {
                include: {
                    skus: {
                        include: {
                            price_tables_skus: true,
                        },
                    },
                },
            },
        },
    });

    const filtered = products.map(product => ({
        ...product,
        variants: product.variants.filter(variant => {
            const priceTablesIds = variant.skus.flatMap(sku =>
                sku.price_tables_skus.map(ptSku => ptSku.price_table_id)
            );
            return priceTablesIds.every(id => id === priceTablesIds[0]);
        }),
    }));

    return filtered;
};
export const getProductByIdService = async (id: number) => {
    const product = await prisma.products.findFirst({
        where: {
            id,
            deleted_at: null,
        },
        include: {
            variants: {
                where: {
                    deleted_at: null,
                },
                include: {
                    skus: {
                        where: {
                            deleted_at: null,
                        },
                        include: {
                            price_tables_skus: true,
                        },
                    },
                },
            },
        },
    });

    if (!product) return null;

    const filteredVariants = product.variants.filter(variant => {
        const priceTablesIds = variant.skus.flatMap(sku =>
            sku.price_tables_skus?.map(ptSku => ptSku.price_table_id) ?? []
        );
        return priceTablesIds.every(id => id === priceTablesIds[0]);
    });

    const mainVariant = filteredVariants[0];
    const mainSku = mainVariant?.skus?.[0];

    return {
        id: product.id,
        name: product.name,
        variant_name: mainVariant?.name,
        hex_code: mainVariant?.hex_code,
        reference: product.reference,
        gender: product.gender,
        category: product.category_id,
        subcategory: product.subcategory_id,
        prompt_delivery: product.prompt_delivery,
        description: product.description,
        open_grid: product.open_grid,
        type: product.type,
        skus: mainVariant?.skus?.map(sku => ({
            id: sku.id,
            size: sku.size,
            price: sku.price,
            stock: sku.stock,
            min_quantity: sku.min_quantity,
        })) ?? [],
        companies: {
            key: product.company_id,
        },
        brand: product.brand_id,
    };
};


interface CreateSkuInput {
    size: string;
    stock: number;
    price: number;
    code: string;
    multiple_quantity: number;
    open_grid?: boolean;
    min_quantity?: number;
}

interface CreateVariantInput {
    name: string;
    hex_code?: string;
    skus: CreateSkuInput[];
}

interface CreateProductInput {
    name: string;
    reference: string;
    gender: string;
    category_id: number;
    subcategory_id: number;
    prompt_delivery: boolean;
    description?: string;
    type: string;
    company_id: number;
    brand_id: number;
    variants: CreateVariantInput[];
}

export const createProductService = async (data: CreateProductInput) => {
    const product = await prisma.products.create({
        data: {
            name: data.name,
            reference: data.reference,
            gender: data.gender.toUpperCase() as products_gender,
            category_id: data.category_id,
            subcategory_id: data.subcategory_id,
            prompt_delivery: data.prompt_delivery,
            description: data.description,
            type: data.type.toUpperCase() as products_type,
            company_id: data.company_id,
            brand_id: data.brand_id,
            variants: {
                create: data.variants.map(variant => ({
                    name: variant.name,
                    hex_code: variant.hex_code,
                    skus: {
                        create: variant.skus.map(sku => ({
                            size: sku.size,
                            stock: sku.stock,
                            price: sku.price,
                            code: sku.code,
                            multiple_quantity: sku.multiple_quantity,
                            open_grid: sku.open_grid,
                            min_quantity: sku.min_quantity,
                        })),
                    },
                })),
            },
        },
        include: {
            variants: {
                include: {
                    skus: true,
                },
            },
        },
    });

    return product;
};

interface UpdateProductInput {
  name?: string;
  reference?: string;
  gender?: string;
  category_id?: number;
  subcategory_id?: number;
  prompt_delivery?: boolean;
  description?: string;
  type?: string;
  company_id?: number;
  brand_id?: number;
  open_grid?: boolean;
}

export const updateProductService = async (id: number, data: UpdateProductInput) => {
  const product = await prisma.products.findFirst({
    where: {
      id,
      deleted_at: null,
    },
  });

  if (!product) {
    throw new Error('Produto não encontrado');
  }

  const updatedProduct = await prisma.products.update({
    where: { id },
    data: {
      ...data,
      gender: data.gender?.toUpperCase() as products_gender,
      type: data.type?.toUpperCase() as products_type,
      updated_at: new Date(),
    },
  });

  return updatedProduct;
};

export const deleteProductService = async (id: number) => {
  const product = await prisma.products.findFirst({
    where: {
      id,
      deleted_at: null,
    },
  });

  if (!product) {
    throw new Error('Produto não encontrado');
  }

  await prisma.products.update({
    where: { id },
    data: { deleted_at: new Date() },
  });

  return { message: 'Produto deletado com sucesso' };
};