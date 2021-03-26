import * as React from 'react';

function ServiceDetailPage(props) {

    const { id } = props.match.params;
    
    console.log("-----------------------------------------------------------------------", id);
    return <div>ServiceDetailPage<span>{id}</span></div>
}

export {ServiceDetailPage};