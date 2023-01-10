import React, { useState } from 'react';

function useModal() {
    const [isShowing, setIsShowing] = useState();
    function toggle() {
        setIsShowing(!isShowing);
    }
    return {
        isShowing,
        toggle
    };
}

export default useModal;