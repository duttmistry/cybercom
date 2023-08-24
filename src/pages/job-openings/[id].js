import * as React from "react"

import { useState } from "react";
import { useRef } from "react";
import * as urls from "../../utils/urls"
import axios from "axios"
import { useEffect } from "react";
import isEmail from "validator/lib/isEmail";
import { Modal, Spinner } from "react-bootstrap";
import Recaptcha from "react-google-invisible-recaptcha"
import { siteKey } from "../../utils/config"
import Layout from "@/components/App/Layout";
import PageBanner from "@/components/common/PageBanner";
import Footer from "@/components/App/Footer";
import Navbar from "@/components/App/Navbar";
import Head from "next/head";


var _jobObject;
var _jobFile;
var _hrmsObject;

function ProductCatchAll(props) {
  // console.log(props.jobdata,"check job data")
  const job = props?.jobdata;
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [currentJob, setCurrentJob] = useState(null)
  const [jobDetails,setJobDetails] = useState(null)
  const recaptchaRef = useRef(null)
  // const [parserLoading,setParserLoading]=useState(false)
  const [jobSnippet,setJobSnippet]=useState(null)
  // const [resumeParserData,setResumeParserData]=useState({
  //   file:null,
  //   data:null,
  // })
  // const [isResumeParsed,setIsResumeParsed]=useState(false)
  const [isLoading,setIsLoading]=useState(false)
  const [applyFormData, setApplyFormData] = useState({
    appliedFor: "",
    name:"",
    email:"",
    phone: "",
    experiance: "",
    noticePeriod: "",
    linkedInProfile:"",
    skypeId:"",
    githubProfile:"",
    PortfolioWebsite:"",
    resume: null,
    fileName: null,
  })
  const [error,setError]=useState({phone:"",file:"",email:"",name:''})

  useEffect(()=>{
   if(job?.jobDescription)
   {
     setJobDetails(job.jobDescription)
   }
  },[job])


  const handleApplyJob = e => {
    console.log(applyFormData, "on apply")
    setIsOpenModal(true)
    setCurrentJob(e.target.name)
    setApplyFormData({ ...applyFormData, appliedFor: e.target.name })
  }
  const fileChangeHandler = event => {
 
    // setResumeParserData({data:null,file:event.target.files[0]})
    // setIsResumeParsed(false)
    const file = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0],
    }
    setApplyFormData({
      appliedFor: "",
      name:"",
      email:"",
      phone: "",
      experiance: "",
      noticePeriod: "",
      linkedInProfile:"",
      skypeId:"",
      githubProfile:"",
      PortfolioWebsite:"",
      resume:file,
      fileName: event.target.files[0].name,
    })
    if( event.target.files[0] && event.target.files[0].size > 1048576 )
    {
     setError({...error,file:'File should be less then 1mb'})
    }else{
     setError({...error,file:""})
    }
  }


const handlePhoneChange = (e) =>{
  if(e.target.value!=="" && e.target.value.length !== 10 ){
      setError({...error,phone:"Please Enter 10 Digit Phone Number"})
  }else if(e.target.value === ""){
    setError({...error,phone:"Mobile Number Required"})
  }else{
    setError({...error,phone:""})
  }
  setApplyFormData({
    ...applyFormData,
    phone: e.target.value,
  })
}


const handleEmailChange =(e)=>{
  setApplyFormData({
    ...applyFormData,
    email: e.target.value,
  })
  if (e.target.value!=="" && !isEmail(e.target.value)) {
    setError({...error,email:'Please Enter Valid Email Address'});
 }else if(e.target.value===""){
      setError({...error,email:"Email Required"})
 }else{
     setError({...error,email:''})
 }
}
const handleSendMessage = async e => {
  console.log(applyFormData,"job apply form data")
    e.preventDefault()
    

      const {
      name,
      email,
      phone,
      experiance,
      noticePeriod,
      linkedInProfile,
      githubProfile,
      PortfolioWebsite,
      appliedFor,
      resume,
    } = applyFormData
    // let form = document.getElementById(currentJob)


    if (!name){
      setError({...error,name:'Name Required'})
      recaptchaRef.current.reset();
      return false
    }else if(!email){
      setError({...error,email:'Email Required'})
      recaptchaRef.current.reset();
      return false
    }else if(!phone){
      setError({...error,phone:'Mobile Number Required'})
      recaptchaRef.current.reset();
      return false
    }else if(!resume){
      setError({...error,file:'Resume Required'})
      recaptchaRef.current.reset();
      return false
    }else{
       await recaptchaRef.current.execute();
    }

  
    let finalData = {
      name,
      email,
      phone,
      experiance,
      noticePeriod,
      linkedInProfile,
      githubProfile,
      PortfolioWebsite,
      appliedFor,
    }
    _jobObject=finalData
    Object.freeze(_jobObject)
    _jobFile=resume.data
    Object.freeze(_jobFile)

    const nameArray=name.includes(" ") ? name.split(" ") : name
    let HRMS_data = {
        name: name,
        firstName:name.includes(" ") ? nameArray[0] : name,
        lastName :name.includes(" ") ? nameArray[1] : null, 
        email: email,
        contactNumber: phone,
        totalExperience: experiance,
        noticePeriod:noticePeriod ,
        linkedIn:linkedInProfile ,
        github:githubProfile,
        PortfolioWebsite:PortfolioWebsite,
        appliedFor: appliedFor,
        candidateJobs: [{jobId:job.hrmsId,jobSource:"Cybercom Website"}],
        is_from_web:1
      
      }
      _hrmsObject=HRMS_data
      Object.freeze(_hrmsObject)

    //  setIsLoading(true)
     
    
  }

  const onResolved = async()=>{
    setIsLoading(true)
    let formData = new FormData()
    formData.append("data",JSON.stringify(_jobObject))
    formData.append("files.file", _jobFile)

    await axios({
      method: "post",
      url: urls.job,
      data: formData,
    })
      .then((res) => {
        console.log(res,"applied successfully")
        // console.log(JSON.stringify(data))
        setApplyFormData({})
      })
      .catch(error => {
        console.log(error)
        // setIsLoading(false)
      })

      // let formData1 = new FormData()
      // formData1.append("name",_hrmsObject.name)
      // formData1.append("firstName",_hrmsObject.firstName)
      // formData1.append("lastName",_hrmsObject.lastName)
      // formData1.append("email",_hrmsObject.email)
      // formData1.append("contactNumber",_hrmsObject.contactNumber)
      // formData1.append("totalExperience",_hrmsObject.totalExperience)
      // formData1.append("noticePeriod",_hrmsObject.noticePeriod)
      // formData1.append("linkedIn",_hrmsObject.linkedIn)
      // formData1.append("github",_hrmsObject.github)
      // // formData1.append("skype","skype id")
      // formData1.append("PortfolioWebsite",_hrmsObject.PortfolioWebsite)
      // formData1.append("appliedFor",_hrmsObject.appliedFor)
      // formData1.append("candidateJobs",JSON.stringify(_hrmsObject.candidateJobs))
      // formData1.append("is_from_web",_hrmsObject.is_from_web)

      // // formData1.append("data",JSON.stringify(_hrmsObject))
      // formData1.append("candidateResume", _jobFile)
      
      // await axios.post(urls.HRMS_add_candidate,formData1,{headers:
      //   { "module" : "candidates",
      //   "type" : "create",
      //   "id" : "null"}}) .then((res) => {
      //   console.log(res,"added in hrms successfully")
      //   // console.log(JSON.stringify(data))
      //   setApplyFormData({})
      //   setIsLoading(false)
      // })
      .catch(error => {
        console.log(error)
       setIsLoading(false)
      })
     setIsOpenModal(false)
  }

  

  const workLocation = (location)=>{
    if(location === "workFromOffice"){
      return "Work From Office (Ahmedabad)"
    }else if(location === 'hybrid'){
      return "Hybrid"
    }else if(location === 'remote'){
      return "Remote"
    }return location
   
  }

  const checkValidation=()=>{
    if(error.email!=="" || error.phone!=="" || error.file!=="" ||error.name!=="" ){
      return true
    }
    return false
  }

  // const handleResumeParsing=async(e)=>{
  //   e.preventDefault()
  //   e.stopPropagation()
  //   if(!applyFormData.resume){
  //     setError({...error,file:"please add Resume"})
  //   }else{
  //     setParserLoading(true)
  //     const formData=new FormData()
  //     formData.append("file",resumeParserData.file)

  //     await axios.post(urls.resume_parser_url,formData)
  //     .then((res)=>{
  //       const resData=res.data.data
  //      const mobileNumber =resData?.mobile[0]
  //       const data = mobileNumber.split('+91 ' || "+91")
        
  //       setApplyFormData({
  //         ...applyFormData,
  //         name: resData?.full_Name!== " " ? resData.full_Name :"",
  //         email: resData?.email!== " " ? resData.email:"",
  //         phone: resData?.mobile!== " " ? mobileNumber : "",
  //         experiance: resData?.total_exp!== " " ?  resData?.total_exp :"",
  //         noticePeriod: resData?.notice_period!== " " ? resData?.notice_period :"",
  //         linkedInProfile:resData?.social_links?.linkdin!== " " ? resData?.social_links?.linkdin : "",
  //         githubProfile:resData?.social_links?.github!== " " ? resData?.social_links?.github :"",
  //         PortfolioWebsite:resData?.social_links?.portfolio!== " " ?  resData?.social_links?.portfolio : "",
          
  //       })
  //       setParserLoading(false)
  //       setIsResumeParsed(true)
  //     }).catch((err)=>{
  //       setParserLoading(false)
  //       setError({...error,file:"please add valid File"})
  //     })
  //   }
   
  // }

  let jobSnippetData={
    "@context" : "https://schema.org/",
    "@type" : "JobPosting",
    "title" :`${job?.heading}`,
    "description" : `${job.jobDescription}`,
    "identifier": {
      "@type": "PropertyValue",
      "name": "Google",
      "value": "1234567"
    },
    "datePosted" :`${ job?.created_at}`,
    "validThrough" : `${job?.lastDate}`,
    "employmentType" : `${job?.workType.charAt(0).toUpperCase() + job?.workType.slice(1)}`,
    "hiringOrganization" : {
      "@type" : "Organization",
      "name" : "Cybercom Creation",
      "sameAs" : "https://react.cybercomcreation.com/",
      "logo" : "https://react.cybercomcreation.com/images/logo.png"
    },
    "jobLocation": {
    "@type":"Place",
      "address": {
      "@type": "PostalAddress",
      "streetAddress": "B-303-06, The First",
      "addressLocality": "Near ITC Narmada,Vastrapur",
      "addressRegion": "Ahmedabad",
      "postalCode": "380015",
      "addressCountry": "India"
      }
    },

  }
  useEffect(()=>setJobSnippet(jobSnippetData),[])
  return (
    <>     
    <Head>
    <script type="application/ld+json">
   { JSON.stringify(jobSnippet)}
    </script>
    </Head>
          
      <Layout pageName="services">
      <Navbar/>
      <PageBanner /> 
      
    <div className="job-block-description container ">
    <div className="page-title-content mb-3">
                  <h2>{job?.heading}</h2>
              </div>
      <div className="sub-job-block-description">
      
      <div className="job-description">
        <p className="career-description" dangerouslySetInnerHTML={{__html:jobDetails}} />
      </div>
      <div className="job-block">
        <ul>
          <li>
            <p>Job Title</p>
            <span>: </span>
            <b>&nbsp;{job?.heading}</b>
          </li>
          <li>
            <p>Experience</p>
            <span>: </span>
            <b>&nbsp;{job?.workExperience}</b>
          </li>
          <li>
            <p>No Of Position</p>
            <span>: </span>
            <b>&nbsp;{job?.currentOpening}</b>
          </li>
          <li>
            <p>Location</p>
            <span>:</span>
            <b>&nbsp;{workLocation(job?.location)}</b>
          </li>
        </ul>
       
      </div>
      
      </div>
      <div className="button-part d-flex align-items-center justify-content-center mt-3 mb-2">
        <a  className="default-btn d-flex align-items-cente justify-content-center" style={{cursor:'pointer', padding:'12px 25px 12px 25px'}}
            value={job?.heading}
            name={job?.heading}
            onClick={handleApplyJob}
        >Apply Now
          </a>
      </div>
    </div>

    <Modal
        show={isOpenModal}
        onHide={() => setIsOpenModal(false)}
        size="lg"
        className="applyNowModal"
      >
         {isLoading && <div className="job-apply-spinner"><Spinner animation="border" variant="warning" /></div> }
        <Modal.Header closeButton className="px-4">
          <Modal.Title>
            Apply Job For <span>{currentJob}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4">

          <div className="career-form">
         
            <form
              method="post"
              onSubmit={handleSendMessage}
              id={currentJob}
              name={currentJob}
            >
              <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <h5>Upload Resume</h5>
                </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="form-group mb-0">
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        accept=".docx,.pdf"
                        name="resume"
                        id="customFile"
                        onChange={fileChangeHandler}
                      />
                      <label className="custom-file-label " htmlFor="customFile">
                        {applyFormData.fileName
                          ? applyFormData.fileName
                          : "Attached cv/resume (*PDF, docx only)"}
                      </label>
                      <lable className="browse">Choose File</lable>
                      <span style={{ 
                                              // fontWeight: 'bold',
                                              color: 'red',
                                              fontSize:'14px',
                                              marginTop:"10px"
                                          }}>{error.file!=="" ? error.file : ""}</span>
                    </div>
                   
                  </div>
                  <div className="submit-resume mb-3" >
                    {/* <div>

                    <p className="resume-parser-msg">Resume parser will automatically scan your resume and pre-fill the form data. Please review the data carefully and make any necessary changes before submitting your application. </p>
                    </div>
                    <div>
                        <button  className="default-btn mt-2"  onClick={handleResumeParsing}>Submit</button>                     
                    </div> */}
                  </div>
                  {/* { parserLoading && <div className="wait-autofill">
                    <span>Please Wait..</span>
                    <Spinner animation="border" variant="warning" />                     
                  </div> } */}
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <h5>Personal Details</h5>
                  </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      value={applyFormData.name}
                      onChange={e =>{
                        if(e.target.value!==""){
                          setError({...error,name:""})
                        }else{
                          setError({...error,name:"Name Required"})
                        }
                        setApplyFormData({
                          ...applyFormData,
                          name: e.target.value,
                        })
                      }
                        
                      }
                      className="form-control"
                      placeholder="Full Name"
                      // disabled={!isResumeParsed}
                    />
                    <span style={{  color: 'red',
                                              fontSize:'14px',
                                              marginTop:"10px"
                                          }}>{error.name!=="" ? error.name : ""}</span>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="form-group">
                    <input
                      type="text"
                      name="email"
                      value={applyFormData.email}
                      onChange={handleEmailChange}
                      className="form-control"
                     
                      placeholder="Email Address"
                      // disabled={!isResumeParsed}
                    />
                     <span style={{  color: 'red',
                                              fontSize:'14px',
                                              marginTop:"10px"
                                          }}>{error.email!=="" ? error.email : ""}</span>
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="form-group">
                    <input
                      type="number"
                      name="phone"
                      value={ applyFormData?.phone}
                      // {resumeParserData.data?.mobile ? resumeParserData.data?.mobile : applyFormData.phone }
                      onChange={handlePhoneChange}
                      className="form-control"
                     
                      placeholder="Mobile Number"
                      // disabled={!isResumeParsed}
                    />
                     <span style={{  color: 'red',
                                              fontSize:'14px',
                                              marginTop:"10px"
                                          }}>{error.phone!=="" ? error.phone : ""}</span>
                  </div>
                </div>

                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="form-group">
                    <input
                      type="no"
                      name="experiance" 
                      value={applyFormData.experiance}
                      // resumeParserData.data?.experience ? resumeParserData.data.experience :
                      onChange={e =>
                        setApplyFormData({
                          ...applyFormData,
                          experiance: e.target.value,
                        })
                      }
                      className="form-control"
                      placeholder="Technical Experience"
                      // disabled={!isResumeParsed}
                    />
                  </div>
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="form-group">
                    <input
                      type="no"
                      name="noticePeriod"
                      value={applyFormData.noticePeriod}
                      onChange={e =>
                        setApplyFormData({
                          ...applyFormData,
                          noticePeriod: e.target.value,
                        })
                      }
                      className="form-control"
                      placeholder="Notice Period"
                      // disabled={!isResumeParsed}
                    />
                  </div>
                </div>
              

                {/* social links */}
                {/* <div className="row"> */}
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <h5>Social Network and Web Links</h5>
                  </div>
                {/* </div> */}
                 <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="form-group">
                    <input
                      type="text"
                      name="social"
                      value={applyFormData.linkedInProfile}
                      onChange={e =>
                        setApplyFormData({
                          ...applyFormData,
                          linkedInProfile: e.target.value,
                        })
                      }
                      className="form-control"
                      placeholder="LinkedIn Profile"
                      // disabled={!isResumeParsed}
                    />
                  </div>
                </div>
                 {/* <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="form-group">
                    <input
                      type="text"
                      name="social"
                      value={applyFormData.skypeId}
                      onChange={e =>
                        setApplyFormData({
                          ...applyFormData,
                          skypeId: e.target.value,
                        })
                      }
                      className="form-control"
                      placeholder="SkypeId"
                    />
                  </div>
                </div> */}
                <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="form-group">
                    <input
                      type="text"
                      name="GitHub"
                      value={applyFormData.githubProfile}
                      onChange={e =>
                        setApplyFormData({
                          ...applyFormData,
                          githubProfile: e.target.value,
                        })
                      }
                      className="form-control"
                      placeholder="GitHub Profile"
                      // disabled={!isResumeParsed}
                    />
                  </div>
                </div>
                 <div className="col-lg-6 col-md-12 col-sm-12">
                  <div className="form-group">
                    <input
                      type="text"
                      name="social"
                      value={applyFormData.PortfolioWebsite}
                      onChange={e =>
                        setApplyFormData({
                          ...applyFormData,
                          PortfolioWebsite: e.target.value,
                        })
                      }
                      className="form-control"
                      placeholder="Portfolio Website (Behance, dribble etc.)"
                      // disabled={!isResumeParsed}
                    />
                  </div>
                </div>
              
              </div>
              

              <div className="button-part d-flex align-items-center mt-3 mb-2">
                <button
                  className="default-btn"
                  // disabled={isLoading}
                  type="submit"
                  disabled={checkValidation()}
                >
                  Apply
                  <span></span>
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
     <Recaptcha
                 ref={recaptchaRef}
                 sitekey={siteKey}
                 onResolved={onResolved} 
                 style={{position:"fixed"}}
              />
      <Footer footer={props.footer} />
      </Layout>
    </> 
  )
}

export default ProductCatchAll
// export const Head = () => <title>{window.history?.state?.job}</title>;
export async function getServerSideProps(context){
  try {
    const footer = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}address`);
    const jobdata = await fetch(`${process.env.NEXT_PUBLIC_GRAPHQL_API_URL}job-openings/${context.params.id}`);
    
    
    return {
      props: {
        footer: await footer.json(),
        jobdata: await jobdata.json()
      },
    };
  } catch (error) {
    return {
      status: 500,
      headers: {},
      props: {},
    };
  }
}


