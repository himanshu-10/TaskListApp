import { useLayoutEffect } from "react";
import { useHistory } from "react-router";
import useContextGetter from "./contextGetter";

function useLoggedIn() {

    const context = useContextGetter();
    const history = useHistory();

    //stop flicker caused by DOM mutation when user is logged in and wants to move from/to page
    useLayoutEffect(() => {
        if (context.state.isUserLoggedIn) {
            //move to notes page on login
			history.push('/notes');
		}
    }, [context.state, history])
}

export default useLoggedIn;