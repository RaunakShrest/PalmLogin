// import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom'
import HomePage from './pages/HomePage';
import Register from './pages/Register';
import Login from './pages/Login';
import viewRecords from './pages/viewRecords';
import viewRecordsReact from './pages/viewRecordsReact';
function App() {
  return (
    <div className="App">
      <Route path="/" component={Register} exact/>

<Route path="/login" component={Login} exact/>
<Route path="/viewRecords" component={viewRecords} exact/>
 <Route path="/viewRecordsReact" component={viewRecordsReact} />

    
    </div>



  );
}

export default App;

