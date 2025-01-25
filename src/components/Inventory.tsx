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
        setFilteredItems(items.sort((a, b) => a.name.localeCompare(b.name)));
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
    setFilteredItems(filterItems());
  }, [category, search, sortBy, sortMode]);


  const filterItems = (toFilterItems: InventoryItem[] | null = null) => {
    let toFilter = toFilterItems || items;
    if(category !== "All") {
      toFilter = toFilter.filter((item) => item.category.toLowerCase() === category.toLowerCase());
    }
    if(search) {
      toFilter = toFilter.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if(sortBy) {
      switch(sortBy) {
        case "name":
          toFilter.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "price":
          toFilter.sort((a, b) => a.price - b.price);
          break;
        case "quantity":
          toFilter.sort((a, b) => a.quantity - b.quantity);
          break;
        case "category":
          toFilter.sort((a, b) => a.category.localeCompare(b.category));
          break;
        case "lastModified":
          toFilter.sort(
            (a, b) =>
              new Date(b.lastModified).getTime() -
              new Date(a.lastModified).getTime()
          );
          break;
      }
      if(sortMode === "dsc") {
        toFilter.reverse();
      }
    }
    return toFilter;
  }



  const addItem = async (item: InventoryItem) => {
    try {
      await inventoryApi.addInventoryItem(item);
      setFilteredItems(filterItems());
      
      setNewItem({
        _id: "",
        name: "",
        price: 0,
        quantity: 0,
        category: "",
        lastModified: new Date(),
      });
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

  const updateItem = async (id: string, updatedItemData: InventoryItem) => {
    try {
      const updatedItem = await inventoryApi.updateInventoryItem(id, updatedItemData);
      setItems([...items.map((item) => (item._id === id ? updatedItem : item))]);
      setFilteredItems([...filterItems([...items.map((item) => (item._id === id ? updatedItem : item))])]);

    } catch (error) {
      console.log(error);
    }
  };

  const onNewItemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value
    })
  }

  

  return (
    <div className="container relative mx-auto p-4">
      <div className="sticky top-0 bg-white z-10 py-4">
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
              value={category}
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
              value={sortBy}
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
      </div>
        <ItemsTable removeItem={removeItem} updateItem={updateItem} items={filteredItems} />
    </div>
  );
};

export default Inventory;
