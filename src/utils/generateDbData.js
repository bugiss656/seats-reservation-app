import pkg from 'fs-extra'
const { writeJson } = pkg


// Function that generates api data describing seats in the hall. 
// Run this script with the command: npm run generate.
const generateDbData = () => {
    const HALL_ROWS = 7
    const HALL_ROW_SEATS = 15

    let database = { seats: [] }
    
    for(let r = 0; r <= HALL_ROWS - 1; r++) {
        for(let s = 0; s <= HALL_ROW_SEATS - 1; s++) {
            database.seats.push({
                id: `s${r}${s}`,
                cords: {
                    x: r,
                    y: s
                },
                active: true,
                reserved: false
            })
        }
    }

    writeJson('./db.json', database)
        .then(() => console.log('success'))
        .catch(error => console.log(error))
}

generateDbData()