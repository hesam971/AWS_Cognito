import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import userpool from '../userpool';

export const authenticate = (Email, Password) => {
    return new Promise((resolve, reject) => {
        const user = new CognitoUser({
            Username: Email,
            Pool: userpool
        });

        const authDetails = new AuthenticationDetails({
            Username: Email,
            Password
        });

        user.authenticateUser(authDetails, {
            onSuccess: (result) => {
                console.log("login successful");
                resolve(result);
            },
            onFailure: (err) => {
                console.log("login failed", err);
                reject(err);
            }
        });
    });
};

export const logout = () => {
    const user = userpool.getCurrentUser();
    if (user) {
        user.signOut();
        window.location.href = '/';
    }
};

export const getCurrentUserAttributes = () => {
    return new Promise((resolve, reject) => {
        const user = userpool.getCurrentUser();
        if (user) {
            user.getSession((err, session) => {
                if (err) {
                    reject(err);
                } else {
                    user.getUserAttributes((err, attributes) => {
                        if (err) {
                            reject(err);
                        } else {
                            const userAttrs = {};
                            attributes.forEach(attr => {
                                userAttrs[attr.Name] = attr.Value;
                            });
                            resolve(userAttrs);
                        }
                    });
                }
            });
        } else {
            reject(new Error("No current user"));
        }
    });
};
