import React from 'react'
import Button from '@mui/material/Button'

export default function UrlButton({url}) {
  
    if(!(url.includes('http') || url.includes('www'))) 
        url = `https:\\www.${url}`
        return (
          <Button
            href={url}
            target="_blank"
            size="medium"
            variant="outlined"
          >
            <span className="material-symbols-outlined">Forward</span>
          </Button>
        )
       
  
  }

  
