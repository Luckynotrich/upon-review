// create-review.jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserContext from '../contexts/user-context';
import { useCatsQuery } from '../contexts/current-cats-context';

import { createReview } from '../../utils/future-self-api.js';
import ReviewForm from './review-form';
import ReviewCategory from './review-category.jsx';
function CreateReview() {
    const { userId } = useContext(UserContext);
    const queryClient = useQueryClient();
    const createReviewMutation = useMutation({
        mutationFn: async (data) => await createReview(data, catId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['reviews', userId],
            });
        },
    });
    return (  
        <div>
            <ReviewCategory />
            <ReviewForm submit={createReviewMutation}/>
            {/* {catId &&  <ReviewForm pros={catState.pros} cons={catState.cons} setCatState={setCatState}/>} */}
        </div>
    );
}

export default CreateReview;
