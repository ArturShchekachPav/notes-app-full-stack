import Select, {components} from 'react-select';
import {Controller} from 'react-hook-form';
import dropdownIcon from '../../images/dropdownIcon.svg';
import './SelectInput.css';

export default function SelectInput({control, options, name, onChange}) {
    const DropdownIndicator = (DropdownIndicatorProps
    ) => {
        return (
            <components.DropdownIndicator {...DropdownIndicatorProps}>
                <img
                    src={dropdownIcon}
                    alt="dropdown icon"
                    className="select__dropdown-icon"
                />
            </components.DropdownIndicator>
        );
    };

    return (
        <Controller
            name={name}
            control={control}
            render={({ field}) => (
                <Select components={{ DropdownIndicator }} options={options} isSearchable={false} required={true} className="select" classNamePrefix="select" hideSelectedOptions={true} id={field.name} value={field.value} onChange={(e) => {
                    field.onChange(e);
                    onChange && onChange(e);
                }
                }/>
            )}
        />
    );
}