import { useEffect, useState } from "react";
import { InventoryItem } from "../types/inventoryItem";
import inventoryApi from "../api/inventory";
import { ArrowDown, ArrowUp } from "lucide-react";
import AddItemDialog from "./AddItemDialog";
import ItemsTable from "./ItemsTable";


const Inventory = () => {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<InventoryItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortMode, setSortMode] = useState<"asc" | "dsc">("asc");
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("All");
  const [newItem, setNewItem] = useState<InventoryItem>({
    _id: "",
    name: "",
    price: 0,
    quantity: 0,
    category: "",
    lastModified: new Date(),
  })

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const items = await inventoryApi.getInventoryItems();
        setItems(items);
        setFilteredItems(items);
        const categories = items.map((item) => item.category);
        setCategories(["All", ...new Set(categories)]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const categories = items.map((item) => item.category);
    setCategories(["All", ...new Set(categories)]);
    setFilteredItems(items);
  }, [items]);

  useEffect(() => {
    filterCategory(category);
  }, [category, sortBy, sortMode, search]);

  useEffect(() => {
    searchItems(search);
  }, [search]);

  useEffect(()=>{
    filterCategory(category);
  },[category])

  useEffect(()=>{
    sortBy && sortItems(sortBy, sortMode);
  },[sortBy, sortMode])

  const searchItems = (search: string) => {
    setSearch(search);
    if(!search) {
      setCategory("All");
      setFilteredItems(items);
      return;
    }
    setFilteredItems(
      filteredItems.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const filterCategory = (category: string) => {
    if (category === "All") {
      setFilteredItems(items);
    } else {
      setFilteredItems(
        filteredItems.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase()
        )
      );
    }
  };

  const addItem = async (item: InventoryItem) => {
    try {
      await inventoryApi.addInventoryItem(item);
      setItems([...items, item]);
      setNewItem({
        _id: "",
        name: "",
        price: 0,
        quantity: 0,
        category: "",
        lastModified: new Date(),
      })
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await inventoryApi.deleteInventoryItem(id);
      setItems(items.filter((item) => item._id !== id));
      setFilteredItems(filteredItems.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const updateItem = async (id: string, updatedItem: InventoryItem) => {
    try {
      const newItems = await inventoryApi.updateInventoryItem(id, updatedItem);
      setItems([...newItems]);
      setFilteredItems([...newItems]);

    } catch (error) {
      console.log(error);
    }
  };

  const sortItems = (sortBy: string, mode: "asc" | "dsc") => {
    const newItems = [...filteredItems];
    if (sortBy === "name") {
      newItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "price") {
      newItems.sort((a, b) => a.price - b.price);
    } else if (sortBy === "quantity") {
      newItems.sort((a, b) => a.quantity - b.quantity);
    } else if (sortBy === "category") {
      newItems.sort((a, b) => a.category.localeCompare(b.category));
    } else if (sortBy === "lastModified") {
      newItems.sort(
        (a, b) =>
          new Date(b.lastModified).getTime() -
          new Date(a.lastModified).getTime()
      );
    }
    if (mode === "dsc") {
      newItems.reverse();
    }
    
    setFilteredItems([...newItems]);
  };

  const onNewItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center gap-2">
        <input
          type="text"
          name="search"
          placeholder="Search by name"
          onChange={(e) => setSearch(e.target.value)}
          className="p-3 text-lg border-2 rounded-lg flex-1"
        />
      </div>
      <div className="flex items-start mt-4 justify-between">
        <div className="flex gap-4 items-center  flex-wrap">
          <div className="px-2 rounded-lg border-2">
            <select 
              name="category" 
              id="category" 
              className="p-3 outline-none"
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option className="p-2 text-lg" key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <h5 className="font-semibold text-sm md:text-md">Sort By:</h5>
          <div className="px-2 flex items-center rounded-lg border-2">
            <select 
              name="sortBy" 
              id="sortBy" 
              className="p-3 outline-none"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option className="p-2 text-sm md:text-lg" value={"name"}>
                Name
              </option>
              <option className="p-2 text-sm md:text-lg" value={"price"}>
                Price
              </option>
              <option className="p-2 text-sm md:text-lg" value={"quantity"}>
                Quantity
              </option>
              <option className="p-2 text-sm md:text-lg" value={"category"}>
                Category
              </option>
              <option className="p-2 text-sm md:text-lg" value={"lastModified"}>
                Last Modified
              </option>
            </select>
          </div>
          <button
            className="p-3 flex items-center rounded-lg border-2"
            onClick={() => setSortMode(sortMode === "asc" ? "dsc" : "asc")}
          >
            {sortMode == "asc" ? (
              <>
                <ArrowUp className="w-5 h-5" /> Asc
              </>
            ) : (
              <>
                <ArrowDown className="w-5 h-5" /> Dsc
              </>
            )}
          </button>
        </div>
        <AddItemDialog newItem={newItem} onNewItemChange={onNewItemChange} addItem={addItem} />
        
      </div>
        <ItemsTable removeItem={removeItem} updateItem={updateItem} items={filteredItems} />
    </div>
  );
};

export default Inventory;
