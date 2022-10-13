import { ReactElement } from "react";

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


// Types
import { CreateRentType, RentType } from "common/types/Rent.type";

// Schema definition
const schema = yup.object().shape({
    year: yup
      .number()
      .positive()
      .min(1970, 'Minimum year is 1970!')
      .max(new Date().getFullYear(), `Maximum year is ${new Date().getFullYear()}!`),
    startingRent: yup.number().positive('Starting rent must be positive!').max(99),
    effectiveRent: yup
      .number().positive('Effective rent must be positive!').max(99) 
});

const CreateRent = (): ReactElement => {
   

  // Form
  const {
    register,
    reset: resetForm,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<RentType>({
    resolver: yupResolver(schema),
  });

  const handleOnSubmit = async (rent :CreateRentType) => {
    console.log('DATA from form',rent)     
  }


  return (<form onSubmit={handleSubmit(handleOnSubmit)}>
            <div>
                <label htmlFor="year">
                    Year:
                </label>
                <input type='number' id="year" {...register('year')} />
                {errors.year && (
                    <label className="text-red-700 mt-2 ml-2">{errors.year.message}</label>
                )}
            </div>
            <div>
                <label htmlFor="startingRent">
                    Starting rent
                </label>
                <input type='number' id="startingRent" {...register('startingRent')} />
                {errors.startingRent && (
                    <label className="text-red-700 mt-2 ml-2">{errors.startingRent.message}</label>
                )}
            </div>
            <div>
                <label htmlFor="effectiveRent">
                    Effective rent
                </label>
                <input type='number' id="effectiveRent" {...register('effectiveRent')} />
                {errors.effectiveRent && (
                    <label className="text-red-700 mt-2 ml-2">{errors.effectiveRent.message}</label>
                )}
            </div>
            <button disabled={!isDirty} className="border bg-[#287482] px-5 py-2 rounded text-white disabled:opacity-70" type="submit">Submit</button>
            <button type="reset" onClick={() => resetForm()}>Reset</button>
          </form>

  )
}

export default CreateRent