class Collection {
    #Model
    #currentId
    #items
    constructor(model, startingData) {
        this.#Model = model;
        this.#currentId = 0;
        this.#items = this.#populateItems( startingData );
    }

    /**
     * @description It will take an array as a argument 
     * @returns on Object that contains the { id as a key } and { te item as the value } 
     */

    #populateItems( startingData ) {
        return startingData.reduce(( acc, item, idx ) => {
            this.#currentId = idx;
            acc[this.#currentId] = new this.#Model(item, idx)
            return acc;
        }, {});
    }

    #generateId(){
        return ++this.#currentId
    }

    /**
     * @description Will return an array with all items availible in this.items
     * @returns array
     */

    find() {
        return Object.values(this.#items);
    }

    /**
     * @description Will return item match with the itemId
     * @param { string } itemId
     * @param { function } callBack Will return error or item
     * @returns function;
     */

    findById( itemId, callBack ) {
        if (!itemId) return console.log("missing id in first argument");
    
        if (typeof callBack !== "function") {
            return console.log("missing function in second argument");
        }
    
        let error;
        const item = this.#items[itemId];
    
        if (!item) {
            error = { message: `item with id "${itemId}" can't be found` };
        }
    
        return callBack(error, item);
    }
};

class Dogs {
    constructor( data, id ) {
        this.id = id;
        this.name = data.name;
        this.breed = data.breed;
        this.image = data.image;
    }
}

// at the bottom 
module.exports = new Collection(Dogs, [
    {
        name: "Aurora",
        breed: "German Shepherd",
        image:
            "https://www.rover.com/blog/wp-content/uploads/2020/06/German-Shepherd-1-1024x683.jpg",
    },
    {
        name: "Buddy",
        breed: "Golden Retriever",
        image:
            "https://static-mag.itcher.com/mag/wp-content/uploads/2015/07/AirBud.jpg",
    },
    {
        name: "Murphy",
        breed: "Great Pyrenees",
        image:
            "https://allbigdogbreeds.com/wp-content/gallery/great-pyrenees/Great-Pyrenees-3.jpg",
    },
    {
        name: "Chalupa",
        breed: "Chihuahua",
        image:
            "https://external-preview.redd.it/UdCqWhYTJrXmKkFX2H5QHOT6hA-HYWsJOY9cvYT5NrI.jpg?auto=webp&s=d56ac637505ca13e2caee914a85cbc61bb355b7e",
    },
    {
        name: "Zeke",
        breed: "Husky",
        image:
            "https://www.thesprucepets.com/thmb/I3v_3MP6D_HWy9F6OWaNgz19ogM=/2125x1411/filters:fill(auto,1)/GettyImages-763274597-ed21e57e6acb462a8d93dda0da39a7ca.jpg",
    }
]);