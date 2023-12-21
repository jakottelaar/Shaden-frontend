import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { deleteUserAccount } from "@/service/user-service";
import { useAuth } from "./AuthProvider";
import { ApiInstance } from "@/lib/axios-service";
import { useRouter } from "next/navigation";

const DeleteAccountModal = () => {
  const [open, setOpen] = useState(false);
  const { accessToken, updateToken } = useAuth();
  const apiInstance = ApiInstance(accessToken, updateToken);
  const router = useRouter();

  const handleAccountDelete = async () => {
    try {
      const response = await deleteUserAccount(apiInstance);

      if (response.status === 200) {
        updateToken(null);
        router.push("/login");
      }
    } catch (error) {}
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        className="duration:300 flex w-fit justify-start rounded-md bg-red-600 p-2 text-white transition-all hover:bg-red-800"
        data-testid="delete-account-modal-button"
      >
        Delete Account
      </DialogTrigger>
      <DialogContent className="flex w-fit flex-col items-center justify-center border-none bg-primary-1000 text-center">
        <div className="rounded-md p-2">
          <h1 className="text-lg text-white">
            Are you sure you want to delete your account?
          </h1>
          <h2 className="text-md text-white">This action cannot be undone.</h2>
        </div>
        <div className="flex w-full flex-row space-x-4">
          <button
            className="duration:300 w-1/2 rounded-md bg-red-600 p-2 text-white transition-all hover:bg-red-800"
            onClick={handleAccountDelete}
            data-testid="delete-account-confirm-button"
          >
            Delete Account
          </button>
          <button
            className="duration:300 w-1/2 rounded-md bg-green-600 p-2 text-white transition-all hover:bg-green-800"
            onClick={() => setOpen(false)}
          >
            Cancel
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteAccountModal;
