import React,{useEffect, useContext} from 'react';
import { useForm} from 'react-hook-form';
// import "../scss/App.css"
import CategoryContext from './contexts/category-context';
import UserContext from './contexts/user-context';

import {useAxios} from './hooks/use-axios'
import axios from '../utils/_axios-programming-interface.js'


export default function CatForm(/* props */) {
    const { categories, addCategory} = React.useContext(CategoryContext);
    const { register, handleSubmit, formState, formState: {errors, isDirty,isSubmitSuccessful}, reset, watch} = useForm({defaultValues:{catName: "",
    pro1:"",pro2:"",pro3:"",pro4:"",pro5:"",con1:"",con2:"",con3:"",con4:"",con5:""}} );
    const { userId } = useContext(UserContext);
    const [data, error, loading, axiosFetch] = useAxios();
    
    
    const catName = watch("catName");
    
     const onSubmit = async (data) => {
        
        await axiosFetch({
            axiosInstance: axios,
            method: 'post',
            url: '/api/category-api/addNew/?',
            requestConfig: {
                    data,
                    userId,
                    headers: {'Content-Type': 'multipart/form-data'}    
            },
        });
        addCategory(response.data)
    }
    useEffect(() => {
        if(formState.isSubmitSuccessful)reset()}, [formState,reset]);
    
    return (
        <div className="container">
        
                    <h1>Category</h1>

            <form onSubmit={handleSubmit(onSubmit,error)}
             id='category' method="post" action="send" encType="multipart/form-data">

                <h4 id="nameLable" className="nameLable left">Name</h4>
                <p>{categories.map((cat)=>{catName == cat.name?'Name is in use':catName})}</p>
                <p>{errors.catName?.message}</p>
                <input 
                    type="text"
                    autoFocus className="center"
                    aria-describedby="Category name"
                    id="catName" {...register("catName",{required: 'A minimum 4 characters is required.', minLength: 4})}
                    placeholder="Category name"
                    onFocus={() => "this.placeholder=''"}
                    onBlur={() => "this.placeholder=''"}
                    // onChange={(value)=> {categories.includes(value)?'Name in use':''} }
                    >
                </input>
                <h4 className="left">Pros</h4>

                <input type="text" {...register("pro1")} id="pro1" className="center" placeholder="I like..."></input>

                <input type="text" {...register("pro2")} id='pro2' className="center" placeholder="I like..."></input>

                <input type="text" {...register("pro3")} id='pro3' className="center" placeholder="I like..."></input>

                <input type="text" {...register("pro4")} id='pro4' className="center" placeholder="I like..."></input>

                <input type="text" {...register("pro5")} id='pro5' className="center" placeholder="I like..."></input>


                <h4 className="left">Cons</h4>


                <input type="text" {...register("con1")} id='con1' className="center" placeholder="I don't like..."></input>

                <input type="text" {...register("con2")} id='con2' className="center" placeholder="I don't like..."></input>

                <input type="text" {...register("con3")} id='con3' className="center" placeholder="I don't like..."></input>

                <input type="text" {...register("con4")} id='con4' className="center" placeholder="I don't like..."></input>

                <input type="text" {...register("con5")} id='con5' className="center" placeholder="I don't like..."></input>

                <input type="submit" id="submitButton" className='create' /* onClick={() => {}} */ defaultValue="Create"></input>
            </form>
            {loading && <p>Loading...</p>}

{!loading && error && <p className="errMsg">{error.msg}</p>}

{isSubmitSuccessful && !error && data.title && <p>{`title: ${data?.title} was saved successfully`}</p>}
        </div>
    );
}
