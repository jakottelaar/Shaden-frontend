import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";

const AddFriendModal = () => {
  return (
    <Dialog>
      <DialogTrigger className="rounded-md bg-secondary-100 p-1 transition-all duration-300 hover:bg-secondary-700">
        Add a friend
      </DialogTrigger>
      <DialogContent className="top-48 w-[800px] border-none bg-primary-1000">
        <div className="flex flex-col space-y-4 p-4">
          <h1 className="text-white">Add a friend with their username</h1>
          <input className="rounded-md bg-primary-100 px-2 py-1 text-white outline-none" />
          <button className="w-fit rounded-md bg-secondary-100 p-2 text-white transition-all duration-300 hover:bg-secondary-500">
            Sent friend request
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddFriendModal;
