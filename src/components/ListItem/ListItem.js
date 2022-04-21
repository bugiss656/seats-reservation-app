import listItemStyles from './ListItem.module.css'


const ListItem = ({ text }) => {
    return (
        <li className={listItemStyles.listItem}>{text}</li>
    )
}

export default ListItem