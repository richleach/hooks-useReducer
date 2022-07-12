//Instead of using useState() for passing a large amount of state variables try using 
//useReducer() instead. Plus, it works a lot like redux/redux-toolkit which is always
//a good thing to practice. 

import { useReducer } from 'react';

//a simple trick so when you type 'ACTION.' you'll get autocomplete. Avoids typing errors.
const ACTION = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  NEW_USER_INPUT: 'newUserInput',
  TG_COLOR: 'tgColor'
}

//reducer takes state and action (for payload).
//Don't forget to spread in current state or you'll wipe out everything else.
const reducer = (state, action) => {
  switch (action.type) {
    case ACTION.INCREMENT:
      return { ...state, count: state.count + 1 };
    case ACTION.DECREMENT:
      return { ...state, count: state.count - 1 };
    case ACTION.NEW_USER_INPUT:
      return { ...state, userInput: action.payload };
    case ACTION.TG_COLOR:
      return { ...state, color: !state.color };
    default:
      throw new Error();
  }
}

function App() {
  //initalize the call to use useReducer with state and dispatch (just like using useState's myState, setMyState)
  const [state, dispatch] = useReducer(reducer, { count: 0, userInput: '', color: false })

  return (
    <main className="App" style={{ color: state.color ? '#FFF' : '#FFF952' }}>
      <input
        type="text"
        value={state.userInput} //how you reference anything in the current state in useReducer (think "getter")
        onChange={(e) => dispatch({ type: ACTION.NEW_USER_INPUT, payload: e.target.value })} //setting state (think "setter")
      />
      <br /><br />
      <p>{state.count}</p>
      <section>
        <button onClick={(() => dispatch({ type: ACTION.DECREMENT }))}>-</button>//dont build a local function then call it, just dispatch the reducer
        <button onClick={(() => dispatch({ type: ACTION.INCREMENT }))}>+</button>
        <button onClick={(() => dispatch({ type: ACTION.TG_COLOR }))}>Color</button>
      </section>
      <br /><br />
      <p>{state.userInput}</p>
    </main>
  );
}

export default App;
