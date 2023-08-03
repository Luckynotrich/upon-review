import axios from './_axios-programming-interface.js'
export default async function getCategories (userId,_categories){
    let error = null;
    try {
        await axios.get('/api/category-api/',{
            userId,
            error,
            response
        });
        _categories.current = await response.data;
        if (_categories.current.length > 0) {
            console.log("getCategories", _categories.current);
        }else{
            console.log("no categories");
        }
    } catch (error) {
        console.log('ERROR ERROR', error, 'ERROR ERROR');
    }
   
}
