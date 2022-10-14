import { ReactElement } from "react";
import { useMutation, useQueryClient } from "react-query";

import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Services
import rentsServices from "services/rent.service";

// Types
import { CreateRentType, RentType } from "common/types/Rent.type";
import { AbsoluteSpinner } from "common/components/Spinners";

// Schema definition
const schema = yup.object().shape({
    year: yup
      .number()
      .positive()
      .required()
      .min(1970, 'Minimum year is 1970!')
      .max(new Date().getFullYear(), `Maximum year is ${new Date().getFullYear()}!`),
    startingRent: yup.number().required().positive('Starting rent must be positive!').max(99),
    effectiveRent: yup
      .number().required().positive('Effective rent must be positive!').max(99) 
});

interface Props {
  idOfRent: string;
}
const CreateRent = (idOfRent:Props): ReactElement => {


    const queryClient = useQueryClient()

    console.log('RENT FORM ID +>>>>',idOfRent)

    const {
        mutate: createRent,
        isLoading: isCreatingRent,
        error: createRentError,
      } = useMutation(
        'createRent',
        (rent : CreateRentType) => rentsServices.createRent(rent),
        {
          onSuccess: (rent) => {
            console.log('here is rent', rent)
          }
        }
   
      );


  // Form
  const {
    register,
    reset: resetForm,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<RentType>({
    resolver: yupResolver(schema),
    defaultValues: {  },
  });

  const handleOnSubmit = async (rent :CreateRentType) => {
    console.log('DATA from form',rent)
      await createRent(rent)
  }

  if(createRentError) throw new Error('Error creating Rent')

  return (<form onSubmit={handleSubmit(handleOnSubmit)}>
            <AbsoluteSpinner show={isCreatingRent}/>
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