import React from 'react'
import './postBody.css'
import carIcon from '../../static/car-icon.svg'
import bathIcon from '../../static/bath-icon.svg'
import bedIcon from '../../static/beds-icon.svg'

const PostBody = props => {
  console.log('props.body', props.body)
return (
<div className={`body ${props.post ? 'post': ''}`}>
  {props.address &&
   <p style={{fontWeight:'600', borderBottom:'0px', paddingBottom:'0px', margin:'0em 0 1em 0', fontSize:'1.6rem'}}>{props.address}</p>
  }

{props.body &&
  <div
  dangerouslySetInnerHTML={{
    __html: props.body.childMarkdownRemark.html,
  }}
/>
}
  <div style={{display:'flex'}}>
    {props.beds &&
    <div style={{display:'flex', alignItems:'center', marginBottom:'30px'}}><img style={{width:'50px'}} src={bedIcon} alt="how many beds"/>
    <h5 style={{marginRight:'20px', marginLeft:'10px'}}>{props.beds}</h5>
    </div>
    }
    {props.baths &&
    <div style={{display:'flex', alignItems:'center', marginBottom:'30px'}}><img style={{width:'50px'}} src={bathIcon} alt="how many baths"/>
    <h5 style={{marginRight:'20px', marginLeft:'10px'}}>{props.baths}</h5>
    </div>
    }
    {props.carSpaces &&
    <div style={{display:'flex', alignItems:'center', marginBottom:'30px'}}><img style={{width:'50px'}} src={carIcon} alt="how many car spaces"/>
    <h5 style={{marginRight:'20px', marginLeft:'10px'}}>{props.carSpaces}</h5>
    </div>
    }
  </div>

{props.price &&
<h4>{props.price}</h4>
}
</div>
  )

}

export default PostBody
