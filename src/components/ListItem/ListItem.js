import listItem from './ListItem.module.css'


const ListItem = ({ text }) => {
    return (
        <li className={listItem.listItem}>{text}</li>
    )
}

export default ListItem