const getAuthUserInfo = () => {
    const isAuthUser = JSON.parse(sessionStorage.getItem('user'));
    return isAuthUser ? isAuthUser : '';
}

export default getAuthUserInfo;