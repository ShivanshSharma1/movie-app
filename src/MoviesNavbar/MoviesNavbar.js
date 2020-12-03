import { AppBar, ClickAwayListener, Fab, Grow, Hidden, IconButton, makeStyles, MenuItem, MenuList, Paper, Popper, Toolbar, Typography, useScrollTrigger, Zoom } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Scrollchor from 'react-scrollchor';


const useStyles2 = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

function ScrollTop(props) {
    const { children, window } = props;
    const classes = useStyles2();
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = (event) => {
        const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

        if (anchor) {
            anchor.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    );
}

const MoviesNavbar = () => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }


    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);



    return (
        <div style={{ backgroundColor: "rgb(25,25,25" }} id='moviesnavbar'>
            <AppBar position="static" style={{ backgroundColor: "rgb(25,25,25" }}>
                <Toolbar>
                    <Hidden smUp>
                        <IconButton
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            style={{ color: 'white' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                <MenuItem onClick={handleClose}><Link to='/trending' style={{ color: "black", textDecoration: 'none' }}>Trending</Link></MenuItem>
                                                <MenuItem onClick={handleClose}><Link to='/categories' style={{ color: "black", textDecoration: 'none' }}>Categories</Link></MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </Hidden>
                    <Typography variant="h5" >
                        Movies
                    </Typography>
                    <Hidden xsDown>
                        <Typography variant='h6' style={{ color: "white", marginLeft: '10px', marginTop: '1px' }}>
                            <Link to='/trending' style={{ color: "white", textDecoration: 'none' }}>Trending</Link>
                        </Typography>
                        <Typography variant='h6' style={{ color: "white", marginLeft: '10px', marginTop: '4px' }}>
                            <Link to='/categories' style={{ color: "white", textDecoration: 'none' }}>Categories</Link>
                        </Typography>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Scrollchor to='moviesnavbar'>
                <ScrollTop>
                    <Fab color="secondary" size="small" aria-label="scroll back to top">
                        <KeyboardArrowUpIcon />
                    </Fab>
                </ScrollTop>
            </Scrollchor>
        </div>

    )
}

export default MoviesNavbar;