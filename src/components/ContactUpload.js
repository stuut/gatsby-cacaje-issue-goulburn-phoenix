import React, {useState, useCallback} from 'react';
import {useDropzone} from 'react-dropzone'
import Recaptcha from "react-google-recaptcha";
import fileIcon from '../../static/file-empty.png'

var JSZip = require("jszip");


const FileUpload = () => {

  const [name,setName] = useState('');
  const [status,setStatus] = useState('SEND MESSAGE');
  const [phone,setPhone] = useState('');
  const [message,setMessage] = useState('');
  const [attachment, setFile] = useState({});
  const [recaptcha, setRecaptcha] = useState('');
  const [imageFiles, setFiles] = useState([]);



  const onDrop = useCallback(acceptedFiles => {
    setFiles([]);

    const zip = new JSZip();

    setFiles(acceptedFiles);

    acceptedFiles.forEach((attachment) => zip.file(attachment.name, attachment));

    zip.generateAsync({ type: 'blob' }).then((blob) => {
      const zippedFiles = new File([blob], 'attachments.zip', {
        lastModified: Date.now(),
        type: 'application/zip'
      });

     setFile(zippedFiles);
    });
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})




  const encode = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((k)=>{
      formData.append(k,data[k])
    });
    return formData
  }


  const handleSubmit = e => {
    e.preventDefault();
    if (recaptcha === ""){
        alert("please check recaptcha");
        return false;
    }else{
      sendForm();
    }
  };


const sendForm = () => {
  setStatus("Sending Form, please wait");
  const data = { "form-name": "contact-multiple-file-upload", name, phone, message, 'g-recaptcha-response': recaptcha, attachment };
  const postUrl = '/?no-cache=1';

  fetch(postUrl, {
    method: "POST",
    // headers: { "Content-Type": 'multipart/form-data; boundary=random' },
    body: encode(data)
  })
    .then(() => {
      setStatus("Form Submission Successful!!");
      setName('');
      setPhone('');
      setMessage('');
      setFile({});
      setFiles([]);
      setRecaptcha('');
    })
    .catch(error => setStatus("Form Submission Failed!"));
}



  const handleChange = e => {
    const {name, value} = e.target
    if (name === 'name' ){
      return setName(value)
    }
    if (name === 'phone' ){
      return setPhone(value)
    }
    if (name === 'message' ){
      return setMessage(value)
    }
  }

const handleRecaptcha = value => {
  return setRecaptcha(value);
};


const removeFiles = () => {
  setFile({});
  setFiles([]);
};

const recaptchaRef = React.createRef();



const removeButton = {
  color:'white',
  background:'red',
  outline:'0',
  borderRadius:'0',
  border: '0px',
  padding: '10px',
  marginTop: '10px',
  cursor: 'pointer',
};




  return (

    <div className="contactForm">
    <form
    name="contact-multiple-file-upload"
    onSubmit={handleSubmit}
    action="/thanks/"
    data-netlify="true"
    data-netlify-recaptcha="true"
    data-netlify-honeypot="bot-field"
    >
    <input name="form-name" value="contact-multiple-file-upload" type="hidden" />
    <p hidden>
      <label>
        Don’t fill this out:{" "}
        <input name="bot-field" onChange={handleChange} />
      </label>
    </p>
          <input   style={{
            padding: '10px',
            width: '100%',
            fontSize: '1rem',
            outline: '0',
            marginTop:'15px',
            border: '1px solid #e3e3e3',
            font: 'inherit',
          }}
          type="text"
          name="name"
          placeholder="Full Name"
          value={name}
          onChange={handleChange}
          required/>

          <input
          style={{
            padding: '10px',
            width: '100%',
            fontSize: '1rem',
            outline: '0',
            marginTop:'15px',
            border: '1px solid #e3e3e3',
            font: 'inherit',
          }}
          type="phone"
          name="phone"
          placeholder="Phone or email"
          value={phone}
          onChange={handleChange}
          required
          />


          <textarea
          style={{
            padding: '10px',
            width: '100%',
            fontSize: '1rem',
            outline: '0',
            minHeight: '250px',
            resize: 'vertical',
            marginTop:'15px',
            border: '1px solid #e3e3e3',
            font: 'inherit',
          }}
          name="message"
          placeholder="Message"
          value={message}
          onChange={handleChange}
          required
          />
          <input
          style={{
            display:'none',

          }}
            type="file"
            name="attachment"
            id="attachment"
          />
          <section>
            <div style={{outline:'0'}}{...getRootProps()}>
               <input {...getInputProps()} />
               {
                 isDragActive ?
                   <p style={{marginBottom:'15px', border: '3px dashed rgb(143, 199, 68)', padding: '10px', cursor:'pointer'}}>Drop the files here ...</p> :
                   <p style={{marginBottom:'15px', border: '3px dashed #e3e3e3', padding: '10px', cursor:'pointer'}}>Drag 'n' drop photographs or a copy of your article here, or click here to select files</p>
               }
             </div>
             {imageFiles.length > 0 ? <div>
                 <div>
                 {
                   imageFiles.map((file, index) => {
                     return(
                       <div style={{marginTop:'5px'}} key={index}><img style={{width: '22px',display: 'inline-block',marginRight: '5px',verticalAlign: 'middle'}} src={fileIcon} alt="like post"/><span style={{fontSize:'.9em'}}>{file.name}</span></div>
                     )
                   }
                 )}
                 </div>
                 <button style={removeButton} onClick={removeFiles}>Remove Files</button>
              </div> : null}
            </section>
           <div style={{margin:'0 auto', width: '310px', marginTop: '25px'}}>
             <Recaptcha
              ref={recaptchaRef}
              sitekey={process.env.GATSBY_SITE_RECAPTCHA_KEY}
              onChange={handleRecaptcha}
              required
            />
          </div>
          <p>
            <button
              style={{
                margin: '25px auto',
                background: '#8fc744',
                color: '#ffffff',
                outline: '0',
                border: '0',
                WebkitAppearance: 'none',
                display: 'block',
                padding: '15px',
                textTransform: 'uppercase',
                fontSize: '1rem',
                minWidth: '200px',
              }}
            type="submit">{status}</button>
          </p>
        </form>
    </div>
  );
}

export default FileUpload;
