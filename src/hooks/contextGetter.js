import { useContext } from 'react';
import { AppContext } from '../components/appstate';

//custom hook  - context api
export default function useContextGetter() {

    const context = useContext(AppContext)
    return context;
}