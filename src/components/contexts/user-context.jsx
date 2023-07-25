import React,{ createContext, useState } from 'react';

 const UserContext = createContext();
 export const UserContextProvider = ({ children }) => {
    const [userId, setUserId] = useState('11d6af03-20ac-4f04-a21c-28ec418a2c18');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');

    const providerProps = {userId, setUserId, userName, setUserName, 
        userEmail, setUserEmail, userPassword, setUserPassword};

        return (
            <UserContext.Provider value={providerProps}>
            {children}
            </UserContext.Provider>
        )
 }
    export default UserContext;

    // const userId = '11d6af03-20ac-4f04-a21c-28ec418a2c18';/* lucky */
// const userId = '92285056-ac27-4e03-a719-e19c36d87ae2'; /* luckier */
// const userId = '3d99966d-b1ad-4ea4-bcdd-49062f2f3f1f'; /* luckiest */
// insert into public.user(user_name, email, password) values ('luckiest', 'luckiest@lucky.com', 'luckies');//'3d99966d-b1ad-4ea4-bcdd-49062f2f3f1f'  