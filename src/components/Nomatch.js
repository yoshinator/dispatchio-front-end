import React from 'react'

export default function Nomatch({location}) {
  return (
    <div>
      {"404 Man not found :( localhost:3000" + location.pathname}
    </div>
  )
}