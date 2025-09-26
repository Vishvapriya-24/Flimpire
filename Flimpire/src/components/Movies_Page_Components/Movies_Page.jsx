import { useState } from 'react';
import Nav from './Navigation';
import Subscribe from './Subscribe';

function Movies_Page() {
    const [showSubscribe,setShowSubscribe] = useState(false);
    return (
        <div>
            <Nav setShowSubscribe={setShowSubscribe}/> 
            {showSubscribe && <Subscribe />}
        </div>

    );
}

export default Movies_Page;