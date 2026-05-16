// Servicio para la conexión real con la API del backend para el módulo de Products
import { API_CONFIG, getRequestConfig, handleApiResponse, transformBoolean, transformState } from './apiConfig';

export const ProductAPIService = {
    // Obtener todos los productos
    getAll: async () => {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/Product`, getRequestConfig());
            return await handleApiResponse(response);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw error;
        }
    },

    getAllByBranch: async (branchId) => {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/Product/branch/${branchId}`, getRequestConfig());
            return await handleApiResponse(response);
        } catch (error) {
            console.error(`Error al obtener productos de la sucursal ${branchId}:`, error);
            throw error;
        }
    },

    // Obtener un producto por ID
    getById: async (id) => {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/Product/${id}`, getRequestConfig());
            return await handleApiResponse(response);
        } catch (error) {
            console.error(`Error al obtener producto con ID ${id}:`, error);
            throw error;
        }
    },

    // Crear un nuevo producto
    create: async (productData) => {
        try {
            // Transformar los datos del frontend al formato del backend
            // NO incluir ProductId porque es autoincremental en la BD
            const backendProduct = {
                CodeBar: productData.CodeBar,
                Name: productData.Name,
                PurchasePrice: parseFloat(productData.PurchasePrice),
                GainPercentage: parseFloat(productData.GainPercentage),
                UnitPrice: parseFloat(productData.UnitPrice),
                Description: productData.Description,
                State: transformBoolean(productData.State),
                MeasureId: productData.MeasureId,
                BrandId: productData.BrandId,
                CategoryId: productData.CategoryId,
                ProviderId: productData.ProviderId
            };

            const response = await fetch(
                `${API_CONFIG.BASE_URL}/Product`, 
                getRequestConfig('POST', backendProduct)
            );
            
            return await handleApiResponse(response);
        } catch (error) {
            console.error('Error al crear producto:', error);
            throw error;
        }
    },

    // Actualizar un producto existente
    update: async (id, productData) => {
        try {
            // Transformar los datos del frontend al formato del backend
            const backendProduct = {
                ProductId: id,
                CodeBar: productData.CodeBar,
                Name: productData.Name,
                PurchasePrice: parseFloat(productData.PurchasePrice),
                GainPercentage: parseFloat(productData.GainPercentage),
                UnitPrice: parseFloat(productData.UnitPrice),
                Description: productData.Description,
                State: transformBoolean(productData.State),
                MeasureId: productData.MeasureId,
                BrandId: productData.BrandId,
                CategoryId: productData.CategoryId,
                ProviderId: productData.ProviderId
            };

            const response = await fetch(
                `${API_CONFIG.BASE_URL}/Product`, 
                getRequestConfig('PUT', backendProduct)
            );
            
            return await handleApiResponse(response);
        } catch (error) {
            console.error(`Error al actualizar producto con ID ${id}:`, error);
            throw error;
        }
    },

    // Eliminar un producto
    delete: async (id) => {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/Product/${id}`, 
                getRequestConfig('DELETE')
            );
            
            return await handleApiResponse(response);
        } catch (error) {
            console.error(`Error al eliminar producto con ID ${id}:`, error);
            throw error;
        }
    },    // Función helper para transformar datos del backend al formato del frontend
    transformToFrontendFormat: (backendProduct) => {
        return {
            id: backendProduct.productId,
            codeBar: backendProduct.codeBar,
            name: backendProduct.name,
            purchasePrice: backendProduct.purchasePrice,
            gainPercentaje: backendProduct.gainPercentage, // Mantenemos el nombre en español en el frontend
            unitPrice: backendProduct.unitPrice,
            description: backendProduct.description,
            state: transformState(backendProduct.state),
            measure_id: backendProduct.measureId,
            brand_id: backendProduct.brandId,
            category_id: backendProduct.categoryId,
            provider_id: backendProduct.providerId,
            stock: backendProduct.stock || 0,
            // Incluimos los datos relacionados si están disponibles
            brandName: backendProduct.brand ? backendProduct.brand.name : 'Desconocido',
            categoryName: backendProduct.category ? backendProduct.category.name : 'Desconocido',
            measureName: backendProduct.measure ? backendProduct.measure.name : 'Desconocido',
            providerName: backendProduct.provider ? backendProduct.provider.name : 'Desconocido'
        };
    },

    // Función para obtener todos los productos transformados al formato del frontend
    getAllFormatted: async () => {
        try {
            const products = await ProductAPIService.getAll();
            return products.map(ProductAPIService.transformToFrontendFormat);
        } catch (error) {
            console.error('Error al obtener productos formateados:', error);
            throw error;
        }
    },

    // Función para obtener un producto por ID transformado al formato del frontend
    getByIdFormatted: async (id) => {
        try {
            const product = await ProductAPIService.getById(id);
            return ProductAPIService.transformToFrontendFormat(product);
        } catch (error) {
            console.error(`Error al obtener producto formateado con ID ${id}:`, error);
            throw error;
        }
    },

    GetProductBranches: async (productID) => {
        try {
            const response = await fetch(`${API_CONFIG.BASE_URL}/Product/branches/${productID}`, getRequestConfig());
            return await handleApiResponse(response);
        } catch (error) {
            console.error('Error al obtener productos:', error);
            throw error;
        }
    },

    UpdateProductBranches: async (id, productBranches) => {
        try {
            const response = await fetch(
                `${API_CONFIG.BASE_URL}/Product/branches/${id}`, 
                getRequestConfig('PUT', productBranches)
            );
            
            return await handleApiResponse(response);
        } catch (error) {
            console.error(`Error al actualizar producto con ID ${id}:`, error);
            throw error;
        }
    }
};

export default ProductAPIService;