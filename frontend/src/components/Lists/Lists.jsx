import './Lists.css';

function Lists({selectedList, lists, setSelectedList, onCreateList, onDeleteList, onEditList}) {
    return (
        <ul className="lists">
            <button type="button" className="lists__add-button" onClick={() => {onCreateList()}}></button>
            <li className={`lists__item ${selectedList.title === null && "lists__item_selected"}`} onClick={() => setSelectedList({title: null, id: null})}>All</li>
            {lists.map(list => <li onDeleteList={onDeleteList} onEditList={onEditList} key={list.id} onClick={() => setSelectedList(list)} className={`lists__item ${selectedList.title === list.title && "lists__item_selected"}`}>{list.title}</li>)}
        </ul>
    );
}

export default Lists;