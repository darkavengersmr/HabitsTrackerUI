import AppHeader from "../components/app-header";
import LoginRegisterForm from "../components/login-register-form";

function RegisterPage() {
  return (
    <>
        <AppHeader AppHeaderComponents={[]}/>
        <LoginRegisterForm register={true}/>
    </>    
  );
}

export default RegisterPage;