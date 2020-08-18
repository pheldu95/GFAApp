import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

//when a page is loaded, it automatically scrolls to the top. so doesnt start half way down or something
//this component will wrap around the App component in index.tsx
const ScrollToTop = ({ children, location: { pathname } }: any) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return children || null;
};

export default withRouter(ScrollToTop);