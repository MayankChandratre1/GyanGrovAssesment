import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  import { InventoryItem } from "@/types/inventoryItem";
import { PencilIcon } from "lucide-react";
import { useState } from "react";
  
  interface EditDialogProps {
    item: InventoryItem;
    updateItem: (id:string,item: InventoryItem) => void;
  }
  
  const EditDialog = ({item, updateItem}:EditDialogProps) => {
    const [open, setOpen] = useState(false);
    const closeDialog = () => setOpen(false);
    const [editingItem, seteditingItem] = useState<InventoryItem>(item)
    const onItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        seteditingItem({
          ...editingItem,
          [e.target.name]: e.target.value
        })
      }


    return (
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className=" cursor-pointer p-2 bg-blue-500 text-white rounded-lg flex items-center">
          <PencilIcon  className="w-4 h-4 "/>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>
            <label className="block mt-2">
              Name:
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="p-3 text-lg border-2 rounded-lg w-full"
                onChange={onItemChange}
                value={editingItem.name}
              />
            </label>
            <label className="block mt-2">
              Price:
              <input
                type="number"
                name="price"
                placeholder="Price"
                className="p-3 text-lg border-2 rounded-lg w-full mt-2"
                onChange={onItemChange}
                value={editingItem.price}
              />
            </label>
            <label className="block mt-2">
              Quantity:
              <input
                type="number"
                name="quantity"
                placeholder="Quantity"
                className="p-3 text-lg border-2 rounded-lg w-full mt-2"
                onChange={onItemChange}
                value={editingItem.quantity}
              />
            </label>
            <label className="block mt-2">
              Category:
              <input
                type="text"
                name="category"
                placeholder="Category"
                className="p-3 text-lg border-2 rounded-lg w-full mt-2"
                onChange={onItemChange}
                value={editingItem.category}
              />
            </label>
            <button onClick={()=>{
              updateItem(editingItem._id,editingItem)
              closeDialog()
            }} className="p-3 bg-green-500 text-white rounded-lg w-full mt-2">
              Update Item
            </button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
    )
  }
  
  export default EditDialog