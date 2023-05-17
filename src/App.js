import { BrowserRouter, Switch, Route } from "react-router-dom";
//import components
import AppState from "./components/appstate"; //allow use of context
import Navbar from "./components/navbar";
import Notes from "./components/notes";
import Form from "./components/form";
//import pages
import Register from "./pages/Register";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Home from './pages/Home';
import Note from "./pages/Note";

function App() {

  return (
    <BrowserRouter>
      <AppState>

        <Navbar /> 

        <Switch>

          <Route exact path='/'>
            <Home />
          </Route>

          <Route exact path='/login'>
            <Login />
          </Route>

          <Route exact path='/register'>
            <Register />
          </Route>

          <Route exact path='/notes'>
            <Notes />
          </Route>

          <Route exact path='/note-item'>
            <Note />
          </Route>

          <Route exact path='/form'>
            <Form />
          </Route>

          {/* move to 404 error page if issue arises */}
          <Route>
            <Error />
          </Route>

        </Switch>
      </AppState>
    </BrowserRouter>
  )
}

export default App;