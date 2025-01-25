import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InventoryItem } from "@/types/inventoryItem";
import { Plus } from "lucide-react";
import { useState } from "react";

interface AddItemDialogProps {
  newItem: InventoryItem;
  onNewItemChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addItem: (item: InventoryItem) => void;
}

const AddItemDialog = ({newItem, onNewItemChange, addItem}:AddItemDialogProps) => {
  const [open, setOpen] = useState(false);
  const closeDialog = () => setOpen(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger>
      <button className="p-3 bg-green-500 text-white rounded-lg flex items-center">
        <Plus className="w-5 h-5" />
      </button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Item</DialogTitle>
        <DialogDescription>
          <label className="block mt-2">
            Name:
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="p-3 text-lg border-2 rounded-lg w-full"
              onChange={onNewItemChange}
              value={newItem.name}
            />
          </label>
          <label className="block mt-2">
            Price:
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="p-3 text-lg border-2 rounded-lg w-full mt-2"
              onChange={onNewItemChange}
              value={newItem.price}
            />
          </label>
          <label className="block mt-2">
            Quantity:
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              className="p-3 text-lg border-2 rounded-lg w-full mt-2"
              onChange={onNewItemChange}
              value={newItem.quantity}
            />
          </label>
          <label className="block mt-2">
            Category:
            <input
              type="text"
              name="category"
              placeholder="Category"
              className="p-3 text-lg border-2 rounded-lg w-full mt-2"
              onChange={onNewItemChange}
              value={newItem.category}
            />
          </label>
          <button onClick={()=>{
            closeDialog();
            setTimeout(() => addItem(newItem), 0);
          }} className="p-3 bg-green-500 text-white rounded-lg w-full mt-2">
            Add Item
          </button>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
  )
}

export default AddItemDialog