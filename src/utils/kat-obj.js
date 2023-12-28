//catObj takes in a kat object and returns a new kat object with the same properties
//or empty strings if the properties are undefined and id = 0 if id is undefined
export const katObj = (kat) => {
    let pros = [], cons = [], catName = '', id = null;
    if (kat.name !== undefined) catName = kat.name;
    else console.log('kat.name is undefined')
    if (kat.id !== undefined) id = kat.id;
    else console.log('kat.id is undefined')
    if (kat.pros !== undefined && kat.pros.length > 0 && kat.pros[0].value !== null) {
        pros = kat.pros.map((pro) => {
            return { value: pro.value, id: pro.id }
        })
    } else { pros = ([...Array(5)].map((pro) => {return pro = {value: '', id: null} })) }
    if (kat.cons !== undefined && kat.cons.length > 0 && kat.cons[0].value !== null) {
    cons = kat.cons.map((con) => {
        return { value: con.value, id: con.id }
    })
} else { cons = ([...Array(5)].map((con) => {return con = {value: '', id: null} })) }
return {
    name: catName,
    id: id,
    pros: pros,
    cons: cons,
}
}