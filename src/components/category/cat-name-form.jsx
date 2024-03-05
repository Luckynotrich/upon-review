import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import Select from '../review/select.jsx'
import Header from '../header.jsx';
import Button from '@mui/material/Button';

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
      <Header ID={'category-title'} title={'Category'} />
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
              <span style={{ color: `${YELLOW}`, fontSize: '1.5rem' }}>
                ' {name}' &nbsp;&nbsp; is in use. &nbsp; &nbsp; &nbsp; Click
                'Edit' button to change this category.
              </span>
            ) : errors.name ? (
              <span style={{ color: 'red', fontSize: '1.5rem' }}>
                {errors.name.message}{' '}
              </span>
            ) : name.length > 3 ? (
              <span style={{ color: 'green', fontSize: '1.5rem' }}>
                {name} -- is available
              </span>
            ) : (
              'create / edit a category'
            )}
          </h4>
          <fieldset>
            <section style={{display: 'flex', flexFlow: 'row'}}>
            <input
              type="text"
              autoFocus
              className="center"
              aria-describedby="create category name"
              id="name"
              {...register('name', {
                required: 'This is required',
                minLength: {
                  value: 4,
                  message: 'A minimum 4 characters is required.',
                },
              })}
              placeholder="Category name"
              onFocus={() => "this.placeholder=''"}
              onBlur={() => "this.placeholder=''"}
            ></input>
            <Button sx={{border:'5px solid orange'}}type="button"><span className="material-symbols-outlined">edit</span></Button>
            </section>
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
          </fieldset>
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
