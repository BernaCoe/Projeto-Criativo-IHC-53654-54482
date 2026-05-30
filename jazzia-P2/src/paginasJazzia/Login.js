import { SignIn } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { FundoLogin, BotaoNormal, BarraSuperiorDashboard } from "../componentesReact/componentesGlobais"; 


function Login() {
  const navigate = useNavigate();

  return (
    <div className="pagina-conteudo">
        <BarraSuperiorDashboard/>
      <FundoLogin style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}> 
        <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '100%'
        }}>
          
          <SignIn 
            forceRedirectUrl="/estudio" 
            signUpUrl="/registo" 
          />
        </div>
      </FundoLogin>
    </div>
  );
}

export default Login;