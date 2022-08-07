import React, { useState } from "react";

interface TValidateTypes {
  [key: string]: {
    re: RegExp,
    errorBorderColor: string
  }
}

interface IUseInput {
  value: string
  isInvalid: boolean
  errorBorderColor: string
  onChange: (e: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void
  onBlur: () => void
  clearValue: () => void
}

const useInput = (initial: string, validateType: string): IUseInput => {

  // validateType: positiveNumber, notNullText, password

  const validateTypes: TValidateTypes = {
    positiveNumber: {
      re: /^\d*[1-9]\d*$/,
      errorBorderColor: 'red.300',
    },
    notNullText: {
      re: /^(.+){3,128}$/,
      errorBorderColor: 'crimson',
    },   
    password: {
      re: /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/,
      errorBorderColor: 'crimson',
    },
    email: {
      re: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      errorBorderColor: 'crimson',
    },
  }

  const [value, setValue] = useState(initial);
  const [isInvalid, setIsInvalid] = useState(false);
  const [errorBorderColor, setErrorBorderColor] = useState("");

  const validateInput = () => {

    var isInvalid = false;

    for (let thisType in validateTypes) {            
      if (validateType === thisType && 
          !String(value).match(validateTypes[thisType].re)
        ) {
        setIsInvalid(true);
        setErrorBorderColor(validateTypes[thisType].errorBorderColor);  
        isInvalid = true;        
      }
    }

    if (!isInvalid) {
      setIsInvalid(false);
      setErrorBorderColor("");      
    }    
  }

  let result: IUseInput = {
    value,
    isInvalid,
    errorBorderColor,
    onChange: (e: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
      var target = e.target as HTMLSelectElement
      setValue(target.value)      
      validateInput()
    },
    onBlur: validateInput,
    clearValue: () => setValue("")
  }

  if (validateType === 'required' && !value) {
    result['isInvalid'] = true;
  } else if (validateType === 'required' && value) {
    result['isInvalid'] = false;
  } else if (validateType !== '') {
    result['errorBorderColor'] = errorBorderColor;
  }

  return result;
};

export default useInput