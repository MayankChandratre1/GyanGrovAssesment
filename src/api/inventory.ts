//Demo Hardcoded Api for testing
import { InventoryItem } from "../types/inventoryItem";

const data: InventoryItem[] = [
    {
        _id: '1',
        name: 'Samsumg Galaxy s25',
        description: 'This is Samsumg Galaxy s25',
        price: 100,
        quantity: 10,
        lastModified: new Date(),
        category: 'Smartphone'
    },
    {
        _id: '2',
        name: 'Redmi note 15',
        price: 200,
        quantity: 20,
        lastModified: new Date(),
        category: 'Smartphone'
    },
    {
        _id: '3',
        name: 'Apple Macbook Pro',
        price: 300,
        quantity: 30,
        lastModified: new Date(),
        category: 'Laptop'
    },
    {
        _id: '4',
        name: 'Dell XPS 15',
        price: 400,
        quantity: 40,
        lastModified: new Date(),
        category: 'Laptop'
    },{
        _id: '5',
        name: 'Apple Ipad Pro',
        price: 500,
        quantity: 50,
        lastModified: new Date(),
        category: 'Tablet'
    },
    {
        _id: '6',
        name: 'Samsung Galaxy Tab',
        price: 600,
        quantity: 60,
        lastModified: new Date(),
        category: 'Tablet'
    }
]



 const getInventoryItems = async (): Promise<InventoryItem[]> => {
    return data
}

 const addInventoryItem = async (item: InventoryItem): Promise<InventoryItem> => {
    data.push({
        ...item,
        _id: (data.length + 1).toString(),
        lastModified: new Date()
    })
    return item
}

 const updateInventoryItem = async (id: string, item: InventoryItem): Promise<InventoryItem[]> => {
    const index = data.findIndex(item => item._id === id)
    data[index] = {
        ...item,
        lastModified: new Date()
    }
    return data
}

 const deleteInventoryItem = async (id: string): Promise<void> => {
    const index = data.findIndex(item => item._id === id)
    data.splice(index, 1)
}


const inventoryApi = {
    getInventoryItems,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem
}

export default inventoryApi