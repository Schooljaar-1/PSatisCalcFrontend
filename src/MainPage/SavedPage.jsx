import { useState } from 'react'

function SavedPage() {
    const [page, setPage] = useState(1)
    const itemsPerPage = 6

    const savedRecipes = [
        { id: 1, name: 'Recipe A' },
        { id: 2, name: 'Recipe B' },
        { id: 3, name: 'Recipe C' },
        { id: 4, name: 'Recipe D' },
        { id: 5, name: 'Recipe E' },
        { id: 6, name: 'Recipe F' },
        { id: 7, name: 'Recipe G' },
        { id: 8, name: 'Recipe H' },
    ]

    const totalPages = Math.ceil(savedRecipes.length / itemsPerPage)
    const startIndex = (page - 1) * itemsPerPage
    const currentItems = savedRecipes.slice(startIndex, startIndex + itemsPerPage)

    return (
        <div className="savedPage">
            <h2>Saved Recipes</h2>

            <div className="savedGrid">
                {currentItems.map(recipe => (
                    <div key={recipe.id}>
                        <h3>{recipe.name}</h3>
                    </div>
                ))}
            </div>

            <div className="pagination">
                <button
                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>

                <span>Page {page} of {totalPages}</span>

                <button
                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default SavedPage