//catObj takes in a cat object and returns a new cat object with the same properties
//or empty strings if the properties are undefined and id = 0 if id is undefined
export const catObj = (cat) => {
    let pros = [], cons = [], catName = '', id = null;
    if (cat.name !== undefined) catName = cat.name;
    if (cat.id !== undefined) id = cat.id;
    if (cat.pros !== undefined && cat.pros.length > 0 && cat.pros[0].value !== null) {
        pros = cat.pros.map((pro) => {
            return { value: pro.value, id: pro.id }
        })
    } else { pros = ([...Array(5)].map((pro) => {return pro = {value: '', id: null} })) }
    if (cat.cons !== undefined && cat.cons.length > 0 && cat.cons[0].value !== null) {
    cons = cat.cons.map((con) => {
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

// let thirdCat = {};
// const oldCat = { name: "oldCat", id: 456, pros: [{ value: "roast", id: 123 }, { value: "chicken", id: 456 }], cons: [{ value: "roast", id: 123 }, { value: "chicken", id: 456 }] };
// let newCat = catObj(thirdCat);
// console.log("newCat", newCat);
// let newCat2 = catObj(oldCat);
// console.log("newCat2", newCat2);