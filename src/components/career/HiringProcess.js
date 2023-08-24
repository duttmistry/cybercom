import React from 'react'

const HiringProcess = ({HiringProcess}) => {
    

  const {heading,description,hiringFeatures}= HiringProcess

  return (
    <div className='HiringProcess-section'>
    <div className='container'>
      <div className="section-title">
          {/* <span className='sub-title'>{title}</span> */}
          <h2>{heading}</h2>
          <p>{description}</p>
      </div>
      <div className='HiringProcess-steps'>
          <div className='row'>
              {hiringFeatures.map((feature,i)=><div className='col-md-3' key={i}>
                  <div className="Process-step">
                      <div className="icon">
                          <img src={feature?.icon?.url} alt="stepiconOne"></img>
                      </div>
                      <h3>{feature.heading}</h3>
                      <p>{feature.feature}</p>
                  </div>
              </div>)}
          </div>
      </div>
    </div>
  </div>
  )
}

export default HiringProcess
