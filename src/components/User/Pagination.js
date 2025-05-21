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
                        className="bg-yellow-700 text-black px-4 py-2 rounded-lg hover:bg-yellow-600 hover:text-black transition duration-200 transform hover:scale-105">
                        {page}
                    </button>
                );
            })}
        </div>

    );
};

export default Pagination