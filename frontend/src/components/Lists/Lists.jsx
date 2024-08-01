import './Lists.css';

function Lists({selectedList, lists, setSelectedList}) {
    return (
        <ul className="lists">
            <li className={`lists__item ${selectedList.title === null && "lists__item_selected"}`} onClick={() => setSelectedList({title: null, id: null})}>All</li>
            {lists.map(list => <li key={list.id} onClick={() => setSelectedList(list)} className={`lists__item ${selectedList.title === list.title && "lists__item_selected"}`}>{list.title}</li>)}
        </ul>
    );
}

export default Lists;