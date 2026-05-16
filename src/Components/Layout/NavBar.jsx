import React, { useState } from 'react';
import { Link } from "react-router-dom";
import logo from '../../images/Logo.png';

const NAV_SECTIONS = [
  {
    id: 'admin',
    label: 'Administración',
    icon: 'bi bi-gear',
    items: [
      { label: 'Usuarios', path: '/Users', icon: 'bi bi-people' },
      { label: 'Roles', path: '/Roles', icon: 'bi bi-key' },
      { label: 'Sucursales', path: '/Branches', icon: 'bi bi-building' },
      { label: 'Clientes', path: '/Clients', icon: 'bi bi-person-badge' }
    ]
  },
  {
    id: 'sales',
    label: 'Ventas',
    icon: 'bi bi-receipt-cutoff',
    items: [
      { label: 'Carrito', path: '/Cart', icon: 'bi bi-cart3' },
      { label: 'Agregar productos', path: '/Cart/Add', icon: 'bi bi-cart-plus' },
      { label: 'Quitar productos', path: '/Cart/Remove', icon: 'bi bi-cart-dash' },
      { label: 'Descuentos', path: '/Cart/Discount', icon: 'bi bi-percent' },
      { label: 'Cobrar', path: '/Cart/Checkout', icon: 'bi bi-credit-card' }
    ]
  },
  {
    id: 'catalogs',
    label: 'Catálogos',
    icon: 'bi bi-box-seam',
    items: [
      { label: 'Productos', path: '/Products', icon: 'bi bi-bag' },
      { label: 'Proveedores', path: '/Providers', icon: 'bi bi-truck' },
      { label: 'Marcas', path: '/Brands', icon: 'bi bi-tags' },
      { label: 'Categorías', path: '/Categories', icon: 'bi bi-list-ul' },
      { label: 'Medidas', path: '/Measures', icon: 'bi bi-rulers' }
    ]
  }
];

export default function NavBar() {
  const [openSection, setOpenSection] = useState('admin');

  const toggleSection = (sectionId) => {
    setOpenSection((prev) => (prev === sectionId ? null : sectionId));
  };

  return (
    <nav className='NavBar px-2'>
      <div className='col'>
        <div className='text-center'>
          <img src={logo} alt="logo" className='logo' />
        </div>
        {NAV_SECTIONS.map((section) => (
          <div key={section.id} className='mb-2'>
            <button
              type='button'
              className='menuButton btn w-100 mb-0 text-start outline-none d-flex align-items-center justify-content-between'
              onClick={() => toggleSection(section.id)}
              aria-expanded={openSection === section.id}
              aria-controls={`section-${section.id}`}
            >
              <span>
                <i className={`${section.icon} me-2`}></i>
                {section.label}
              </span>
              <i className={`bi ${openSection === section.id ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
            </button>
            <div
              id={`section-${section.id}`}
              className={`collapse ${openSection === section.id ? 'show' : ''}`}
            >
              <div>
                {section.items.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className='menuButton btn w-100 mb-1 text-start ps-4 outline-none d-flex align-items-center'
                  >
                    <i className={`${item.icon} me-2`}></i>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
}