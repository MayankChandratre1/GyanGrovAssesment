import { ArrowDown, ArrowUp } from "lucide-react";
import AddItemDialog from "./AddItemDialog";
import ItemsTable from "./ItemsTable";
import useInventory from "@/hooks/useInventory";

const Inventory = () => {
  const {
    categories,
    sortBy,
    sortMode,
    category,
    setCategory,
    setSortBy,
    setSortMode,
    setSearch,
    filteredItems,
    addItem
  } = useInventory();

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
                  <option
                    className="p-2 text-lg"
                    key={category}
                    value={category}
                  >
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
                <option
                  className="p-2 text-sm md:text-lg"
                  value={"lastModified"}
                >
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
          <AddItemDialog addItem={addItem} />
        </div>
      </div>
      <ItemsTable items={filteredItems} />
    </div>
  );
};

export default Inventory;
