import { InventoryItem } from "@/types/inventoryItem";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";
import useInventory from "@/hooks/useInventory";

type ItemsTableProps = {
    items: InventoryItem[];
}


const ItemsTable = ({items}:ItemsTableProps) => {
    const {removeItem, updateItem} = useInventory();
    return (
        <div className="">
            <table className="w-full mt-4 border border-gray-800 rounded-md">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="p-3 text-left">Name</th>
                        <th className="p-3 text-left">Price</th>
                        <th className="p-3 text-left">Quantity</th>
                        <th className="p-3 text-left">Category</th>
                        <th className="p-3 text-left">Last Modified</th>
                        <th className="p-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {items.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="p-3 text-center">No items found</td>
                        </tr>
                    ) : (
                        items.map((item) => (
                            <tr key={item._id} className={item.quantity <= 10 ? "bg-red-300/30" : ""}>
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">{item.price}</td>
                                <td className="p-3">{item.quantity}</td>
                                <td className="p-3">{item.category}</td>
                                <td className="p-3">{item.lastModified.toISOString().split("T")[0]}</td>
                                <td className="p-3 space-x-2">
                                    <EditDialog item={item} updateItem={updateItem} />
                                    <DeleteDialog removeItem={removeItem} id={item._id} />
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ItemsTable;