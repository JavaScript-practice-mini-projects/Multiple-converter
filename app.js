
window.onload = () => {
    main()
}

// Globals

const converter = {
    area: {
        name: 'Area',
        units: {
            squareKm: 'Square Kilometer',
            squareM: 'Square Meter',
            squareYard: 'Square Yard',
            squareFoot: 'Square Foot'
        }
    },
    mass: {
        name: 'Mass',
        units: {
            tonne: 'Tonne',
            kilogram: 'Kilogram',
            gram: 'Gram',
            milligram: 'Milligram'
        }
    },
    length: {
        name: 'length',
        units: {
            kilometer: 'Kilometer',
            meter: 'Meter',
            centimeter: 'Centimeter',
            millimeter: 'Millimeter'
        }
    },
    time: {
        name: 'Time',
        units: {
            second: 'Second',
            minute: 'Minute',
            hour: 'Hour',
            day: 'Day'
        }
    }
}


function main(){
    const selectCategory = document.getElementById('select-category')
    const leftCategory = document.getElementById('left-category')
    const rightCategory = document.getElementById('right-category')

    const converterKeys  = Object.keys(converter)
    removeAllChild(selectCategory);
  
    converterKeys.forEach((item) => {
        addOption(selectCategory, {value: item, text: converter[item].name})
    
    });
    
    
    
    selectCategory.addEventListener('change', function(){
        const selectCategoryValue = selectCategory.value
        const units = converter[selectCategoryValue].units
        // handle left site 
        removeAllChild(leftCategory)
        const unitsKeys = Object.keys(units)
        unitsKeys.forEach((item) => {
            addOption(leftCategory, {value: item, text: units[item]})
        })

        // handle right site
        removeAllChild(rightCategory)
        const unitsKeysLeft = Object.keys(units)
        unitsKeysLeft.forEach((item) => {
            addOption(rightCategory, {value: item, text: units[item]})
        })

        rightCategory.getElementsByTagName('option')[1].selected = 'selected'

        })
    

}

// event handler

// DOM function

function addOption(parent, option){  // option = {value: item, text: units[item]}
        
    const opt = document.createElement('option')
    opt.setAttribute('value', option.value)
    opt.innerText = option.text
    parent.appendChild(opt)
    // console.log(option.value, option.text)
}

function removeAllChild(parent){
    while(parent.firstChild){
        parent.firstChild.remove()
    }
}


