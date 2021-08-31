import ListItem from "../ListItem/ListItem"


const UnorderedList = ({ data }) => {

    return (
        <ul>
            {data.map(seat => 
                <ListItem key={seat.id} text={`rząd ${seat.cords.x}, miejsce ${seat.cords.y} (${seat.id})`} />
            )}
        </ul>
    )
}

export default UnorderedList