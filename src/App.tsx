import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import './App.css';
import Home from './routes/Home/home';
import Root from './components/root/root';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      {/* <Route path='callback' element={<Callback setTokenExpiresIn={setTokenExpiresIn} setToken={setToken} />} /> */}
  </Route>
));


function App() {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [token, setToken] = useState(localStorage.getItem('spotify_access_token'));
  // const [tokenExpiresIn, setTokenExpiresIn] = useState(localStorage.getItem('spotify_access_token_expiry'));

  // useEffect(() => {
    
  //   console.log(`Token: ${token}`);
  //   console.log(`Expiry: ${tokenExpiresIn}`);
  
  // }, [token, tokenExpiresIn]);


  // useEffect(() => {
    
  //   if(tokenExpiresIn !== null) {
  //     const timeout = setTimeout(() => {
  //       localStorage.removeItem('spotify_access_token');
  //       localStorage.removeItem('spotify_access_token_expiry');
  //       alert('Your session has expired, please log in again!');
  //       setToken(null);
  //       setTokenExpiresIn(null);
  //     }, tokenExpiresIn);
  
  //     return () => clearTimeout(timeout);
  //   }
  // }, [tokenExpiresIn]);
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;