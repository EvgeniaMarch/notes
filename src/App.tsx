import './App.css';

import MainPage from './features/mainPage/MainPage';

function App() {
  // const [count, setCount] = useState(0);
  // const notes = useAppSelector((state) => state.mainPageSlice);
  // console.log('notes', notes);

  // const { addNote } = mainPageSlice.actions;
  // const dispatch = useAppDispatch();
  // const notes = useSelector((state) => state.notes);
  // const note = useSelector((state) => console.log(state));

  return (
    <>
      <div>
        <MainPage />
      </div>
    </>
  );
}

export default App;
