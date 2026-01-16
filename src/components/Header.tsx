import React from 'react'

export const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-sm">
            <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold text-gray-800">Micromerce Workout</h1>
            </div>
        </header>
    )
}
