import React, { useEffect, useState } from 'react';

function LightBoxProductsDetails(props) {

    useEffect(()=>{
    },[])

    const [dataImage, setDataImage] = useState(props.data[0].filename)
    const [indexImage, setindexImage] = useState(0)

    function nextImage() {
        if (indexImage === props.data.length -1) {
            setindexImage(0);
            setDataImage(props.data[0].filename);
        } else {
            setDataImage(props.data[indexImage+1].filename);
            setindexImage(indexImage+1);
        }
    }
    function previousImage() {
        if (indexImage === 0) {
            setDataImage(props.data[props.data.length -1].filename);
            setindexImage(props.data.length -1);
        } else {
            setDataImage(props.data[indexImage-1].filename);
            setindexImage(indexImage-1);
        }
    }
    
    return (
        <div className='div-lightbox'>
            <img src={'http://localhost:4000/uploads/imagesUsersProfil/' + dataImage}></img>
            {props.data.length > 1 ? 
            <div className='d-flex justify-content-between align-items-end'>
                <i role={"button"} onClick={previousImage} className="fa fa-solid fa-angle-left rigthImage"></i> 
                <p className='mt-3'>{indexImage+1}/{props.data.length}</p>
                <i role={"button"} onClick={nextImage} className ="fa fa-solid fa-angle-right leftImage"></i>
            </div> : ''}
        </div>
    );
}

export default LightBoxProductsDetails;