import React from 'react'

type HomeProps = {
  color?: any
}

function Home(props: HomeProps){
  return <div style={{backgroundColor: props.color || 'teal'}}>{'type exports work'}</div>
}

export {Home, HomeProps}