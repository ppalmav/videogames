import React, {} from 'react'
import './Pagination.css'


export default function Pagination({ cardPerPage, totalCards, paginate, currentPage }) {
    
  if(Math.ceil(totalCards / cardPerPage ) < currentPage ) {
    paginate(1)
  }

    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalCards / cardPerPage ); i++){
        pageNumbers.push(i);
    }
    const pageLength = pageNumbers.length;
    return (
      <div className="pag-div">
        <ul>
            { pageLength > 1 && (
            <>
            <li key='-1'>
            <button className="pag-btn" onClick={() => paginate(1)}>
            <strong>&lt;&lt;</strong>
            </button>
          </li>
            <li key='0'>
                  <button className="pag-btn" onClick={() => paginate(currentPage - 1)}>
                  <strong>&lt;</strong>
                  </button>
                </li>
            </>) }
          {pageLength > 1 &&
            pageNumbers.map((p, i) =>
            // {
            //   i === 0 && (
            //     <li key='0'>
            //       <button className="pag-carr" onClick={() => paginate(currentPage - 1)}>
            //         Prev
            //       </button>
            //     </li>
            //   )          
              p === currentPage ? (
                <li key={i}>
                  <button className="pag-curr" onClick={() => paginate(p)}>
                    {p}
                  </button>
                </li>
              ) : (
                <li key={i}>
                  <button className="pag-btn" onClick={() => paginate(p)}>
                    {p}
                  </button>
                </li>
              )
            //   i === pageNumbers.length && (
            //     <li key='0'>
            //       <button className="pag-carr" onClick={() => paginate(currentPage - 1)}>
            //         Prev
            //       </button>
            //     </li>
            //   )  
            // return p}
            )}
          { pageLength > 1 && (
          <>
          <li key={Math.ceil(totalCards / cardPerPage ) + 1}>
                  <button className="pag-btn" onClick={() => paginate(currentPage + 1)}>
                  <strong>&gt;</strong>
                  </button>
                </li>
            <li key={Math.ceil(totalCards / cardPerPage ) + 2}>
                <button className="pag-btn" onClick={() => paginate(pageLength)}>
                <strong>&gt;&gt;</strong>
                </button>
            </li>
            </>) }
        </ul>
      </div>
    );
}