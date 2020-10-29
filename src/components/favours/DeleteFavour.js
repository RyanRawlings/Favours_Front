import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { delay } from "q";
import * as FavourAPI from "../../api/FavourAPI";
import * as UserAPI from "../../api/UserAPI";
import * as APIServices from "../../api/TestAPI";

/*******************************************************************************************************************
 * Summary: Deletes a Favour from the database based on the FavourId passed. If successful a UserActivity record
 * will also be written to the database
 *
 * @param userData -> Data from the UserContext
 * @param Requester -> The requesting user for the Favour
 * @param FavourTitle -> The title for the Favour being deleted
 * @param FavourId -> The object id for the Favour being deleted
 * @param handleClose -> The function that will set the modal setOpen state to false for the parent Favour
 * @param TriggerResetFavourList -> The function that will tell React to re-render the Favour List
 * @param getUserEmail -> Function used to fetch a user email based on the parameters passed
 ********************************************************************************************************************/

const DeleteFavour = (
  userData,
  Requester,
  FavourTitle,
  FavourId,
  handleClose,
  TriggerResetFavourList,
  getUserEmail
) => {
  const executeDeleteFavour = async () => {
    const response = await FavourAPI.deleteOneFavour({ _id: FavourId });

    if (response.ok === true) {
      let userId = userData.user._id;
      let requesterEmail = getUserEmail(Requester, "", "", false, true);
      let action = `Deleted Favour ${FavourTitle} - Paid By user ${requesterEmail}`;
      let newActivityData = {
        userId: userId,
        action: action
      };

      const newUserActivity = await UserAPI.createUserActivity(newActivityData);

      if (newUserActivity) {
        console.log("new user action log: 200");
      }

      toast.success("Successfully deleted Favour");

      await delay(3000);
      handleClose();
      TriggerResetFavourList();
    } else {
      toast.error("Error deleting the Favour, execution has halted");

      await delay(3000);
      handleClose();
      TriggerResetFavourList();
    }
  };

  executeDeleteFavour();
};

export { DeleteFavour };
