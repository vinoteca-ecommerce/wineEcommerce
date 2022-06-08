import React, {useState} from 'react'
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = ({onSearch}) => {
  const [value, setValue] = useState('');


  const handleSearchValue = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!value){
      return alert('Por Favor escribe el nombre del vino que buscas')
    } else{
      console.log(value)
    onSearch(value)
    setValue('')
    }
  }
 return (
<>
     <form className='searchform' onSubmit={handleSubmit} style={{display:'block',marginTop:'1.6em', width:'190px'}}>
                <input
                style={{width:'190px'}}
                onChange={handleSearchValue}
                value={value}
                type='search'
                placeholder='Buscar vino...'
                />
                <Button sx={{mt:'.5em'}} fullWidth size="small" variant="contained" type='submit'>Buscar <SearchIcon sx={{ml:'5px'}}/></Button>
            </form>
</>
 )
}
