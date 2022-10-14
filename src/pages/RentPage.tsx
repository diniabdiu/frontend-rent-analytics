import {  ElementRef, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {faPlus} from '@fortawesome/free-solid-svg-icons';

// Services
import rentsServices from "services/rent.service";

// Types
import { RentType } from "common/types/Rent.type";

// Partials
import RentForm from "./_RentForm";

// Components
import { AbsoluteSpinner } from "common/components/Spinners";
import { ChartBar } from "common/components/ChartBar";
import { Modal } from "common/components/Modal";

const RentPage = () => {
    // Ref
    type ModalHandler = ElementRef<typeof Modal>;
    const formRentRef = useRef<ModalHandler>(null);

    // State
    const [idOfRent, setIdOfRent] = useState('')

    // Queries
    const {
        isLoading: isGettingRents,
        error: getRentsError,
        data: rentsData,
        refetch: refreshRents
    } = useQuery<RentType[]>('getRents', () => rentsServices.getAllRents());

    const {
        mutate: deleteRent,
        isLoading: isDeletingRent,
        error: deleteRentError,
      } = useMutation('deleteRent', (id: string) => rentsServices.deleteRent(id), {
        onSuccess: (user) => {
            refreshRents()
        },
      });

      
      
      
    const handleGetRentId=(id: string)=> {
        setIdOfRent(id)
        deleteRent(id)
        formRentRef.current?.show()
    }
        
    if(getRentsError) throw new Error('Error getting Rents')
    if(deleteRentError) throw new Error('Error deleting Rent')

  return (
    <div className="relative w-fit text-black">
        <AbsoluteSpinner show={isGettingRents || isDeletingRent}  />   

        {/* Create Rent  */}
        <Modal  ref={formRentRef} title="Create">
            <RentForm idOfRent={idOfRent} />
        </Modal>
        
        {/* WIDGET CHARTS */}
        <div className="bg-white shadow p-5 rounded-2xl">
            <div className="flex justify-between items-center gap-5">
                <div>
                    <h1 className="text-primary font-bold text-3xl">Rent charts</h1>                
                </div>
                <div>
                    <span
                     onClick={() => formRentRef.current?.show()} 
                     className="cursor-pointer text-lg font-bold text-gray-800 flex gap-1 items-center">
                        <FontAwesomeIcon icon={faPlus} color="#222" className="text-lg" />
                        Rent
                    </span>
                </div>
            </div>
            <div className="flex gap-5 h-80 max-w-[700px] overflow-x-auto touch-pan-x">            
                {rentsData?.map((item: RentType) => {
                    return  <ChartBar handleGetId={handleGetRentId} key={item.id} title={item.id} firstValue={item.startingRent} secondValue={item.effectiveRent} />
                })}                
            </div>
            <div className="flex items-center gap-1 pt-2">
                Effective rent: <span className="inline-flex w-3 h-3 rounded-full bg-gradient-to-b from-[#287482] to-[#2EA1B6]" />
            </div>
            <div className="flex items-center gap-1">
                Starting rent: <span className="inline-flex w-3 h-3 rounded-full bg-yellow-400" />
            </div>
        </div>
    </div>
  )
  
}

export default RentPage