import AppHeader from "../components/app-header";
import LoginRegisterForm from "../components/login-register-form";

function LoginPage() {
  return (
    <>
        <AppHeader AppHeaderComponents={[]}/>
        <LoginRegisterForm register={false}/>
    </>    
  );
}

export default LoginPage;