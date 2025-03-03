import React from 'react'

function SorceCategory() {
  return (
    <div className="category-container">
    <h2>Source by category</h2>
    <div className="category-grid">
      {categories.map((category) => (
        <div key={category.id} className="category-card">
          <img
            src={category.image}
            alt={category.name}
            className="category-image"
          />
          <p className="category-name">{category.name}</p>
        </div>
      ))}
    </div>
  </div>
  )
}

export default SorceCategory
