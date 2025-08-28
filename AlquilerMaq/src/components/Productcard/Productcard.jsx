import React from 'react'

const ProductCard = ({ title, description, image, onDetails, onRent }) => {

    return (
        <div className='card mb-3'>
            <img
                src={image}
                className='card-img-top'
                alt={title} />
            <div className='card-body p-1'>
                <h6 className='card-title'>Marca</h6>
                <h5 className='card-title'>{title}</h5>
                <p className='card-text'>{description}</p>
                <button className='btn btn-sm btn-primary p-2 m-3' onClick={onDetails}>+ Detalles</button>
                <button className='btn btn-lg btn-success p-3 mt-1 mb-0' onClick={onRent}>Alquilar</button>
            </div>
        </div>
    )
}

export default ProductCard