import axios from './future-self-api.js'
export default (async function getCategories (userId,_categories){
    let error = null;
    try {
        let res = await axios.get('/api/category-api/'+ userId,{
            error,
            headers:{accept: 'application/json',}
        }
        );
        _categories.current = await res.data
        
        // if (_categories.current.length > 0) {
        //     console.log("getCategories", _categories.current);
        // }else{
        //     console.log("no categories");
        // }
    } catch (error) {
        console.log('ERROR ERROR', error, 'ERROR ERROR');
    }
   
})
