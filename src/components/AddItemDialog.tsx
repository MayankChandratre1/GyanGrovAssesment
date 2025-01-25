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

interface AddItemDialogProps {
  newItem: InventoryItem;
  onNewItemChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addItem: (item: InventoryItem) => void;
}

const AddItemDialog = ({newItem, onNewItemChange, addItem}:AddItemDialogProps) => {
  return (
    <Dialog>
    <DialogTrigger>
      <button className="p-3 bg-green-500 text-white rounded-lg flex items-center">
        <Plus className="w-5 h-5" />
      </button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Item</DialogTitle>
        <DialogDescription>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="p-3 text-lg border-2 rounded-lg w-full"
            onChange={onNewItemChange}
            value={newItem.name}
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="p-3 text-lg border-2 rounded-lg w-full mt-2"
            onChange={onNewItemChange}
            value={newItem.price}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            className="p-3 text-lg border-2 rounded-lg w-full mt-2"
            onChange={onNewItemChange}
            value={newItem.quantity}
          />
          <input
            type="text"
            name="category"
            placeholder="Category"
            className="p-3 text-lg border-2 rounded-lg w-full mt-2"
            onChange={onNewItemChange}
            value={newItem.category}
          />
          <button onClick={()=>{
            addItem(newItem)
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