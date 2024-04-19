import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Select from '../review/select.jsx'
import Header from '../header.jsx';

import DataListInput from './data-list-input.jsx';

// import CircularColor from '../spinner.jsx';

export default function CreateCatName({
  submit,
  setCatName,
  catName,
  cats,
  _cat,
  setInUse,
  inUse,
  setSent,
  sent,
}) {
  const [loading, setLoading] = useState(false);

  const [YELLOW] = useState('#FAFA37');

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors, isDirty, isSubmitSuccessful },
    reset,
    watch,
    setError,
    
  } = useForm({
    defaultValues: {
      name: '',
    },
  });
  const name = watch('name');

  let catNames = [];
  let error;

  if (cats) {
    cats.map((cat) => {
      let localCatName = cat.name;
      let name2;
      if (localCatName) name2 = localCatName.toLocaleLowerCase().trim();
      catNames.push(name2);
    });
  }

  useEffect(() => {
    let localCatName = name.toLocaleLowerCase().trim();
    if (name.length > 3 && catNames.includes(localCatName)) {
      setInUse(true);
      cats.find((cat) => {
        cat.name.toLocaleLowerCase().trim() === localCatName &&
          (_cat.current = cat);
      });
    } else {
      setInUse(false);
    }
  }, [name]);

  useEffect(() => {
    setLoading(false);
  }, [catName]);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  function submit(data) {
    setCatName(name);

    reset();
  }
  return (
    <div>
      {/* <header> */}
      <Header ID={'category-title'} title={'Category'} />
      {/* </header> */}
      {!sent && (
        <form
          onSubmit={handleSubmit(submit)}
          id="catName"
          method="post"
          action="send"
          encType="multipart/form-data"
        >
          <h4 id="nameLable" className="nameLable left">
            {name.length > 3 && inUse ? (
              <span className="alt-color-2"style={{fontSize: '1.2rem' }}>
                ' {name}' &nbsp;&nbsp; is in use. <br/>{/*} &nbsp; &nbsp; &nbsp; */}
                <span style={{color: '#f66809', fontSize: '1.2rem'}}> 
                Use the button to edit it.</span>
                </span>
            ) : errors.name ? (
              <span style={{ color: 'red', fontSize: 'h4' }}>
                {errors.name.message}{' '}
              </span>
            ) : name.length > 3 ? (
              <span style={{ color: 'green', fontSize: 'h4' }}>
                {name} -- is available
              </span>
            ) : (
              'create / edit a category'
            )}
          </h4>
          <section className="catName">
            {cats && <DataListInput register={register}  categories={cats} />}
            <input
              type="submit"
              id="submitButton"
              className="create"
              value={!inUse ? 'Create' : 'Edit'}
              onClick={(event) => {
                setCatName(name);
                setSent(true);
                setLoading(true);
                reset();
              }}
            ></input>
          </section>
        </form>
      )}
      {loading && <p>Loading.....</p>}

      {!loading && error && <p className="errMsg">{error.msg}</p>}

      {isSubmitSuccessful && !error && !inUse && (
        <p>{`title: ${name?.name} was saved successfully`}</p>
      )}
    </div>
  );
}
