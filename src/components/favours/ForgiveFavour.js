import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { delay } from "q";
import * as FavourAPI from "../../api/FavourAPI";
import * as UserAPI from "../../api/UserAPI";

/*******************************************************************************************************************
* Summary: Forgives a Favour in the database based on the FavourId passed. If successful a UserActivity record 
* will also be written to the database
*
* @param userData -> Data from the UserContext
* @param Requester -> The requesting user for the Favour
* @param FavourTitle -> The title for the Favour being forgiven
* @param FavourId -> The object id for the Favour being forgiven
* @param handleClose -> The function that will set the modal setOpen state to false for the parent Favour
* @param TriggerResetFavourList -> The function that will tell React to re-render the Favour List
* @param getUserEmail -> Function used to fetch a user email based on the parameters passed
********************************************************************************************************************/

const ForgiveFavour = (userData, Requester, FavourTitle, FavourId, handleClose, TriggerResetFavourList, getUserEmail) => {        
    const executeforgiveFavour = async () => {
      try {      
        const response = await FavourAPI.forgiveFavour({ _id: FavourId });
        if (response) {

            let userId = userData.user._id;
            let requesterEmail = getUserEmail(Requester, "", "", true, true);
            let action = `Forgave Favour ${FavourTitle} - Paid By user ${requesterEmail}`;
            let newActivityData = {
              userId: userId,
              action: action
            }
    
            const newUserActivity = await UserAPI.createUserActivity(newActivityData);

          toast.success(
            "Successfully forgave favour debt... page will update"
          );
    
          await delay(3000);
          handleClose();
          TriggerResetFavourList();
    
        } else {
          toast.error(
            "Error forgiving the favour debt..."
          );
    
          await delay(3000);
          handleClose();
          TriggerResetFavourList();
        }
      } catch (err) {
        toast.error("There was an error forgiving the Favour");
        console.error("There was an error forgiving the Favour " + err);
      }
    }

    executeforgiveFavour();
}



export { ForgiveFavour };
