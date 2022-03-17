import './App.css';
import Navbar from './component/navbar';
import Home from './component/home';
import {Switch,Route} from 'react-router-dom';
import Products from './component/products';
import Product from './component/product';
function App() {
  return (
  <> 
   <Navbar/>
  <Switch>
    <Route exact path="/" component={Home}/>
    <Route exact path="/Products" component={Products}/>
    <Route exact path="/Products/:id" component={Product}/>
  </Switch>
  </>
  );
}

export default App;
