import React from 'react'
import Button from '@mui/material/Button'

export default function UrlButton({url,sx}) {
  
    if(!(url.includes('http') || url.includes('www'))) 
        url = `https:\\www.${url}`
        return (
          <Button
            href={url}
            target="_blank"
            size="medium"
            variant="text"
            sx={{sx}}
          >
            <span className="material-symbols-outlined">link</span>
          </Button>
        )
       
  
  }

  
