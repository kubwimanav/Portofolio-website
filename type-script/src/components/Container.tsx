import React from 'react'
type styleprops = {
    style:any
}
export const Container =(props:styleprops)=> {
  return (
    <div >
      <p style={props.style}>hello</p>
    </div>
  )
}

