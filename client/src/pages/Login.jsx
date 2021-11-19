import React, { useState, useEffect } from 'react';
import {
    Button,
} from 'semantic-ui-react';

import { buildURI } from '../utils/apiHelpers';
import { getUserInfo } from '../utils/apiWrapper';

const LOGIN_SUCCESS_QUERY_PARAM = 'success';

// A custom hook that builds on useLocation to parse the query string for you.
const useQuery = () => new URLSearchParams(window.location.search);

function Login({ setUser }) {
    const [showError, setShowError] = useState(false);
    const didLoginSucceed = useQuery().get(LOGIN_SUCCESS_QUERY_PARAM);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const resp = await getUserInfo();

            if (resp.status !== 200) {
                setShowError(true);
            }
            else {
                setShowError(false);
                setUser(resp.data.result);
            }
        };

        if (didLoginSucceed === 'true') {
            fetchUserInfo();
        }
    }, [didLoginSucceed, setUser]);

    return (
        <div>
            <h1 textAlign="center" size="lg" fontWeight="extrabold">
                Welcome to Étude <span role='img' aria-label="books">📚</span>
            </h1>
            <a
                href={buildURI(
                'auth/login',
                `http://localhost:3000?${LOGIN_SUCCESS_QUERY_PARAM}=true`,
                `http://localhost:3000?${LOGIN_SUCCESS_QUERY_PARAM}=false`
                )}
            >
                <Button >
                    <p>
                        Sign in to Study
                    </p>
                </Button>
            </a>
            <p>
                Use the email registered in our{' '}
                <a
                href="https://members.h4i.app"
                >
                memberDB tool
                </a>
            </p>
            {showError && (
                <div>
                    Authentication failure. Try a different email.
                </div>
            )}  
        </div>
    );
  }
  
export default Login;
