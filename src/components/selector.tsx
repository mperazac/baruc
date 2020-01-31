import React, { useState } from "react"
import AsyncSelect from "react-select/async"
import { options, verses } from "../data/sins"
import { createFilter, ValueType } from "react-select"

interface ISelectorProps {}

const Selector: React.FunctionComponent<ISelectorProps> = props => {
  const [inputValue, setInputValue] = useState()

  const filterColors = (inputValue: string) => {
    return options
  }

  const loadOptions = (
    inputValue: string,
    callback: (options: any) => void
  ) => {
    setTimeout(() => {
      callback(filterColors(inputValue))
    }, 300)
  }

  const handleOnChange = (
    option: ValueType<{ label: string; value: string }>
  ) => {
    setInputValue(option)
    
  }
  
  console.log(verses[inputValue ? inputValue.value : 1]);
  return (
    <>
      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        filterOption={createFilter({
          ignoreCase: true,
          ignoreAccents: true,
          trim: true,
          matchFrom: "start",
        })}
        noOptionsMessage={() => "Dale, escribílo"}
        value={inputValue}
        onChange={handleOnChange}
        isClearable
      />
      {inputValue && (
        <div>
          <h3>Haz roto el mandamiento: {verses[inputValue.value].verse}</h3>
          <div>{verses[inputValue.value].text}</div>
        </div>
      )}
    </>
  )
}

export default Selector
