import React from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import Button from '@mui/material/Button';
import style from './ProductsPagination.module.css'

export const ProductsPagination = ({setPage,page, totalPage}) => {

    const handleChange = (page)=>{
        setPage(page);
        window.scroll(0,0);
    }

  return (
    <>  
            {totalPage === 1 ? page
            : page > 1 && page < totalPage ?
                <div style={{display:"flex",justifyContent:"center",alignItems:"center", padding:"1em"}}>
                    <Button  style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px'}} onClick={()=>handleChange((totalPage-totalPage)+1)}><FirstPageIcon fontSize='small'/></Button>
                    <Button  style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px'}} onClick={()=>handleChange(page-1)}><ChevronLeftIcon fontSize='small'/></Button>
                    <p style={{padding:'.5em'}}>{page} de {totalPage}</p>
                    <Button  style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px'}} onClick={()=>handleChange(page+1)}><ChevronRightIcon fontSize='small'/></Button>
                    <Button  style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px'}}onClick={()=>handleChange(totalPage)}><LastPageIcon fontSize='small'/></Button>
                </div>
            : page <= 1 ?
                <div style={{display:"flex",justifyContent:"center",alignItems:"center", padding:"1em"}}>
                    <p style={{padding:'.5em'}}>{page} de {totalPage}</p>
                    <Button  style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px'}}onClick={()=>handleChange(page+1)}><ChevronRightIcon fontSize='small'/></Button>
                    <Button  style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px'}} onClick={()=>handleChange(totalPage)}><LastPageIcon fontSize='small'/></Button>
                </div> 
            : page >= totalPage &&
                <div style={{display:"flex",justifyContent:"center",alignItems:"center", padding:"1em"}}    >
                    <Button  style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px'}}onClick={()=>handleChange((totalPage-totalPage)+1)}><FirstPageIcon fontSize='small'/></Button>
                    <Button style={{maxWidth: '35px', maxHeight: '35px', minWidth: '35px', minHeight: '35px'}} onClick={()=>handleChange(page-1)}><ChevronLeftIcon fontSize='small'/></Button>
                    <p style={{padding:'.5em'}}>{page} de {totalPage}</p>
                </div>
            }
    </>
  )
}

