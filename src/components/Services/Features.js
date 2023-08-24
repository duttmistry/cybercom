import React from 'react'

const Features = (props) =>{
       const {features}= props.features
   
    

    return(
        <section className="features-services-section">
            <div className='container'>
                <div className="row">
                    {
                        features.map((feature,i)=> <div key={i} className="custom-flex-grid">
                        {/* <div className="single-solutions-box features-services">
                            <div className="icon">
                                <i>
                                    <img src={feature?.icon?.url} alt="feature-image"></img>
                                    
                                </i>
                            </div>
                            <h6>{feature.title}</h6>
                        </div> */}
                    </div>
                            )
                        
                    }        
                </div>
            </div>
        </section>
    )
}
export default Features