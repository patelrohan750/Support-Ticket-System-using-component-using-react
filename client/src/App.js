import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import SideBar from './Components/Sidebar/SideBar';
import {Switch,Route} from 'react-router-dom'
import Ticket from './Pages/Ticket/Ticket';
import Navbar from './Components/Navbar/Navbar';
import TicketDetails from './Pages/TicketDetails/TicketDetails';
function App() {
  return (
    <div className="App">
    <Navbar/>

    <div className="row">
      <div className="col-md-3">
      <SideBar/>
      </div>
      <div className="col-md-9">
      <div className="container">
      <Switch>
       <Route exact path='/ticket' component={Ticket} />
       <Route exact path='/ticket/:id' component={TicketDetails} />
     </Switch>
      </div>
     
      </div>
    </div>
     
    </div>
  );
}

export default App;
