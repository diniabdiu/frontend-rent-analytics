
import { useQuery } from "react-query";

// Services
import rentServices from "services/rent.service";

// Types
import { RentType } from "common/types/Rent.type";

// Components
import { AbsoluteSpinner } from "common/components/Spinners";

const RentPage = () => {

    // Queries
    const {
        isLoading: isGettingRents,
        error: getRentsError,
        data: rentsData,

    } = useQuery<RentType[]>('getRents', () => rentServices.get());

    
    if(getRentsError) throw new Error('Error getting Rents')


  return (
    <div className="relative w-full text-black">
        <AbsoluteSpinner show={isGettingRents} />
        <ul>
            {rentsData?.map((item: RentType) => {
                return  <li key={`${item.id}_${item.startingRent}`}>
                            {item.id} {item.year} {item.effectiveRent} {item.startingRent}
                        </li>
            })}
        </ul>
    </div>
  )
  
}

export default RentPage