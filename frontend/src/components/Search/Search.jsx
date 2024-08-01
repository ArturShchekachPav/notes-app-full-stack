import './Search.css';

function Search({setSearchText}) {
    return (
        <form className="search" noValidate >
            <input type="text"  className="search__input"  placeholder="Search for Notes" onChange={(e) => setSearchText(e.target.value)}/>
        </form>
    );
}

export default Search;