import React from "react";
import posed from "react-pose";
import styled from "styled-components";

const Notification = posed.div({
    visible: { opacity: 1 },
    hidden: { opacity: 0 }
})

const StyledNotification = styled(Notification)`
    text-align: center;
    padding: 5px 10px; 
    border-radius:15px;
    position: fixed;
    bottom: 20px;
    z-index: 9999;
    width: 100%;
    left: 0px;
`;

const LoadingPostNotification = ({ isVisible }) => (
    <StyledNotification
        pose={isVisible ? 'visible' : 'hidden'}
    >
        <div className="ui segment" style={{ background:'#2185d0', border:'none', boxShadow:'none', marginBottom:'0px', display:'inline-block', marginLeft:'auto', marginRight:'auto' }}>
            <div className="ui active small inverted inline loader"></div> <span style={{ color:'#fff', marginLeft: '10px' }}>Loading for more posts</span>
        </div>
    </StyledNotification>
)

export default LoadingPostNotification