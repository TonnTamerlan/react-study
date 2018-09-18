import React from 'react';

import Auxwrap from '../../hoc/Auxwrap';
import classes from './Layout.css'

const layout = (props) => (
    <Auxwrap>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={classes.Content}>{props.children}</main>
    </Auxwrap>
);

export default layout;