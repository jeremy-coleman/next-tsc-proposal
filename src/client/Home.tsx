import React from 'react'

type HomeProps = {
  color?: any
}

function Home(props: HomeProps){
  let style: CSSProperties = {
    backgroundColor: props.color || 'teal'
    }
  return <div style={style}>{'type exports workz'}</div>
}

export {Home, HomeProps}