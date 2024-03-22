import React from 'react';

import {  
    GroupContainer,
    FormInputContainer,
    FromInputLabel
} from './form-input.styles'

const FormInput = ({handleChange, label, ...props}) => (
    <GroupContainer className='group'>
        <FormInputContainer onChange={handleChange} {...props}/>
        {
			// if the pointer is placed on the input form, the place holder will be shrink
            label 
            ? (
            <FromInputLabel className={props.value.length ? 'shrink' : ''} {...props}>
                {label}
            </FromInputLabel>
            )
            : null
        }
    </GroupContainer>
)

export default FormInput;
