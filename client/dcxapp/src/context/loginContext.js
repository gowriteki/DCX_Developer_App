import React from'react';

const LoginContext = React.createContext({
    user:null,//initially no user logged in
    updateUser:(newUser) => {},
});

export default LoginContext;