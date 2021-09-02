import ListItem from "../ListItem/ListItem"

import unorderedList from './UnorderedList.module.css'


const UnorderedList = ({ data }) => {

    return (
        <ul className={unorderedList.unorderedList}>
            {data.map(seat => 
                <ListItem key={seat.id} text={`rząd ${seat.cords.x}, miejsce ${seat.cords.y} (${seat.id})`} />
            )}
        </ul>
    )
}

export default UnorderedList