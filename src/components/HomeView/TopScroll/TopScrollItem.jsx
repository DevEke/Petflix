

export default function TopItem({movie, rank}) {
    return (
        <>
            <div style={{backgroundImage: `url(${movie?.posterURL})`}} className='top-item_container'/>
            <div className='top-rating'><span>{rank}</span></div>
        </>
    )
}