import React from 'react'

function contentHead(props) {
  return (
    <div>
      <div className="categoryHead">
        <img src={props.url} alt="" />
        <span>{props.name}</span>
        <input type="text" placeholder="Search ..."/>
        <button>Add new</button>
      </div>
    </div>
  )
}

export default contentHead
