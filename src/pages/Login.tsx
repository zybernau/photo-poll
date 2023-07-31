import { useRealmApp } from "../Realm";
import * as Realm from 'realm-web';

import './Login.css';
import { useHistory } from "react-router";
import { useState } from "react";
import { IonButton, IonCard, IonContent, IonInput, IonItem, IonLabel, IonLoading, IonPage } from "@ionic/react";

export function Login() {

    const history = useHistory();
    const app = useRealmApp();
    const [isRegistering, setRegistering] = useState(false);
    const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (isRegistering) {
            await register();
            return;
        }
        await login();
        return;
    };

    const login = async () => {
        try {
            setLoading(true);
            await app.logIn!(
                Realm.Credentials.emailPassword(loginInfo.email, loginInfo.password)
            );
            setLoading(false);
            history.push('/home');
        } catch (e: any) {
            console.log(e);
        }
    };
    const register = async () => {
        try {
            await app.emailPasswordAuth!.registerUser(
                loginInfo
            );
            await login();
        } catch (e: any) {
            console.log(e);
        }
    };

    return (
        <IonPage className="login-page">
            <IonContent>
                {loading ? <IonLoading isOpen={loading} /> : null}
                <form onSubmit={handleSubmit}>
                    <IonCard>
                        <IonItem>
                            <IonLabel position="stacked">Email</IonLabel>
                            <IonInput
                                type="email"
                                autocomplete="email"
                                value={loginInfo.email}
                                onIonChange={(e) =>
                                    setLoginInfo({ ...loginInfo, email: e.detail.value! })
                                }
                            />
                        </IonItem>

                        <IonItem>
                            <IonLabel position="stacked">Password</IonLabel>
                            <IonInput
                                type="password"
                                value={loginInfo.password}
                                autocomplete="current-password"
                                onIonChange={(e) =>
                                    setLoginInfo({ ...loginInfo, password: e.detail.value! })
                                }
                            />
                        </IonItem>
                    </IonCard>
                    {isRegistering ? (
                        <>
                            <IonButton expand="block" fill="clear" type="submit">
                                Register
                            </IonButton>
                            <IonButton
                                expand="block"
                                fill="clear"
                                onClick={() => setRegistering(false)}
                            >
                                Already Registered?
                            </IonButton>
                        </>
                    ) : (
                        <>
                            <IonButton expand="block" fill="clear" type="submit">
                                Login
                            </IonButton>
                            <IonButton
                                expand="block"
                                fill="clear"
                                onClick={() => setRegistering(true)}
                            >
                                Registered
                            </IonButton>
                        </>
                    )}
                </form>
            </IonContent>
        </IonPage>
    );
}