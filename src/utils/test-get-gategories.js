import getCategories from './get-categories.js';
const testGetCategories = async () => {
    let categories = [];
   await getCategories('11d6af03-20ac-4f04-a21c-28ec418a2c18', categories);
    console.log('\n','testGetCategories = ', await categories);
}
testGetCategories();