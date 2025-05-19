import React from 'react'

const Pagination = ({ totalPagePost, PostPerPage, setCurrentPage }) => {

    //Array for page numbers
    const pages = [];

    for (let i = 1; i <= Math.ceil(totalPagePost / PostPerPage); i++) {
        pages.push(i);

    }


    return (
        <div className="flex justify-center gap-4 mt-8">
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 transform hover:scale-105">
                        {page}
                    </button>
                );
            })}
        </div>

    );
};

export default Pagination