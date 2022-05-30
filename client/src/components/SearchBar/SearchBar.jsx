import React, {useState} from 'react'

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
<div>
     <form className='searchform' onSubmit={handleSubmit}>
                <input className='input' 
                onChange={handleSearchValue}
                value={value}
                type='search'
                placeholder='Buscar vino...'>
                </input>
                <button type='submit'>Buscar</button>
            </form>
</div>
 )
}
