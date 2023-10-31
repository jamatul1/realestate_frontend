import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import SignIn from "./pages/signin/signIn";
import SignUp from "./pages/signup/signUp";
import NotLoggedInRoutes from "./routes/NotLoggedInRoutes";
import LoggedInRoutes from "./routes/LoggedInRoutes";
import ProfileUpdate from "./pages/profileUpdate/profileUpdate";
import AddProperty from "./pages/addProperty/addProperty";
import NewHomes from "./pages/newHomes/newHomes";
import PropertyDetails from "./pages/propertyDetails/propertyDetails";
import SearchResult from "./pages/searchResults/searchResults";
import Blogs from "./pages/blogs/blogs";
import AgentProfile from "./pages/agentProfile/agentProfile";
import UpdateProperty from "./pages/updateProperty/updateProperty";
import AllProperties from "./pages/allProperties/allProperties";
function App() {
  return (
    <>
      <Routes>
        <Route element={<NotLoggedInRoutes />}>
          <Route path="auth/signup" element={<SignUp />} exact />
          <Route path="auth/signin" element={<SignIn />} exact />
        </Route>
        <Route element={<LoggedInRoutes />}>
          <Route path="profile" element={<Profile />} exact />
          <Route path="profile/update" element={<ProfileUpdate />} exact />
          <Route
            path="/properties/update/:id"
            element={<UpdateProperty />}
            exact
          />
          <Route path="/addProperty" element={<AddProperty />} exact />
          <Route path="/agent/:id" element={<AgentProfile />} exact />
        </Route>

        <Route path="/" element={<Home />} exact />
        <Route path="/buy" element={<Home />} exact />
        <Route path="/rent" element={<Home isBuy={false} />} exact />
        <Route path="/newHomes" element={<NewHomes />} exact />
        <Route path="/explores" element={<AllProperties />} exact />
        <Route path="/blogs" element={<Blogs />} exact />
        <Route
          path="/property/:propertyId"
          element={<PropertyDetails />}
          exact
        />
        <Route path="/property/search" element={<SearchResult />} exact />
      </Routes>
    </>
  );
}

export default App;
