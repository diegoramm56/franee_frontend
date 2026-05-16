// Base URL de la API
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';

// Endpoints de la API
export const API_ENDPOINTS = {
    // Sucursales
    BRANCHES: '/Branch',
    
    // Productos
    PRODUCTS: '/Product',
    
    // Categorías
    CATEGORIES: '/Category',

    // Marcas
    BRANDS: '/Brand',

    // Clientes
    CLIENTS: '/Client',

    // Medidas
    MEASURES: '/Measure',

    // Ventas
    SALES: '/Sale',
    SALE_DETAILS: '/SaleDetail',
    
    // Usuarios
    USERS: '/User',
    
    // Carrito
    CART: '/Cart',
};
