import React from 'react';

function Header({ onAddBottleClick }) {

    return (
        <header className="bg-indigo-600 py-2">
            <div className="container mx-auto flex items-center justify-between">
                <h1 className="text-white text-2xl font-bold">Wine Cellar App</h1>
                <button
                    type="button"
                    className="px-4 py-2 bg-white text-indigo-600 rounded-md hover:bg-indigo-200 focus:outline-none"
                    onClick={onAddBottleClick}
                >
                    Add Bottle
                </button>
            </div>
        </header>
    );
}

export default Header;
