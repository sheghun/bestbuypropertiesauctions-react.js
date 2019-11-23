import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingPage = () => {
    return (
        <div
            style={{
                width: '100vw',
                position: 'absolute',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <CircularProgress />
        </div>
    );
};

export default LoadingPage;
