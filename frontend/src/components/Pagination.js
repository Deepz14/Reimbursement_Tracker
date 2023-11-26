const Pagination = ({expenseList, page, selectPageHandler}) => {

    return (
        <div className="pagination flex justify-center cursor-pointer my-3">
            <span onClick={() => selectPageHandler(page - 1)} className="rounded-l">◀</span>
            {[...Array(Math.ceil(expenseList?.length / 5))]?.map((_, i) => {
                return <span className={page === i+1 ? "pagination__selected" : ""} onClick={() => selectPageHandler(i+1)}
                    key={i}>{i+1}</span>
            })}
            <span onClick={() => selectPageHandler(page + 1)} className="rounded-r">▶</span>
        </div>
    )
}

export default Pagination;