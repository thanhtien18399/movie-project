//  set up absolute path
// import Home from "featurns/booking/pages/Home";
// import Payment from "featurns/booking/pages/Payment";
// import Detail from "featurns/booking/pages/Detail";
// import Signin from "featurns/authentication/pages/SignIn";
// import Signup from "featurns/authentication/pages/SignUp";
// import MovieManagement from "featurns/movies/pages/MovieManagement";
// import Booking from "featurns/booking/pages/Booking";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Header from "common/components/Header";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProfileAction } from "featurns/authentication/utils/action";
import { AuthRoute, PrivateRoute } from "./guard";
import { lazy } from "react";
import { Suspense } from "react";

const Home =lazy(()=>import("featurns/booking/pages/Home"))
const Payment=lazy(()=>import("featurns/booking/pages/Payment"))
const Detail=lazy(()=>import("featurns/booking/pages/Detail"))
const Signin=lazy(()=>import("featurns/authentication/pages/SignIn"))
const Signup=lazy(()=>import("featurns/authentication/pages/SignUp"))
const MovieManagement=lazy(()=>import("featurns/movies/pages/MovieManagement"))
const Booking=lazy(()=>import("featurns/booking/pages/Booking"))

 



// import payNotFound from "common/404";
//guard
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfileAction)
  }, [])
  return (
    <BrowserRouter>
      <Header></Header>
      <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/booking" component={Booking} />
        <Route path="/payment" component={Payment} />
        <Route path="/detail/:id" component={Detail} />
        <AuthRoute
          path="/signin"
          component={Signin}
          redirectPath="/" />
        <AuthRoute
          path="/signup"
          component={Signup}
          redirectPath="/" />
        {/* <Route path="/signin" component={Signin}/> */}
        <PrivateRoute path="/movies" component={MovieManagement} />
        {/* <Route path="*" component={payNotFound} /> */}
        <Redirect to="/" />
      </Switch>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

//optimize performance :
//+ img ,virtualize data (pagination ,long list ), lazy loading,  
//+ kiểm soát component render (shouldComponentUpdate), useMemo ,usecallback
//+ production build

//redux tookit + typescript