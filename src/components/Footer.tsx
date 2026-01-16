import React from 'react'

export const Footer: React.FC = () => {
    return (
        <footer className="mt-auto bg-white flex items-center justify-center">
            <div className="max-w-2xl mx-auto px-4 py-6 text-sm text-gray-500">
                @{new Date().getFullYear()} Micromerce | All Rights Reserved.
            </div>
        </footer>
    )
}
