
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import {  Trash2 } from "lucide-react";
import { useState } from "react";

interface DeleteDialogProps {
    removeItem: (id:string) => void;
    id: string
}

const DeleteDialog = ({removeItem, id}:DeleteDialogProps) => {
    const [open, setOpen] = useState(false);
    const closeDialog = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger>
    <button className="p-2 bg-red-500 text-white rounded-lg"><Trash2 className="w-4 h-4 " /></button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you sure you want to delete this item ?</DialogTitle>
        <DialogDescription className="space-x-2 pt-4">
            <button onClick={() => removeItem(id)} className="p-2 bg-red-500 text-white rounded-lg">Confirm</button>
            <button className="p-2 bg-gray-200 text-black rounded-lg" onClick={closeDialog}>Cancel</button>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  )
}

export default DeleteDialog