import { Request, Response } from 'express';
import { getAllProductsService } from '../services/product.service';
import { getProductByIdService } from '../services/product.service';
import { createProductService } from '../services/product.service';
import { updateProductService } from '../services/product.service';
import { deleteProductService } from '../services/product.service';

export const getAllProducts = async (req: Request, res: Response) => {
  const { page = 1, limit = 10, name, priceTable } = req.query;
    try {
    const products = await getAllProductsService({
      page: Number(page),
      limit: Number(limit),
      name: name?.toString(),
      priceTable: priceTable?.toString(),
    });

    return res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao listar os produtos' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const product = await getProductByIdService(Number(id));

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    return res.json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar o produto' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const product = await createProductService(data);
    return res.status(201).json(product);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar o produto' });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;

    const updated = await updateProductService(id, data);

    return res.json(updated);
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message || 'Erro ao atualizar o produto' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result = await deleteProductService(id);
    return res.json(result);
  } catch (error: any) {
    console.error(error);
    return res.status(400).json({ message: error.message || 'Erro ao deletar o produto' });
  }
};