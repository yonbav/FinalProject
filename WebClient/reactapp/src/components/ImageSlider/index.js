import React, { Component } from 'react';
import kravitz_1 from './images/kravitz_1.jpg';
import kravitz_2 from './images/kravitz_2.png';
import kravitz_3 from './images/kravitz_3.jpg';

class ImageSlider extends Component {
    render() {
        const c_height = 500;
        const c_width = 800;
        const c_interval = 10000;

        return (
            <div id="carouselExampleIndicators" className="carousel slide image-slider-fixed" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-interval={c_interval}>
                        <img src={kravitz_1} alt="slide_pic_1" className="d-block w-100" height={c_height} width={c_width}/>
                    </div>
                    <div className="carousel-item" data-interval={c_interval}>
                        <img src={kravitz_2} alt="slide_pic_2" className="d-block w-100" height={c_height} width={c_width}/>
                    </div>
                    <div className="carousel-item" data-interval={c_interval}>
                        <img src={kravitz_3} alt="slide_pic_3" className="d-block w-100" height={c_height} width={c_width}/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>)
    }
}

export default ImageSlider