


    const TagsSearch = async () => {
        const userId = 'LAS3S528apZ5J627SwEfsIn6oke2';
        console.log('USERID ', userId);

        await firebase.firestore().collection('tags')
          .doc(userId).get()
          .then((snapshot) => {
            if (snapshot) {
                console.log('snapshot.data()', snapshot.data())
                setTags(snapshot.data());
                //setTags(prev => ([...prev, ...snapshot.data()]));
            }
            console.log('tags', tags);
            return tags;
        }).catch((err) => {console.log('TAGS ERR', err)})
        console.log('test')
        return tags;
    }

const filterTags = async () => {
    console.log('foundTags', foundTags)
    if (foundTags) {
        var keys = Object.keys(foundTags);
        var filteredTrueTags = keys.filter(function(key) {
            return foundTags[key]
        });
        console.log('FILTERED ', filteredTrueTags);

        console.log('**********************************************************')
        // FILTERED  ["roasted", "stewed", "nuts", "lactose", "sugar", "vegetarianism", "gluten", "fish"]
        const dishesTest = [
            {"id": "1",
            "name": "one",
            "tags": "meat, nuts, milk"},
            {"id": "2",
            "name": "two",
            "tags": "roasted"},
            {"id": "3",
            "name": "one",
            "tags": "any"},
            {"id": "4",
            "name": "four",
            "tags": ""},
        ]
        dishesTest.forEach(element => {
            console.log(element)
        });

        let check = 0;
        var filterDishesWithTags = dishesTest.filter(obj => {
            
            filteredTrueTags.every(element => {
                console.log('element ', element, ' obj.tags ', obj.tags)
                console.log('obj.tags.indexOf(element)', obj.tags.indexOf(element))
                if (obj.tags.indexOf(element) === -1) {
                    check = -1;
                    return true;
                } else {
                    check = obj.tags.indexOf(element);
                    console.log('HAHHAHHAHHAHHAHHAHHAHHAHHAHHAHHAHHAHHAHHAHHAHHAH', element, obj.tags)
                    return false;
                }
            });
            console.log('check check check check check check check check', check, obj)
            if (check === -1) {
                return obj;
            }

        })

        console.log('filterDishesWithTags', filterDishesWithTags);

        filteredTrueTags.forEach(element => {
            console.log(element)
        });
        
    }

    
    /*
    var foodForCurrentMeal = cart.filter(obj => {
        return obj.mealId === mId
    })
    */
}

const z = {"0": {"description": "Куриная грудка в острой панировке с соусом Карри. Острые.",
                    "dishCalories": 189, "dishCarbohydrates": 15, "dishFats": 8, "dishName": "Куриные стрипсы",
                    "dishPath": "https://eda.yandex.ru/images/3583740/d19822be7b4d6667a43c49084d51db86-216x188.jpeg",
                    "dishPrice": 295, "dishProtein": 13, "id": "0", "restaurantName": "Menza ", "section": "Япония", "tags": "", "weight": "110 г"},
                    "1": {"description": "Куриная грудка в острой панировке с соусом Карри. Острые.",
                    "dishCalories": 189, "dishCarbohydrates": 15, "dishFats": 8, "dishName": "Куриные стрипсы",
                    "dishPath": "https://eda.yandex.ru/images/3583740/d19822be7b4d6667a43c49084d51db86-216x188.jpeg",
                    "dishPrice": 295, "dishProtein": 13, "id": "22", "restaurantName": "Menza ", "section": "Япония", "tags": "", "weight": "110 г"}
                    }
                    const array = Object.values(z);
                    console.log('mmmmmmmmmmmmmm', array);
                    console.log('mmmmmmmmmmmmmm length', array.length);
                    const y = 11;
                    var obj = {12: 'item', y: 'hhh', [y]: 'tfjuyu'}
                    console.log('obj', obj)
                    const zzz= 333;
                    obj[zzz] = 'zzz333'
                    console.log('obj', obj)
                    
                    const todoList = array.map((item, id)=> { 
                        const price = item.description;
                        console.log(id)
                        // array.set(id, item);
                        obj[id] = item;
                        return {[id]: item}
                    });
                    console.log('obj', obj)
                    //const ghj = Object.values(obj);
                    //console.log('ghj', ghj)
                    //console.log('todoList', JSON.stringify(todoList))

                            /*
                            const obj = {};

                            for (const key of todoList) {
                                obj[key] = whatever;
                            }
                            */