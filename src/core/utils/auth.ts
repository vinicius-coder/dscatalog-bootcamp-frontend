import jwtDecode from 'jwt-decode';
import history from './history';

export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID ??  'dscatalog';
export const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET ?? 'dscatalog123';

type LoginResponse = {
    access_token: string
    expires_in: number
    scope: string
    token_type: string
    UserFirsName: string
    userId: number
}

export type Role = 'ROLE_OPERATOR' | 'ROLE_ADMIN';

type AccessToken = {
    exp: number,
    user_name: string,
    authorities: Role[];
}

export const saveSessionData = (loginResponse: LoginResponse) => {
    localStorage.setItem('authData', JSON.stringify(loginResponse));
}

export const getSessionData = () => {
    const sessionData = localStorage.getItem('authData') ?? '{}';
    const parsedSessionData = JSON.parse(sessionData);

    return parsedSessionData as LoginResponse;
}

export const getAcessTokenDecoded = () => {
    const sessionData = getSessionData();

    try {
        const tokenDecode = jwtDecode(sessionData.access_token);
        return tokenDecode as AccessToken;
    }catch(error){
        return {} as AccessToken;
    }
}

export const isTokenValid = () => {
    const { exp } = getAcessTokenDecoded();

    return Date.now() <= exp * 1000;
}

export const isAuthenticated = () => {
    const sessionData = getSessionData();
    return sessionData.access_token && isTokenValid();
}

export const isAllowedByRole = (routeRoles: Role[] = []) => {

    if (routeRoles.length === 0) {
        return true;
    }

    const { authorities } = getAcessTokenDecoded();

    return routeRoles.some(role => authorities?.includes(role));
}

export const logout = () => {
    localStorage.removeItem('authData');
    history.replace('/auth/login');
}