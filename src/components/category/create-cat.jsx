import React, { useState, useEffect, useContext,useRef } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../utils/error-fallback.jsx';

import { useMutation, useQueryClient } from '@tanstack/react-query';
// import {useFormContext,FormProvider,useForm} from 'react-hook-form';

import UserContext from '../contexts/user-context.jsx';
import { useCatsQuery } from '../contexts/current-cats-context.jsx';

import CatNameForm from './cat-name-form.jsx';
import NewCatForm from './new-cat-form-static.jsx';
import CatModForm from './cat-mod-form.jsx';

export default function CreateCat() {
  const { userId } = useContext(UserContext);
   
  const { data: cats } = useCatsQuery(userId);

  const _cat = useRef();
  const [catName, setCatName] = useState('');
  const [inUse, setInUse] = useState(false);
  const [sent, setSent] = useState(false);



  return (
    <div>
      {!sent && <CatNameForm  setCatName={setCatName} cats={cats} _cat={_cat} setInUse={setInUse} inUse={inUse} setSent={setSent} sent={sent}/>}
      {!inUse && catName && (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <NewCatForm userId={userId} catName={catName} />
        </ErrorBoundary>
      )}
      {inUse && _cat.current.id && sent &&(
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <CatModForm  catId={_cat.current.id} />
        </ErrorBoundary>
      )}
    </div>
  );
}
