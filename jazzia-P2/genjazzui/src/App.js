import {
  SignedIn,
  SignedOut,
  UserButton,
  useUser
} from "@clerk/clerk-react";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import SignInPage from "./SignInPage";
import SmartphoneFrame from "./components/SmartphoneFrame";
import { Link } from "react-router-dom";
import WebserviceTestForm from "./WebserviceTest";

function UserProfile() {
  const { user } = useUser();

  if (!user) return null;

  return (
    <div>
      <img
        src={user.imageUrl}
        alt="avatar"
        style={{ width: 80, borderRadius: "50%" }}
      />

      <h2>{user.firstName} {user.lastName}</h2>
      <p>{user.primaryEmailAddress.emailAddress}</p>
    </div>
  );
}

function Home() {
  return (
    <SmartphoneFrame>
      <SignedOut>
        <h2>You are not signed in</h2>
        <Link to="/sign-in">Sign In</Link>
      </SignedOut>

      <SignedIn>
        <UserButton />
        <WebserviceTestForm/>
      </SignedIn>
    </SmartphoneFrame>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in/*" element={<SignInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;