import inventoryApi from "@/api/inventory";
import { InventoryItem } from "@/types/inventoryItem";
import { useState, useEffect } from "react"


const useInventory = () => {
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

  


  return {
    filteredItems,
    categories,
    sortBy,
    sortMode,
    search,
    category,
    newItem,
    setSortBy,
    setSortMode,
    setSearch,
    setCategory,
    addItem,
    removeItem,
    updateItem,
  }
}


export default useInventory;